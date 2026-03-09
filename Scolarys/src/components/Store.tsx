// components/StoreSection.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  FiDownload, FiSmartphone, FiMonitor, FiBook,
  FiUsers, FiAward, FiX, FiArrowRight,
  FiCheck, FiStar, FiChevronLeft, FiChevronRight
} from 'react-icons/fi';

// ─── TRANSLATIONS ──────────────────────────────────────────────────────────────
const T = {
  fr: {
    eyebrow: 'Notre Store',
    headline1: 'L\'écosystème',
    headline2: 'complet.',
    subtitle: 'Logiciels de bureau et applications mobiles conçus pour chaque acteur de l\'éducation.',
    catAll: 'Tout voir',
    catSoft: 'Logiciels',
    catMobile: 'Applications',
    dlBtn: 'Télécharger',
    cancelBtn: 'Annuler',
    versionLabel: 'Version',
    sizeLabel: 'Taille',
    reqLabel: 'Configuration',
    featLabel: 'Fonctionnalités',
    allFeat: 'Toutes les fonctionnalités',
    downloads: 'téléchargements',
    dlNow: 'Télécharger maintenant',
    demo: 'Demander une démo',
    whyLabel: 'Pourquoi nous choisir',
    why: [
      { title: 'Interface intuitive',    body: 'Des interfaces conçues pour une prise en main immédiate.' },
      { title: 'Performance optimale',   body: 'Rapide et stable pour tous vos besoins quotidiens.' },
      { title: 'Support réactif',        body: 'Une équipe dédiée pour vous accompagner au quotidien.' },
      { title: 'Mises à jour continues', body: 'Des améliorations régulières basées sur vos retours.' },
    ],
  },
  en: {
    eyebrow: 'Our Store',
    headline1: 'The complete',
    headline2: 'ecosystem.',
    subtitle: 'Desktop software and mobile apps designed for every actor in education.',
    catAll: 'View all',
    catSoft: 'Software',
    catMobile: 'Mobile apps',
    dlBtn: 'Download',
    cancelBtn: 'Cancel',
    versionLabel: 'Version',
    sizeLabel: 'Size',
    reqLabel: 'Requirements',
    featLabel: 'Features',
    allFeat: 'All features',
    downloads: 'downloads',
    dlNow: 'Download now',
    demo: 'Request a demo',
    whyLabel: 'Why choose us',
    why: [
      { title: 'Intuitive interface',   body: 'Interfaces designed for immediate use.' },
      { title: 'Optimal performance',   body: 'Fast and stable for all your daily needs.' },
      { title: 'Responsive support',    body: 'A dedicated team to support you daily.' },
      { title: 'Continuous updates',    body: 'Regular improvements based on your feedback.' },
    ],
  },
};

// ─── PRODUCT DATA ──────────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: 1, num: '01', category: 'software',
    name: 'ABFVision',
    badge: { fr: 'Premium', en: 'Premium' },
    accent: '#9AAEFF',
    icon: FiMonitor,
    platform: 'Windows',
    rating: 4.8, downloads: '10K+',
    desc: {
      fr: 'Plateforme complète de gestion scolaire pour les établissements éducatifs.',
      en: 'Complete school management platform for educational institutions.',
    },
    features: {
      fr: ['Gestion des étudiants et du personnel', 'Emplois du temps dynamiques', 'Suivi des résultats académiques', 'Communication intégrée', 'Rapports analytiques détaillés'],
      en: ['Student and staff management', 'Dynamic schedules', 'Academic results tracking', 'Integrated communication', 'Detailed analytical reports'],
    },
    versions: [
      { ver: 'v2.1.0', size: '45 MB', req: 'Windows 10+, 4 GB RAM' },
      { ver: 'v2.0.5', size: '42 MB', req: 'Windows 10+, 4 GB RAM' },
    ],
  },
  {
    id: 2, num: '02', category: 'mobile',
    name: 'ABFVision Parent',
    badge: { fr: 'Gratuit', en: 'Free' },
    accent: '#F59E0B',
    icon: FiUsers,
    platform: 'Android / iOS',
    rating: 4.6, downloads: '25K+',
    desc: {
      fr: 'Application mobile permettant aux parents de suivre la scolarité de leurs enfants.',
      en: 'Mobile app allowing parents to monitor their children\'s schooling.',
    },
    features: {
      fr: ['Suivi des résultats en temps réel', 'Consultation des emplois du temps', 'Notifications des absences', 'Messagerie avec les enseignants', 'Alertes importantes'],
      en: ['Real-time results tracking', 'Schedule consultation', 'Absence notifications', 'Messaging with teachers', 'Important alerts'],
    },
    versions: [
      { ver: 'v1.5.2', size: '28 MB', req: 'Android 8.0+ / iOS 13+' },
      { ver: 'v1.4.8', size: '26 MB', req: 'Android 8.0+ / iOS 13+' },
    ],
  },
  {
    id: 3, num: '03', category: 'mobile',
    name: 'ABFVision Étudiant',
    badge: { fr: 'Gratuit', en: 'Free' },
    accent: '#34D399',
    icon: FiBook,
    platform: 'Android / iOS',
    rating: 4.5, downloads: '15K+',
    desc: {
      fr: 'Application dédiée aux étudiants pour accéder à leur emploi du temps et résultats.',
      en: 'Dedicated app for students to access their schedule and results.',
    },
    features: {
      fr: ['Emploi du temps personnel', 'Résultats académiques', 'Devoirs et échéances', 'Ressources pédagogiques', 'Communication avec les pairs'],
      en: ['Personal schedule', 'Academic results', 'Homework and deadlines', 'Educational resources', 'Peer communication'],
    },
    versions: [
      { ver: 'v1.3.1', size: '25 MB', req: 'Android 8.0+ / iOS 13+' },
      { ver: 'v1.2.9', size: '24 MB', req: 'Android 8.0+ / iOS 13+' },
    ],
  },
  {
    id: 4, num: '04', category: 'mobile',
    name: 'ExamLibrary',
    badge: { fr: 'Nouveau', en: 'New' },
    accent: '#C084FC',
    icon: FiAward,
    platform: 'Android / iOS',
    rating: 4.7, downloads: '8K+',
    desc: {
      fr: 'Bibliothèque mobile de sujets d\'examens pour une préparation optimale.',
      en: 'Mobile library of exam subjects for optimal preparation.',
    },
    features: {
      fr: ['Base de données exhaustive', 'Recherche avancée', 'Favoris et collections', 'Mode hors ligne', 'Progression personnelle'],
      en: ['Comprehensive database', 'Advanced search', 'Favorites and collections', 'Offline mode', 'Personal progress'],
    },
    versions: [
      { ver: 'v1.2.0', size: '35 MB', req: 'Android 8.0+ / iOS 13+' },
      { ver: 'v1.1.5', size: '32 MB', req: 'Android 8.0+ / iOS 13+' },
    ],
  },
];

type Product = typeof PRODUCTS[0];

// ─── UTILS ─────────────────────────────────────────────────────────────────────
const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 22 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
};

const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-1 h-6 rounded-full bg-[#9AAEFF]" />
    <span className="text-[#9AAEFF] text-xs font-light tracking-[0.3em] uppercase">{children}</span>
  </div>
);

// ─── DOWNLOAD MODAL ────────────────────────────────────────────────────────────
const DownloadModal: React.FC<{
  product: Product; isOpen: boolean; onClose: () => void; language: 'fr' | 'en';
}> = ({ product, isOpen, onClose, language }) => {
  const t = T[language];
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={onClose}>
          <motion.div initial={{ scale: 0.9, opacity: 0, y: 16 }} animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 16 }} transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.35 }}
            className="bg-[#1A1F2E] border border-white/8 rounded-2xl p-7 max-w-md w-full"
            onClick={e => e.stopPropagation()}>

            {/* Header */}
            <div className="flex items-start justify-between mb-7">
              <div>
                <div className="flex items-center gap-2.5 mb-1">
                  <div className="w-6 h-6 flex items-center justify-center rounded-md"
                    style={{ background: `${product.accent}20` }}>
                    <product.icon size={13} style={{ color: product.accent }} />
                  </div>
                  <span className="text-xs tracking-[0.25em] uppercase font-light" style={{ color: product.accent }}>
                    {t.dlBtn}
                  </span>
                </div>
                <h3 className="text-xl font-extralight text-white tracking-tight">{product.name}</h3>
              </div>
              <button onClick={onClose} className="text-white/20 hover:text-white/60 transition-colors mt-1">
                <FiX size={18} />
              </button>
            </div>

            {/* Versions */}
            <div className="flex flex-col gap-3 mb-5">
              {product.versions.map((v, i) => (
                <motion.div key={v.ver} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-xl p-4 border"
                  style={{ background: `${product.accent}06`, borderColor: `${product.accent}18` }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-light" style={{ color: product.accent }}>{t.versionLabel} {v.ver}</span>
                    <span className="text-xs text-white/30">{v.size}</span>
                  </div>
                  <p className="text-xs text-white/30 mb-3 font-light">{t.reqLabel}: {v.req}</p>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    className="w-full py-2.5 rounded-lg text-sm font-light flex items-center justify-center gap-2 transition-all"
                    style={{ background: product.accent, color: '#1A1F2E' }}>
                    <FiDownload size={13} />
                    {t.dlBtn} {v.ver}
                  </motion.button>
                </motion.div>
              ))}
            </div>

            <button onClick={onClose}
              className="w-full py-2.5 rounded-lg text-sm font-light text-white/30 hover:text-white/60 border border-white/5 hover:border-white/10 transition-all">
              {t.cancelBtn}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ─── PRODUCT ROW (list view) ───────────────────────────────────────────────────
const ProductRow: React.FC<{
  product: Product; isActive: boolean; onClick: () => void; language: 'fr' | 'en'; delay: number;
}> = ({ product, isActive, onClick, language, delay }) => {
  const Icon = product.icon;
  return (
    <Reveal delay={delay}>
      <motion.button onClick={onClick}
        className="w-full text-left group border border-white/5 rounded-2xl overflow-hidden relative transition-all duration-200"
        style={{ background: isActive ? `${product.accent}06` : 'rgba(255,255,255,0.01)' }}
        whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>

        {/* Active accent bar */}
        <motion.div className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full"
          style={{ background: product.accent }}
          animate={{ opacity: isActive ? 1 : 0, scaleY: isActive ? 1 : 0 }}
          transition={{ duration: 0.2 }} />

        <div className="px-7 py-5 grid grid-cols-12 gap-5 items-center">
          {/* Phantom number */}
          <div className="col-span-1 hidden lg:block">
            <span className="text-3xl font-extralight leading-none select-none"
              style={{ color: `${product.accent}12`, letterSpacing: '-0.04em' }}>
              {product.num}
            </span>
          </div>

          {/* Icon + name */}
          <div className="col-span-9 lg:col-span-4 flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl shrink-0"
              style={{ background: `${product.accent}15`, border: `1px solid ${product.accent}25` }}>
              <Icon size={16} style={{ color: product.accent }} />
            </div>
            <div>
              <div className="text-[10px] tracking-[0.2em] uppercase font-light mb-0.5"
                style={{ color: product.accent }}>
                {product.badge[language]}
              </div>
              <div className="text-base font-extralight text-white tracking-tight">{product.name}</div>
            </div>
          </div>

          {/* Description */}
          <div className="col-span-12 lg:col-span-4 hidden lg:block">
            <p className="text-xs text-white/30 font-light leading-relaxed line-clamp-2">
              {product.desc[language]}
            </p>
          </div>

          {/* Meta */}
          <div className="col-span-2 lg:col-span-2 hidden lg:flex items-center justify-end gap-4">
            <div className="flex items-center gap-1">
              <FiStar size={11} className="text-yellow-400" />
              <span className="text-xs text-white/40 font-light">{product.rating}</span>
            </div>
            <span className="text-xs text-white/25 font-light">{product.downloads}</span>
          </div>

          {/* Arrow */}
          <div className="col-span-3 lg:col-span-1 flex justify-end">
            <motion.div animate={{ x: isActive ? 3 : 0, opacity: isActive ? 1 : 0.2 }} transition={{ duration: 0.2 }}>
              <FiArrowRight size={13} className="text-white/40 group-hover:text-white/70 transition-colors" />
            </motion.div>
          </div>
        </div>
      </motion.button>
    </Reveal>
  );
};

// ─── PRODUCT DETAIL PANEL ──────────────────────────────────────────────────────
const ProductDetail: React.FC<{
  product: Product; language: 'fr' | 'en'; onDownload: () => void;
}> = ({ product, language, onDownload }) => {
  const t = T[language];
  const Icon = product.icon;
  return (
    <motion.div key={product.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-white/5 overflow-hidden h-full"
      style={{ background: `${product.accent}05` }}>

      {/* Top accent */}
      <div className="h-[2px] w-full" style={{ background: `linear-gradient(90deg, ${product.accent}, transparent)` }} />

      <div className="p-8">
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-14 h-14 flex items-center justify-center rounded-2xl"
            style={{ background: `${product.accent}20`, border: `1px solid ${product.accent}30` }}>
            <Icon size={22} style={{ color: product.accent }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] tracking-[0.25em] uppercase font-light mb-1" style={{ color: product.accent }}>
              {product.badge[language]} · {product.platform}
            </div>
            <h3 className="text-2xl font-extralight text-white tracking-tight">{product.name}</h3>
          </div>
        </div>

        {/* Rating + downloads */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5">
          <div className="flex items-center gap-1.5">
            {[...Array(5)].map((_, i) => (
              <FiStar key={i} size={11}
                className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-white/10'} />
            ))}
            <span className="text-xs text-white/40 ml-1">{product.rating}</span>
          </div>
          <div className="w-px h-3 bg-white/10" />
          <span className="text-xs text-white/30 font-light">{product.downloads} {t.downloads}</span>
          <div className="w-px h-3 bg-white/10" />
          <span className="text-xs text-white/30 font-light">{product.versions[0].ver}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-white/40 font-light leading-relaxed mb-7">{product.desc[language]}</p>

        {/* Features */}
        <div className="mb-7">
          <div className="text-[10px] tracking-[0.25em] uppercase font-light text-white/20 mb-3">{t.allFeat}</div>
          <ul className="space-y-2">
            {product.features[language].map((f, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm font-light text-white/50">
                <FiCheck size={11} className="mt-0.5 shrink-0" style={{ color: product.accent }} />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Version info */}
        <div className="grid grid-cols-2 gap-2 mb-7">
          <div className="rounded-xl p-3 text-center border"
            style={{ background: `${product.accent}08`, borderColor: `${product.accent}18` }}>
            <div className="text-sm font-extralight mb-0.5" style={{ color: product.accent }}>{product.versions[0].ver}</div>
            <div className="text-[10px] text-white/25 uppercase tracking-widest">{t.versionLabel}</div>
          </div>
          <div className="rounded-xl p-3 text-center border"
            style={{ background: `${product.accent}08`, borderColor: `${product.accent}18` }}>
            <div className="text-sm font-extralight mb-0.5" style={{ color: product.accent }}>{product.versions[0].size}</div>
            <div className="text-[10px] text-white/25 uppercase tracking-widest">{t.sizeLabel}</div>
          </div>
        </div>

        {/* Download CTA */}
        <motion.button onClick={onDownload} whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.97 }}
          className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-light tracking-wide transition-all"
          style={{ background: product.accent, color: '#1A1F2E', boxShadow: `0 0 30px ${product.accent}30` }}>
          <FiDownload size={14} />
          {t.dlNow}
        </motion.button>
      </div>
    </motion.div>
  );
};

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
const StoreSection: React.FC<{ language: 'fr' | 'en'; onNavigate?: (s: string) => void }> = ({ language, onNavigate }) => {
  const t = T[language];
  const [activeCategory, setActiveCategory] = useState<'all' | 'software' | 'mobile'>('all');
  const [activeProduct, setActiveProduct] = useState<Product>(PRODUCTS[0]);
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = PRODUCTS.filter(p => activeCategory === 'all' || p.category === activeCategory);

  useEffect(() => {
    if (!filtered.find(p => p.id === activeProduct.id)) {
      setActiveProduct(filtered[0]);
    }
  }, [activeCategory]);

  const categories = [
    { id: 'all',      label: t.catAll },
    { id: 'software', label: t.catSoft },
    { id: 'mobile',   label: t.catMobile },
  ] as const;

  return (
    <div className="min-h-screen bg-[#1A1F2E] text-white overflow-hidden">

      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-24 px-6 sm:px-12 lg:px-20 border-b border-white/5">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(154,174,255,0.05) 0%, transparent 70%)', transform: 'translate(30%,-30%)' }} />
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="sg" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#9AAEFF" strokeWidth="0.5"/>
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#sg)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 rounded-full bg-[#9AAEFF]" />
              <span className="text-[#9AAEFF] text-xs font-light tracking-[0.3em] uppercase">{t.eyebrow}</span>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-16 items-end">
            <Reveal delay={0.1}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extralight leading-[1.05] tracking-tight">
                {t.headline1}<br />
                <span className="text-[#9AAEFF]">{t.headline2}</span>
              </h1>
            </Reveal>
            <Reveal delay={0.25} className="lg:pb-2">
              <p className="text-[#98A2B3] text-lg font-light leading-relaxed max-w-md mb-8">{t.subtitle}</p>
              {/* Stats mini */}
              <div className="grid grid-cols-3 gap-px border border-white/5 rounded-xl overflow-hidden">
                {[
                  { val: '4', lbl: language === 'fr' ? 'Produits' : 'Products' },
                  { val: '58K+', lbl: language === 'fr' ? 'Utilisateurs' : 'Users' },
                  { val: '4.7★', lbl: language === 'fr' ? 'Note moy.' : 'Avg. rating' },
                ].map((s, i) => (
                  <div key={i} className="bg-white/[0.02] px-4 py-4 text-center">
                    <div className="text-xl font-extralight text-white">{s.val}</div>
                    <div className="text-[10px] text-[#484f68] uppercase tracking-widest font-light">{s.lbl}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ CATALOG ═════════════════════════════════════════════════════════ */}
      <section className="border-b border-white/5 py-20 px-6 sm:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">

          {/* Header + category filter */}
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
              <div>
                <SectionLabel>{language === 'fr' ? 'Catalogue' : 'Catalog'}</SectionLabel>
                <h2 className="text-3xl sm:text-4xl font-extralight tracking-tight">
                  {language === 'fr' ? 'Choisissez votre outil' : 'Choose your tool'}
                </h2>
              </div>
              {/* Category pills */}
              <div className="flex items-center gap-1 p-1 rounded-xl border border-white/5 bg-white/[0.01] self-start sm:self-auto">
                {categories.map(cat => (
                  <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                    className="px-4 py-2 rounded-lg text-xs font-light tracking-wide transition-all duration-200"
                    style={activeCategory === cat.id
                      ? { background: '#9AAEFF', color: '#1A1F2E' }
                      : { color: 'rgba(255,255,255,0.35)' }}>
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Main 2-col layout: product list + detail panel */}
          <div className="grid lg:grid-cols-12 gap-6">

            {/* Product list */}
            <div className="lg:col-span-7 flex flex-col gap-3">
              <AnimatePresence mode="popLayout">
                {filtered.map((p, i) => (
                  <ProductRow key={p.id} product={p} isActive={activeProduct.id === p.id}
                    onClick={() => setActiveProduct(p)} language={language} delay={0.05 * i} />
                ))}
              </AnimatePresence>
            </div>

            {/* Detail panel */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
              <AnimatePresence mode="wait">
                <ProductDetail key={activeProduct.id} product={activeProduct} language={language}
                  onDownload={() => setModalOpen(true)} />
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* ══ WHY US ══════════════════════════════════════════════════════════ */}
      <section className="border-b border-white/5 py-20 px-6 sm:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16">

            <Reveal className="lg:col-span-3 lg:sticky lg:top-24 lg:self-start">
              <SectionLabel>{t.whyLabel}</SectionLabel>
              <h2 className="text-3xl font-extralight tracking-tight leading-snug">
                {language === 'fr' ? 'Fait pour\ndurer.' : 'Built\nto last.'}
              </h2>
              <div className="mt-6 w-12 h-px bg-[#9AAEFF]/30" />
            </Reveal>

            <div className="lg:col-span-9 flex flex-col divide-y divide-white/5">
              {t.why.map((item, i) => (
                <Reveal key={i} delay={0.07 * i}>
                  <motion.div className="py-7 grid sm:grid-cols-12 gap-6 items-center group"
                    whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                    <div className="sm:col-span-1">
                      <span className="text-[2.5rem] font-extralight leading-none select-none"
                        style={{ color: 'rgba(154,174,255,0.1)', letterSpacing: '-0.05em' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="sm:col-span-4">
                      <h3 className="text-lg font-extralight text-white tracking-tight">{item.title}</h3>
                    </div>
                    <div className="sm:col-span-6">
                      <p className="text-sm text-[#484f68] font-light leading-relaxed">{item.body}</p>
                    </div>
                    <div className="sm:col-span-1 flex justify-end">
                      <FiArrowRight size={13} className="text-[#9AAEFF]/0 group-hover:text-[#9AAEFF]/50 transition-colors" />
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA ═════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 sm:px-12 lg:px-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(154,174,255,0.05) 0%, transparent 70%)' }} />
        <div className="relative max-w-7xl mx-auto">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xs tracking-[0.35em] uppercase text-[#9AAEFF]/70 font-light mb-6">
                {language === 'fr' ? 'Prochaine étape' : 'Next step'}
              </p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extralight tracking-tight leading-tight mb-6">
                {language === 'fr'
                  ? <><span className="text-[#9AAEFF]">Essayez</span> par vous-même.</>
                  : <><span className="text-[#9AAEFF]">Try it</span> yourself.</>}
              </h2>
              <p className="text-[#98A2B3] font-light mb-10 text-lg">
                {language === 'fr'
                  ? 'Demandez une démo personnalisée ou téléchargez directement.'
                  : 'Request a personalized demo or download directly.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                  onClick={() => setModalOpen(true)}
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-[#9AAEFF] text-[#1A1F2E] font-light text-sm tracking-wide rounded-xl"
                  style={{ boxShadow: '0 0 40px rgba(154,174,255,0.2)' }}>
                  <FiDownload size={14} />
                  {language === 'fr' ? 'Télécharger' : 'Download'}
                </motion.button>
                <motion.button whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                  onClick={() => onNavigate?.('contact')}
                  className="flex items-center justify-center gap-3 px-8 py-4 border border-[#9AAEFF]/25 text-[#9AAEFF] font-light text-sm tracking-wide rounded-xl hover:bg-[#9AAEFF]/8 transition-all duration-300">
                  <FiArrowRight size={14} />
                  {t.demo}
                </motion.button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Modal */}
      <DownloadModal product={activeProduct} isOpen={modalOpen} onClose={() => setModalOpen(false)} language={language} />
    </div>
  );
};

export default StoreSection;