export type Language = 'he' | 'en';

export interface NavItem {
  id: string;
  label: string;
}

export interface FeatureItem {
  id: string;
  iconName: string;
  title: string;
  description: string;
  badge?: string;
  benefits: string[];
}

export interface TargetAudience {
  id: 'vaad' | 'management';
  title: string;
  subtitle: string;
  icon: string;
  highlights: string[];
  ctaText: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  priceMonthly: string;
  priceYearly: string;
  isPopular?: boolean;
  features: string[];
  cta: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  building: string;
  city: string;
  rating: number;
  avatarUrl: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'payments' | 'vaad' | 'management';
}

export interface ModalData {
  title: string;
  subtitle: string;
  nameLabel: string;
  phoneLabel: string;
  emailLabel: string;
  roleLabel: string;
  roleVaad: string;
  roleResident: string;
  roleManagement: string;
  apartmentsLabel: string;
  notesLabel?: string;
  successMsg: string;
}

export interface FooterData {
  tagline: string;
  rights: string;
  accessibility: string;
  privacy: string;
  terms: string;
  contactPhone: string;
  contactEmail: string;
}

export interface CalculatorData {
  title: string;
  subtitle: string;
  apartmentsLabel: string;
  duesLabel: string;
  resultsTitle: string;
  monthlyRevenue: string;
  recoveredRevenue: string;
  hoursSaved: string;
  yearlySavings: string;
}

export interface MockupTransaction {
  name: string;
  amount: string;
  status: string;
  time: string;
}

export interface AppMockupData {
  title: string;
  month: string;
  duesCollected: string;
  targetDues: string;
  collectionPercentage: string;
  activeTickets: number;
  pendingVotes: number;
  recentTransactions: MockupTransaction[];
  activeTicketTitle: string;
  activeTicketStatus: string;
  activeVoteTitle: string;
  activeVoteStatus: string;
}
