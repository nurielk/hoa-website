/**
 * UTM Parameter Tracker
 * Automatically captures marketing UTM parameters from the URL
 * and persists them in sessionStorage for analytics and lead attribution.
 */
export interface UtmData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  ref?: string;
  capturedAt?: string;
}

const STORAGE_KEY = 'dayarplus_utm_params';

export const initUtmTracker = (): UtmData => {
  if (typeof window === 'undefined') return {};

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source');
    const utmMedium = urlParams.get('utm_medium');
    const utmCampaign = urlParams.get('utm_campaign');
    const utmTerm = urlParams.get('utm_term');
    const utmContent = urlParams.get('utm_content');
    const ref = urlParams.get('ref');

    // If new UTM params exist in URL, save or update
    if (utmSource || utmMedium || utmCampaign || ref) {
      const data: UtmData = {
        utm_source: utmSource || undefined,
        utm_medium: utmMedium || undefined,
        utm_campaign: utmCampaign || undefined,
        utm_term: utmTerm || undefined,
        utm_content: utmContent || undefined,
        ref: ref || undefined,
        capturedAt: new Date().toISOString(),
      };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return data;
    }

    // Otherwise load existing from session
    const existing = sessionStorage.getItem(STORAGE_KEY);
    if (existing) {
      return JSON.parse(existing) as UtmData;
    }
  } catch {
    // Graceful fallback
  }

  return {};
};

export const getStoredUtmData = (): UtmData => {
  if (typeof window === 'undefined') return {};
  try {
    const existing = sessionStorage.getItem(STORAGE_KEY);
    if (existing) return JSON.parse(existing);
  } catch {
    // Return empty on error
  }
  return {};
};
