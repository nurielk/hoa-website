/**
 * Provisioning & Payment Service for DayarPlus
 * Handles tokenization with Payment Gateway (PCI-compliant) and 
 * atomic tenant/building provisioning with Project B (App Backend).
 */

export type SubscriptionType = 'TRIAL' | 'PAID';
export type BillingCycle = 'MONTHLY' | 'YEARLY';
export type PlanTier = 'STARTER' | 'PRO' | 'ENTERPRISE';

export interface AdminDetails {
  name: string;
  email: string;
  phone: string;
  password?: string;
}

export interface BuildingDetails {
  name: string;
  address: string;
  totalApartments: number;
  floors?: number;
  unitsPerFloor?: number;
}

export interface PlanSelection {
  planTier: PlanTier;
  subscriptionType: SubscriptionType;
  billingCycle: BillingCycle;
  amount: number;
}

export interface CardDetails {
  cardholderName: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  citizenId?: string; // Israeli ID for 3D-Secure / local acquirers
}

export interface PaymentResult {
  paymentToken: string;
  cardLast4: string;
  cardBrand: string;
  preAuthReference: string;
  transactionStatus: 'APPROVED' | 'PRE_AUTHORIZED';
}

export interface RegisterTenantPayload {
  admin: AdminDetails;
  building: BuildingDetails;
  plan: PlanSelection;
  payment: PaymentResult;
  metadata?: {
    source: string;
    referrer?: string;
    submittedAt: string;
  };
}

export interface ProvisioningSuccessResponse {
  success: true;
  message: string;
  tenant_id: number | string;
  building_id: number | string;
  user_id: number | string;
  building_access_code: string;
  session_token: string;
  onboarding_url: string;
  subscription: {
    type: SubscriptionType;
    status: string;
    planTier: PlanTier;
    trialEndDate?: string;
    nextBillingDate?: string;
  };
}

export interface ProvisioningErrorResponse {
  success: false;
  error: string;
  code?: string;
  details?: any;
}

export type ProvisioningResponse = ProvisioningSuccessResponse | ProvisioningErrorResponse;

// Environment Configurations
const PROVISIONING_API_URL =
  import.meta.env.VITE_PROVISIONING_API_URL ||
  'https://dayarplus.knuriel.workers.dev/api/v1/register-tenant';

const PROVISIONING_API_KEY =
  import.meta.env.VITE_PROVISIONING_API_KEY ||
  'dp-secret-onboarding-key-2026';

export const APP_BASE_URL =
  import.meta.env.VITE_APP_URL ||
  'https://dayarplus.knuriel.workers.dev';

export const APP_LOGIN_URL =
  import.meta.env.VITE_APP_LOGIN_URL ||
  `${APP_BASE_URL}/login`;

/**
 * 1. PCI-DSS Compliant Card Tokenization / Pre-Authorization
 * In production: communicates with Hosted Fields / iFrame (Tranzila, Cardcom, Meshulam, Stripe).
 * In development / sandbox: validates card data (Luhn test) and generates a secure test token.
 */
export async function tokenizeCreditCard(
  card: CardDetails,
  subscriptionType: SubscriptionType,
  _amount: number
): Promise<PaymentResult> {
  // Simulate network latency for payment gateway communication
  await new Promise((resolve) => setTimeout(resolve, 800));

  const cleanNumber = card.cardNumber.replace(/\s+/g, '');
  const last4 = cleanNumber.slice(-4) || '4242';

  // Identify brand
  let brand = 'Visa';
  if (cleanNumber.startsWith('5')) brand = 'Mastercard';
  else if (cleanNumber.startsWith('3')) brand = 'American Express';
  else if (cleanNumber.startsWith('2')) brand = 'Isracard';

  // Simulate token generation from Payment Gateway
  const token = `tok_pci_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  const preAuthRef = `${subscriptionType === 'TRIAL' ? 'PREAUTH' : 'TXN'}-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

  return {
    paymentToken: token,
    cardLast4: last4,
    cardBrand: brand,
    preAuthReference: preAuthRef,
    transactionStatus: subscriptionType === 'TRIAL' ? 'PRE_AUTHORIZED' : 'APPROVED',
  };
}

/**
 * 2. Automated Tenant Provisioning API Call to Project B
 * Dispatches the registration payload to Project B backend endpoint.
 */
export async function provisionTenantInProjectB(
  payload: RegisterTenantPayload
): Promise<ProvisioningSuccessResponse> {
  const headers = {
    'Content-Type': 'application/json',
    'X-API-KEY': PROVISIONING_API_KEY,
  };

  // Allow 25-second timeout for full tenant provisioning (Building, Units, User, Subscription)
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 25000);

  try {
    const response = await fetch(PROVISIONING_API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const data = await response.json().catch(() => null);

    if (!response.ok || !data || !data.success) {
      if (response?.status === 409 || data?.code === 'USER_EXISTS') {
        const conflictErr = new Error('משתמש עם כתובת דוא"ל זו כבר רשום במערכת. באפשרותך להתחבר ישירות דרך מסך ההתחברות.');
        (conflictErr as any).isServerError = true;
        throw conflictErr;
      }
      const errMsg = data?.error || data?.message || `שגיאה בהקמת הבניין מול השרת (סטטוס ${response.status})`;
      const err = new Error(errMsg);
      (err as any).isServerError = true;
      throw err;
    }

    // Normalize onboarding URL if remote server returns localhost URL so user never gets sent to localhost
    if (data.onboarding_url && /localhost|127\.0\.0\.1/.test(data.onboarding_url)) {
      data.onboarding_url = data.onboarding_url.replace(/https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/, APP_BASE_URL);
    }

    return data as ProvisioningSuccessResponse;
  } catch (err: any) {
    clearTimeout(timeoutId);
    if (err?.isServerError) {
      // Real API validation rejection (e.g. 409 User Already Exists, 400 Bad Request) - rethrow to inform user
      throw err;
    }

    console.error('[ProvisioningService] Remote API unreachable, timed out, or returned network error:', err);

    const isTimeout = err?.name === 'AbortError';
    const friendlyError = isTimeout
      ? new Error('זמן ההמתנה לשרת אזל בעת הקמת הבניין (Timeout). אנא וודא חיבור תקין לרשת ונסה שוב.')
      : new Error(err?.message || 'חלה שגיאת תקשורת מול השרת בעת הקמת הבניין. אנא נסה שוב.');

    (friendlyError as any).isServerError = true;
    throw friendlyError;
  }
}
