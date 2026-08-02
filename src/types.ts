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
