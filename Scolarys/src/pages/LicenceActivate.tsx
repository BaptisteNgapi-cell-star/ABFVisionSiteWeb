// pages/LicensePortal.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  FiKey, FiCopy, FiDownload, FiRefreshCw, FiX,
  FiCheck, FiShield, FiAlertTriangle, FiClock,
  FiGlobe, FiMail, FiExternalLink, FiArrowRight,
  FiHash, FiCpu, FiZap, FiCalendar, FiLock,
  FiDatabase, FiHardDrive, FiFileText, FiInfo
} from 'react-icons/fi';
import type { License, Toast, LicenseStatus, LicensePlan, Language, TabId } from '../types';

const T = {
  fr: {
    eyebrow: 'Portail de licence',
    headline1: 'Votre licence',
    headline2: 'Scolarys.',
    subtitle: 'Gérez, téléchargez et activez votre licence d\'établissement en toute sécurité.',
    tabs: {
      overview: 'Vue d\'ensemble',
      details: 'Détails',
      download: 'Récupérer',
      support: 'Support',
      history: 'Historique',
    },
    status: { active: 'Active', expired: 'Expirée', pending: 'En attente', suspended: 'Suspendue', gracePeriod: 'Grâce' },
    planLabel: 'Forfait',
    schoolIdLabel: 'ID Établissement',
    issuedLabel: 'Émise le',
    expiryLabel: 'Expire le',
    versionLabel: 'Version max.',
    installLabel: 'Installations',
    lastActLabel: 'Dernière activation',
    daysLabel: 'Jours restants',
    dlBtn: 'Récupérer la licence',
    copyBtn: 'Copier la clé',
    supportBtn: 'Contacter le support',
    renewBtn: 'Renouveler',
    refreshBtn: 'Actualiser',
    langToggle: 'EN',
    licKeyLabel: 'Clé de licence',
    featuresLabel: 'Fonctionnalités incluses',
    dlTitle: 'Récupérer votre licence',
    dlSubtitle: 'Choisissez le format adapté à votre établissement',
    dlFormats: {
      online: 'Activation en ligne',
      file: 'Fichier de licence',
      usb: 'Clé USB sécurisée',
      manual: 'Documentation',
    },
    dlDesc: {
      online: 'Activation instantanée via notre serveur sécurisé',
      file: 'Fichier .licpkg chiffré pour installation hors ligne',
      usb: 'Générez une clé USB d\'activation sécurisée',
      manual: 'Guide complet d\'installation et d\'activation',
    },
    dlRecommended: 'Recommandé',
    security: 'Chiffrement Ed25519 + AES-256-GCM',
    oneLicense: 'Une licence par établissement',
    supportTitle: 'Support technique',
    docTitle: 'Documentation',
    docDesc: 'Guides d\'installation, FAQ et références API.',
    docLink: 'Accéder à la documentation',
    contactTitle: 'Contacter le support',
    email: 'support@scolarys.com',
    hours: 'Lun–Ven : 9h–18h',
    historyTitle: 'Historique',
    historyEmpty: 'Aucun événement enregistré.',
    noLicense: 'Aucune licence attribuée',
    noLicenseSub: 'Contactez le support pour obtenir une licence.',
    loading: 'Chargement de votre licence…',
    copied: 'Clé copiée',
    downloaded: 'Licence téléchargée',
    expirySoon: (d: number) => `Votre licence expire dans ${d} jour${d > 1 ? 's' : ''}`,
    installLimit: 'Limite d\'installations atteinte',
    cancelBtn: 'Annuler',
    expiresIn: (d: number) => `Expire dans ${d}j`,
  },
  en: {
    eyebrow: 'License portal',
    headline1: 'Your Scolarys',
    headline2: 'license.',
    subtitle: 'Manage, download and activate your institution license securely.',
    tabs: {
      overview: 'Overview',
      details: 'Details',
      download: 'Retrieve',
      support: 'Support',
      history: 'History',
    },
    status: { active: 'Active', expired: 'Expired', pending: 'Pending', suspended: 'Suspended', gracePeriod: 'Grace' },
    planLabel: 'Plan',
    schoolIdLabel: 'Institution ID',
    issuedLabel: 'Issued',
    expiryLabel: 'Expires',
    versionLabel: 'Max version',
    installLabel: 'Installations',
    lastActLabel: 'Last activation',
    daysLabel: 'Days remaining',
    dlBtn: 'Retrieve license',
    copyBtn: 'Copy key',
    supportBtn: 'Contact support',
    renewBtn: 'Renew',
    refreshBtn: 'Refresh',
    langToggle: 'FR',
    licKeyLabel: 'License key',
    featuresLabel: 'Included features',
    dlTitle: 'Retrieve your license',
    dlSubtitle: 'Choose the format suitable for your institution',
    dlFormats: {
      online: 'Online Activation',
      file: 'License File',
      usb: 'Secure USB Key',
      manual: 'Documentation',
    },
    dlDesc: {
      online: 'Instant activation via our secure server',
      file: 'Encrypted .licpkg file for offline installation',
      usb: 'Generate a secure USB activation key',
      manual: 'Complete installation and activation guide',
    },
    dlRecommended: 'Recommended',
    security: 'Ed25519 + AES-256-GCM encryption',
    oneLicense: 'One license per institution',
    supportTitle: 'Technical support',
    docTitle: 'Documentation',
    docDesc: 'Installation guides, FAQ and API references.',
    docLink: 'Access documentation',
    contactTitle: 'Contact support',
    email: 'support@scolarys.com',
    hours: 'Mon–Fri: 9am–6pm',
    historyTitle: 'History',
    historyEmpty: 'No events recorded.',
    noLicense: 'No license assigned',
    noLicenseSub: 'Contact support to get a license.',
    loading: 'Loading your license…',
    copied: 'Key copied',
    downloaded: 'License downloaded',
    expirySoon: (d: number) => `Your license expires in ${d} day${d > 1 ? 's' : ''}`,
    installLimit: 'Installation limit reached',
    cancelBtn: 'Cancel',
    expiresIn: (d: number) => `Expires in ${d}d`,
  },
};

// ─── MOCK DATA ──────────────────────────────────────────────────────────────────
const MOCK: License = {
  id: '1',
  licenseKey: 'SCOL-LIC-2025-00123-XYZ',
  institutionName: 'Lycée Descartes',
  plan: 'ENTERPRISE',
  status: 'active',
  schoolId: 'LYC-00123',
  issuedDate: '2025-01-15T00:00:00Z',
  expiryDate: '2026-01-15T00:00:00Z',
  maxVersion: '2.4.1',
  currentVersion: '2.4.0',
  installations: 3,
  maxInstallations: 10,
  lastActivated: '2025-10-10T14:30:00Z',
  features: ['Gestion complète', 'Support premium', 'Formation incluse', 'Mises à jour automatiques'],
};

const HISTORY = [
  { dot: '#34D399', event: { fr: 'Activation en ligne réussie', en: 'Online activation successful' }, time: '15 Jan 2025 · 14:23' },
  { dot: '#9AAEFF', event: { fr: 'Renouvellement automatique configuré', en: 'Auto-renewal configured' }, time: '15 Jan 2025 · 14:25' },
  { dot: '#9AAEFF', event: { fr: '3 sessions actives enregistrées', en: '3 active sessions recorded' }, time: 'Hier · 09:00' },
];

// ─── UTILS ─────────────────────────────────────────────────────────────────────
const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 18 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
};

const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-center gap-3 mb-5">
    <div className="w-1 h-5 rounded-full bg-[#9AAEFF]" />
    <span className="text-[#9AAEFF] text-xs font-light tracking-[0.3em] uppercase">{children}</span>
  </div>
);

// Status config
const STATUS_CFG: Record<LicenseStatus, { color: string; bg: string; border: string; dot: string }> = {
  active: { color: '#34D399', bg: 'rgba(52,211,153,0.08)', border: 'rgba(52,211,153,0.2)', dot: '#34D399' },
  expired: { color: '#F87171', bg: 'rgba(248,113,113,0.08)', border: 'rgba(248,113,113,0.2)', dot: '#F87171' },
  pending: { color: '#F59E0B', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)', dot: '#F59E0B' },
  suspended: { color: '#98A2B3', bg: 'rgba(152,162,179,0.08)', border: 'rgba(152,162,179,0.2)', dot: '#98A2B3' },
  gracePeriod: { color: '#C084FC', bg: 'rgba(192,132,252,0.08)', border: 'rgba(192,132,252,0.2)', dot: '#C084FC' },
};

const PLAN_CFG: Record<LicensePlan, string> = {
  BASIC: '#98A2B3', PRO: '#9AAEFF', PREMIUM: '#F59E0B', ENTERPRISE: '#C084FC',
};

// ─── STATUS BADGE ───────────────────────────────────────────────────────────────
const StatusBadge: React.FC<{ status: LicenseStatus; language: Language }> = ({ status, language }) => {
  const cfg = STATUS_CFG[status];
  return (
    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-light"
      style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: cfg.dot }} />
      {T[language].status[status]}
    </span>
  );
};

// ─── TOAST ──────────────────────────────────────────────────────────────────────
const ToastBar: React.FC<{ toast: Toast | null; onClose: () => void }> = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [toast, onClose]);

  const colors: Record<string, string> = {
    success: '#34D399', error: '#F87171', info: '#9AAEFF', warning: '#F59E0B',
  };

  return (
    <AnimatePresence>
      {toast && (
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }} transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.3 }}
          className="fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl border"
          style={{ background: '#1A1F2E', borderColor: `${colors[toast.type]}25` }}>
          <span className="w-2 h-2 rounded-full" style={{ background: colors[toast.type] }} />
          <span className="text-sm font-light text-white/80">{toast.message}</span>
          <button onClick={onClose} className="text-white/20 hover:text-white/50 transition-colors ml-1">
            <FiX size={13} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ─── DOWNLOAD MODAL ─────────────────────────────────────────────────────────────
const DownloadModal: React.FC<{
  isOpen: boolean; onClose: () => void; license: License; language: Language;
  onDownload: (format: 'online' | 'file' | 'usb') => void;
}> = ({ isOpen, onClose, license, language, onDownload }) => {
  const t = T[language];

  const OPTIONS = [
    { id: 'online' as const, icon: FiGlobe, accent: '#34D399', recommended: true },
    { id: 'file' as const, icon: FiFileText, accent: '#9AAEFF' },
    { id: 'usb' as const, icon: FiHardDrive, accent: '#C084FC' },
    { id: 'manual' as const, icon: FiDatabase, accent: '#F59E0B' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/65 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={onClose}>
          <motion.div initial={{ scale: 0.92, opacity: 0, y: 18 }} animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0 }} transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.35 }}
            className="bg-[#1A1F2E] border border-white/8 rounded-2xl max-w-md w-full overflow-hidden"
            onClick={e => e.stopPropagation()}>

            <div className="h-0.5" style={{ background: 'linear-gradient(90deg, #9AAEFF, transparent)' }} />

            <div className="p-7">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-[#9AAEFF] mb-1">{t.dlBtn}</p>
                  <h3 className="text-xl font-extralight text-white tracking-tight">{license.institutionName}</h3>
                  <p className="text-xs text-white/25 mt-0.5 font-light">{license.schoolId}</p>
                </div>
                <button onClick={onClose} className="text-white/20 hover:text-white/50 transition-colors">
                  <FiX size={16} />
                </button>
              </div>

              {/* Options */}
              <div className="flex flex-col gap-2 mb-6">
                {OPTIONS.map(opt => {
                  const Icon = opt.icon;
                  return (
                    <motion.button key={opt.id} whileHover={{ x: 3 }} whileTap={{ scale: 0.98 }}
                      onClick={() => { if (opt.id !== 'manual') { onDownload(opt.id); } onClose(); }}
                      className="flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-150 group"
                      style={{ background: `${opt.accent}06`, borderColor: `${opt.accent}18` }}>
                      <div className="w-9 h-9 flex items-center justify-center rounded-lg shrink-0"
                        style={{ background: `${opt.accent}15` }}>
                        <Icon size={15} style={{ color: opt.accent }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-sm font-extralight text-white">{t.dlFormats[opt.id]}</span>
                          {opt.recommended && (
                            <span className="text-[9px] px-2 py-0.5 rounded font-light tracking-widest uppercase"
                              style={{ background: `${opt.accent}18`, color: opt.accent }}>
                              {t.dlRecommended}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-white/25 font-light">{t.dlDesc[opt.id]}</p>
                      </div>
                      <FiArrowRight size={12} className="text-white/15 group-hover:text-white/40 transition-colors shrink-0" />
                    </motion.button>
                  );
                })}
              </div>

              {/* Security footer */}
              <div className="flex items-center gap-2 pt-5 border-t border-white/5">
                <FiShield size={12} className="text-white/20" />
                <span className="text-[10px] text-white/20 font-light">{t.security}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ─── META TILE ──────────────────────────────────────────────────────────────────
const MetaTile: React.FC<{ icon: React.ElementType; label: string; value: string; accent?: string }> = ({
  icon: Icon, label, value, accent = '#9AAEFF'
}) => (
  <div className="rounded-xl border border-white/5 p-4 bg-white/1 flex flex-col gap-2">
    <div className="flex items-center gap-2">
      <Icon size={11} style={{ color: `${accent}80` }} />
      <span className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-light">{label}</span>
    </div>
    <span className="text-sm font-extralight text-white tracking-tight">{value}</span>
  </div>
);

// ─── TABS ────────────────────────────────────────────────────────────────────────
const TABS: { id: TabId; icon: React.ElementType }[] = [
  { id: 'overview', icon: FiZap },
  { id: 'details', icon: FiKey },
  { id: 'download', icon: FiDownload },
  { id: 'support', icon: FiMail },
  { id: 'history', icon: FiClock },
];

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────────
const LicensePortal: React.FC = () => {
  const [language, setLanguage] = useState<Language>('fr');
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [license, setLicense] = useState<License | null>(null);
  const [dlModalOpen, setDlModalOpen] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [keyCopied, setKeyCopied] = useState(false);

  const t = T[language];

  const showToast = useCallback((message: string, type: Toast['type'] = 'success') => {
    setToast({ id: Date.now().toString(), message, type });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLicense(MOCK);
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleCopyKey = useCallback(() => {
    if (!license) return;
    navigator.clipboard.writeText(license.licenseKey).catch(() => { });
    setKeyCopied(true);
    showToast(t.copied);
    setTimeout(() => setKeyCopied(false), 2000);
  }, [license, showToast, t.copied]);

  const handleDownload = useCallback((format: 'online' | 'file' | 'usb') => {
    if (!license) return;
    const blob = new Blob([JSON.stringify({
      licenseKey: license.licenseKey,
      institution: license.institutionName,
      plan: license.plan,
      expiryDate: license.expiryDate
    }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Scolarys_License_${license.schoolId}_${format}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(t.downloaded);
  }, [license, showToast, t.downloaded]);

  // Correction: Utilisation de useMemo pour éviter Date.now() pendant le render
  const daysRemaining = React.useMemo(() => {
    if (!license) return 0;
    const expiry = new Date(license.expiryDate);
    const now = new Date();
    return Math.ceil((expiry.getTime() - now.getTime()) / 86400000);
  }, [license]);

  const usagePct = license ? (license.installations / license.maxInstallations) * 100 : 0;

  // ── Loading ──
  if (isLoading) return (
    <div className="min-h-screen bg-[#1A1F2E] flex items-center justify-center">
      <div className="text-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 rounded-full border-2 border-white/5 border-t-[#9AAEFF] mx-auto mb-4" />
        <p className="text-xs text-white/25 font-light tracking-[0.2em] uppercase">{t.loading}</p>
      </div>
    </div>
  );

  // ── No license ──
  if (!license) return (
    <div className="min-h-screen bg-[#1A1F2E] flex items-center justify-center">
      <div className="text-center max-w-xs">
        <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center rounded-2xl bg-white/3 border border-white/8">
          <FiKey size={20} className="text-white/20" />
        </div>
        <h2 className="text-xl font-extralight text-white mb-2">{t.noLicense}</h2>
        <p className="text-sm text-white/25 font-light">{t.noLicenseSub}</p>
      </div>
    </div>
  );

  // ── Main ──
  return (
    <div className="min-h-screen bg-[#1A1F2E] text-white overflow-hidden">
      <ToastBar toast={toast} onClose={() => setToast(null)} />
      <DownloadModal isOpen={dlModalOpen} onClose={() => setDlModalOpen(false)}
        license={license} language={language} onDownload={handleDownload} />

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section className="relative pt-16 pb-12 px-6 sm:px-12 lg:px-20 border-b border-white/5">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(154,174,255,0.05) 0%, transparent 70%)', transform: 'translate(30%,-30%)' }} />
          <svg className="absolute inset-0 w-full h-full opacity-[0.022]">
            <defs><pattern id="lpg" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#9AAEFF" strokeWidth="0.5" />
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#lpg)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="flex items-start justify-between gap-6">
            {/* Left: title */}
            <div className="flex-1 min-w-0">
              <Reveal>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-1 h-6 rounded-full bg-[#9AAEFF]" />
                  <span className="text-[#9AAEFF] text-xs font-light tracking-[0.3em] uppercase">{t.eyebrow}</span>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extralight tracking-tight leading-[1.05] mb-3">
                  {t.headline1}<br />
                  <span className="text-[#9AAEFF]">{t.headline2}</span>
                </h1>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="text-[#98A2B3] font-light text-base max-w-md">{t.subtitle}</p>
              </Reveal>
            </div>

            {/* Right: institution card */}
            <Reveal delay={0.2} className="hidden lg:block shrink-0 w-72">
              <div className="rounded-2xl border border-white/6 overflow-hidden bg-white/1.5">
                <div className="h-0.5"
                  style={{ background: `linear-gradient(90deg, ${PLAN_CFG[license.plan]}, transparent)` }} />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <StatusBadge status={license.status} language={language} />
                    <span className="text-xs font-light px-2.5 py-1 rounded-md"
                      style={{ background: `${PLAN_CFG[license.plan]}12`, color: PLAN_CFG[license.plan], border: `1px solid ${PLAN_CFG[license.plan]}25` }}>
                      {license.plan}
                    </span>
                  </div>
                  <div className="text-base font-extralight text-white mb-0.5 tracking-tight">{license.institutionName}</div>
                  <div className="text-xs text-white/25 font-light mb-5">{license.schoolId}</div>
                  {/* Progress */}
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-[10px] text-white/20 uppercase tracking-widest">{t.installLabel}</span>
                    <span className="text-[10px] text-white/30 font-light">{license.installations}/{license.maxInstallations}</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div className="h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${usagePct}%` }}
                      transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      style={{ background: usagePct > 80 ? '#F87171' : '#9AAEFF' }} />
                  </div>
                  {/* Expiry */}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-[10px] text-white/15 uppercase tracking-widest">{t.expiryLabel}</span>
                    <span className="text-xs font-light"
                      style={{ color: daysRemaining < 30 ? '#F59E0B' : '#34D399' }}>
                      {t.expiresIn(daysRemaining)}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Quick actions */}
          <Reveal delay={0.28}>
            <div className="flex flex-wrap gap-3 mt-8">
              <motion.button whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.97 }}
                onClick={() => setDlModalOpen(true)}
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-light tracking-wide bg-[#9AAEFF] text-[#1A1F2E]"
                style={{ boxShadow: '0 0 30px rgba(154,174,255,0.2)' }}>
                <FiDownload size={13} />
                {t.dlBtn}
              </motion.button>
              <motion.button whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.97 }}
                onClick={handleCopyKey}
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-light border border-white/8 text-white/50 hover:text-white/80 hover:border-white/15 transition-all duration-200">
                {keyCopied ? <FiCheck size={13} className="text-[#34D399]" /> : <FiCopy size={13} />}
                {t.copyBtn}
              </motion.button>
              <motion.button whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.97 }}
                onClick={() => { setActiveTab('support'); }}
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-light border border-white/8 text-white/50 hover:text-white/80 hover:border-white/15 transition-all duration-200">
                <FiMail size={13} />
                {t.supportBtn}
              </motion.button>
              {/* Lang + Refresh */}
              <div className="ml-auto flex items-center gap-2">
                <button onClick={() => setLanguage(l => l === 'fr' ? 'en' : 'fr')}
                  className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-white/8 text-xs font-light text-white/40 hover:text-white/70 hover:border-white/15 transition-all">
                  <FiGlobe size={11} />
                  {t.langToggle}
                </button>
                <button onClick={() => { setIsLoading(true); setTimeout(() => setIsLoading(false), 900); }}
                  className="p-2.5 rounded-xl border border-white/8 text-white/25 hover:text-white/60 hover:border-white/15 transition-all">
                  <FiRefreshCw size={13} />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ TAB NAV ════════════════════════════════════════════════════════════ */}
      <div className="border-b border-white/5 px-6 sm:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto flex items-center gap-1 overflow-x-auto py-1">
          {TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className="relative flex items-center gap-2 px-4 py-3 text-xs font-light tracking-wide whitespace-nowrap transition-all duration-150 rounded-lg"
                style={isActive
                  ? { color: '#9AAEFF', background: 'rgba(154,174,255,0.07)' }
                  : { color: 'rgba(255,255,255,0.3)' }}>
                <Icon size={12} />
                {t.tabs[tab.id]}
                {isActive && (
                  <motion.div layoutId="tab-indicator"
                    className="absolute bottom-0 left-3 right-3 h-px rounded-full bg-[#9AAEFF]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ══ TAB CONTENT ════════════════════════════════════════════════════════ */}
      <main className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-12">
        <AnimatePresence mode="wait">
          {/* OVERVIEW */}
          {activeTab === 'overview' && (
            <motion.div key="overview" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
              <SectionLabel>{t.tabs.overview}</SectionLabel>

              {/* Expiry warning */}
              {daysRemaining > 0 && daysRemaining <= 30 && (
                <Reveal>
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl border mb-7"
                    style={{ background: 'rgba(245,158,11,0.06)', borderColor: 'rgba(245,158,11,0.2)' }}>
                    <FiAlertTriangle size={13} className="text-[#F59E0B] shrink-0" />
                    <p className="text-sm font-light text-[#F59E0B]">{t.expirySoon(daysRemaining)}</p>
                  </div>
                </Reveal>
              )}

              {/* KPI grid */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden mb-7">
                {[
                  { icon: FiHash, label: t.schoolIdLabel, value: license.schoolId, accent: '#9AAEFF' },
                  { icon: FiCalendar, label: t.issuedLabel, value: new Date(license.issuedDate).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US'), accent: '#9AAEFF' },
                  { icon: FiCalendar, label: t.expiryLabel, value: new Date(license.expiryDate).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US'), accent: daysRemaining < 30 ? '#F59E0B' : '#34D399' },
                  { icon: FiCpu, label: t.versionLabel, value: license.maxVersion, accent: '#C084FC' },
                  { icon: FiZap, label: t.installLabel, value: `${license.installations} / ${license.maxInstallations}`, accent: usagePct > 80 ? '#F87171' : '#34D399' },
                  { icon: FiClock, label: t.lastActLabel, value: new Date(license.lastActivated).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US'), accent: '#9AAEFF' },
                ].map((item, i) => (
                  <Reveal key={i} delay={0.04 * i}>
                    <div className="bg-[#1A1F2E] px-6 py-5">
                      <div className="flex items-center gap-2 mb-3">
                        <item.icon size={11} style={{ color: `${item.accent}70` }} />
                        <span className="text-[9px] uppercase tracking-[0.25em] font-light text-white/20">{item.label}</span>
                      </div>
                      <span className="text-sm font-extralight text-white">{item.value}</span>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* Usage progress */}
              <Reveal delay={0.15}>
                <div className="rounded-2xl border border-white/5 p-6 bg-white/1">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-white/30 uppercase tracking-[0.2em] font-light">{t.installLabel}</span>
                    <span className="text-xs font-extralight" style={{ color: usagePct > 80 ? '#F87171' : '#9AAEFF' }}>
                      {license.installations} / {license.maxInstallations}
                    </span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div className="h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${usagePct}%` }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                      style={{ background: usagePct > 80 ? '#F87171' : 'linear-gradient(90deg, #9AAEFF, #7B93FF)' }} />
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-[10px] text-white/15 font-light">0</span>
                    <span className="text-[10px] font-light" style={{ color: usagePct > 80 ? '#F87171' : 'rgba(154,174,255,0.4)' }}>
                      {Math.round(usagePct)}%
                    </span>
                    <span className="text-[10px] text-white/15 font-light">{license.maxInstallations}</span>
                  </div>
                </div>
              </Reveal>
            </motion.div>
          )}

          {/* DETAILS */}
          {activeTab === 'details' && (
            <motion.div key="details" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
              <SectionLabel>{t.tabs.details}</SectionLabel>

              {/* License key */}
              <Reveal className="mb-5">
                <div className="rounded-2xl border border-white/5 overflow-hidden bg-white/1">
                  <div className="h-0.5" style={{ background: 'linear-gradient(90deg, #9AAEFF, transparent)' }} />
                  <div className="p-6">
                    <div className="text-[10px] uppercase tracking-[0.25em] text-white/20 font-light mb-3">{t.licKeyLabel}</div>
                    <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white/2.5 border border-white/5">
                      <code className="font-mono text-sm text-[#9AAEFF] tracking-widest break-all">{license.licenseKey}</code>
                      <motion.button whileTap={{ scale: 0.9 }} onClick={handleCopyKey}
                        className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-[#9AAEFF]/10 text-[#9AAEFF] hover:bg-[#9AAEFF]/20 transition-colors">
                        {keyCopied ? <FiCheck size={13} /> : <FiCopy size={13} />}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Features */}
              <Reveal delay={0.08}>
                <div className="rounded-2xl border border-white/5 p-6 bg-white/1">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-white/20 font-light mb-5">{t.featuresLabel}</div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {license.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 flex items-center justify-center rounded-md bg-[#34D399]/10 border border-[#34D399]/20 shrink-0">
                          <FiCheck size={10} className="text-[#34D399]" />
                        </div>
                        <span className="text-sm font-extralight text-white/60">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Meta tiles */}
              <Reveal delay={0.14}>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-5">
                  <MetaTile icon={FiZap} label={t.planLabel} value={license.plan} accent={PLAN_CFG[license.plan]} />
                  <MetaTile icon={FiCpu} label={t.versionLabel} value={license.maxVersion} />
                  <MetaTile icon={FiHash} label={t.schoolIdLabel} value={license.schoolId} />
                </div>
              </Reveal>
            </motion.div>
          )}

          {/* DOWNLOAD */}
          {activeTab === 'download' && (
            <motion.div key="download" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
              <SectionLabel>{t.tabs.download}</SectionLabel>

              <div className="grid lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 flex flex-col gap-3">
                  {(['online', 'file', 'usb', 'manual'] as const).map((fmt, i) => {
                    const ACCENTS = { online: '#34D399', file: '#9AAEFF', usb: '#C084FC', manual: '#F59E0B' };
                    const ICONS = { online: FiGlobe, file: FiFileText, usb: FiHardDrive, manual: FiDatabase };
                    const accent = ACCENTS[fmt];
                    const Icon = ICONS[fmt];
                    return (
                      <Reveal key={fmt} delay={0.05 * i}>
                        <motion.button whileHover={{ x: 4 }} whileTap={{ scale: 0.99 }}
                          onClick={() => { if (fmt !== 'manual') setDlModalOpen(true); }}
                          className="w-full flex items-center gap-4 p-5 rounded-xl border text-left transition-all duration-150 group"
                          style={{ background: `${accent}04`, borderColor: `${accent}18` }}>
                          <div className="w-10 h-10 flex items-center justify-center rounded-xl shrink-0"
                            style={{ background: `${accent}14` }}>
                            <Icon size={15} style={{ color: accent }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-sm font-extralight text-white">{t.dlFormats[fmt]}</span>
                              {fmt === 'online' && (
                                <span className="text-[9px] px-2 py-0.5 rounded font-light tracking-widest uppercase"
                                  style={{ background: `${accent}15`, color: accent }}>{t.dlRecommended}</span>
                              )}
                            </div>
                            <p className="text-xs text-white/25 font-light">{t.dlDesc[fmt]}</p>
                          </div>
                          <FiArrowRight size={12} className="text-white/10 group-hover:text-white/40 transition-colors shrink-0" />
                        </motion.button>
                      </Reveal>
                    );
                  })}
                </div>

                {/* Security info panel */}
                <div className="lg:col-span-5">
                  <Reveal delay={0.15} className="rounded-2xl border border-white/5 overflow-hidden bg-white/1 h-full">
                    <div className="h-0.5" style={{ background: 'linear-gradient(90deg, #34D399, transparent)' }} />
                    <div className="p-7">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#34D399]/10 border border-[#34D399]/20">
                          <FiShield size={15} className="text-[#34D399]" />
                        </div>
                        <span className="text-sm font-extralight text-white">{t.security}</span>
                      </div>
                      {[
                        { label: 'Ed25519', desc: language === 'fr' ? 'Signature cryptographique' : 'Cryptographic signature' },
                        { label: 'AES-256-GCM', desc: language === 'fr' ? 'Chiffrement des données' : 'Data encryption' },
                        { label: language === 'fr' ? 'Intégrité' : 'Integrity', desc: language === 'fr' ? 'Hash SHA-256 vérifié' : 'SHA-256 hash verified' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3 py-3 border-b border-white/5 last:border-0">
                          <FiLock size={11} className="text-[#34D399]/50 mt-0.5 shrink-0" />
                          <div>
                            <div className="text-xs font-extralight text-white mb-0.5">{item.label}</div>
                            <div className="text-[10px] text-white/20 font-light">{item.desc}</div>
                          </div>
                        </div>
                      ))}
                      <div className="mt-5 flex items-center gap-2 text-[10px] text-white/15 font-light">
                        <FiInfo size={10} />
                        {t.oneLicense}
                      </div>
                    </div>
                  </Reveal>
                </div>
              </div>
            </motion.div>
          )}

          {/* SUPPORT */}
          {activeTab === 'support' && (
            <motion.div key="support" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
              <SectionLabel>{t.supportTitle}</SectionLabel>

              <div className="grid lg:grid-cols-2 gap-4">
                {/* Documentation */}
                <Reveal>
                  <div className="rounded-2xl border border-white/5 overflow-hidden bg-white/1 h-full">
                    <div className="h-0.5" style={{ background: 'linear-gradient(90deg, #9AAEFF, transparent)' }} />
                    <div className="p-7">
                      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#9AAEFF]/10 border border-[#9AAEFF]/20 mb-5">
                        <FiFileText size={15} className="text-[#9AAEFF]" />
                      </div>
                      <h3 className="text-base font-extralight text-white mb-2">{t.docTitle}</h3>
                      <p className="text-sm text-white/30 font-light mb-6 leading-relaxed">{t.docDesc}</p>
                      <motion.button whileHover={{ x: 3 }} className="flex items-center gap-2 text-[#9AAEFF] text-sm font-light hover:text-white/70 transition-colors">
                        {t.docLink}
                        <FiExternalLink size={12} />
                      </motion.button>
                    </div>
                  </div>
                </Reveal>

                {/* Contact */}
                <Reveal delay={0.08}>
                  <div className="rounded-2xl border border-white/5 overflow-hidden bg-white/1 h-full">
                    <div className="h-0.5" style={{ background: 'linear-gradient(90deg, #34D399, transparent)' }} />
                    <div className="p-7">
                      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#34D399]/10 border border-[#34D399]/20 mb-5">
                        <FiMail size={15} className="text-[#34D399]" />
                      </div>
                      <h3 className="text-base font-extralight text-white mb-5">{t.contactTitle}</h3>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <FiMail size={12} className="text-[#9AAEFF]/50 shrink-0" />
                          <a href={`mailto:${t.email}`}
                            className="text-sm font-light text-white/40 hover:text-white/80 transition-colors">
                            {t.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-3">
                          <FiClock size={12} className="text-[#9AAEFF]/50 shrink-0" />
                          <span className="text-sm font-light text-white/30">{t.hours}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </motion.div>
          )}

          {/* HISTORY */}
          {activeTab === 'history' && (
            <motion.div key="history" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
              <SectionLabel>{t.historyTitle}</SectionLabel>

              <div className="rounded-2xl border border-white/5 overflow-hidden bg-white/1">
                <div className="h-0.5" style={{ background: 'linear-gradient(90deg, #9AAEFF, transparent)' }} />
                <div className="p-7">
                  {HISTORY.length === 0 ? (
                    <div className="py-16 text-center">
                      <FiClock size={24} className="mx-auto text-white/10 mb-3" />
                      <p className="text-sm font-light text-white/20">{t.historyEmpty}</p>
                    </div>
                  ) : (
                    <div className="flex flex-col divide-y divide-white/5">
                      {HISTORY.map((item, i) => (
                        <Reveal key={i} delay={0.05 * i}>
                          <div className="flex items-start gap-4 py-5 first:pt-0 last:pb-0">
                            <div className="flex flex-col items-center mt-1">
                              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: item.dot }} />
                              {i < HISTORY.length - 1 && (
                                <div className="w-px flex-1 mt-2 -mb-5" style={{ background: 'rgba(255,255,255,0.05)', minHeight: 24 }} />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-extralight text-white/70">
                                {item.event[language]}
                              </p>
                              <p className="text-[10px] text-white/20 font-light mt-1">{item.time}</p>
                            </div>
                          </div>
                        </Reveal>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="mt-16 pt-7 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/15 font-light">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <FiShield size={11} />
              <span>{t.security}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiLock size={11} />
              <span>{t.oneLicense}</span>
            </div>
          </div>
          <span>Scolarys License Portal v{license.currentVersion} · © 2025</span>
        </div>
      </main>
    </div>
  );
};

export default LicensePortal;