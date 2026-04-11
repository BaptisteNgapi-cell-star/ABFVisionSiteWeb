// ─── TYPES ────────────────────────────────────────────────────────────────────
export interface User {
  id: string; name: string; email: string; isLoggedIn: boolean;
}
export interface BaseTestimonial {
  id: number | string; name: string; rating: number; avatar: string;
}
export interface InitialTestimonial extends BaseTestimonial {
  role: { fr: string; en: string };
  comment: { fr: string; en: string };
}
export interface UserComment extends BaseTestimonial {
  role: string; comment: string; userId: string; date: string; language: 'fr' | 'en';
}
export type Testimonial = InitialTestimonial | UserComment;

export type Mode = "login" | "register";

// ─── TYPES ─────────────────────────────────────────────────────────────────────
export type Language = 'fr' | 'en';
export type TabId = 'overview' | 'details' | 'download' | 'support' | 'history';
export type LicenseStatus = 'active' | 'expired' | 'pending' | 'suspended' | 'gracePeriod';
export type LicensePlan = 'BASIC' | 'PRO' | 'ENTERPRISE' | 'PREMIUM';

export interface License {
  id: string;
  licenseKey: string;
  institutionName: string;
  plan: LicensePlan;
  status: LicenseStatus;
  schoolId: string;
  issuedDate: string;
  expiryDate: string;
  maxVersion: string;
  currentVersion: string;
  installations: number;
  maxInstallations: number;
  lastActivated: string;
  features: string[];
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

export interface SolutionsSectionProps {
  language: 'fr' | 'en';
  onNavigate: (section: string) => void;
}


export type ViewMode = 'grid' | 'list';
export type SortBy = 'popularity' | 'recent' | 'rating' | 'alphabetical';

export interface Template {
  id: string;
  name: { fr: string; en: string };
  description: { fr: string; en: string };
  category: string;
  type: string;
  accent: string;
  icon: React.ElementType;
  downloads: number;
  rating: number;
  lastUpdated: string;
  size: string;
  tags: string[];
  featured?: boolean;
}
