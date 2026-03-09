// components/AlgorithmsSection.tsx
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  FiCpu, FiCode, FiDownload, FiShield, FiFileText,
  FiGlobe, FiTerminal, FiZap, FiUsers, FiBook,
  FiCloud, FiBarChart2, FiArrowRight, FiCheck
} from 'react-icons/fi';

// ─── TRANSLATIONS ──────────────────────────────────────────────────────────────
const T = {
  fr: {
    eyebrow: 'Technologie',
    headline1: 'Des moteurs qui',
    headline2: 'redéfinissent',
    headline3: 'le possible.',
    subtitle: 'Algorithmes brevetés, écrits en Rust, portés dans tous les langages.',
    stats: [
      { value: '45K',    label: 'Lignes de code' },
      { value: '12',     label: 'Contributeurs' },
      { value: '10K+',   label: 'Téléchargements' },
      { value: '99.99%', label: 'Disponibilité' },
      { value: 'A+',     label: 'Score sécurité' },
    ],
    algos: [
      {
        id: 'image',
        num: '01',
        accent: '#9AAEFF',
        icon: FiFileText,
        title: 'Image → Texte',
        sub: 'Extraction intelligente de texte',
        desc: 'Transforme les images en texte structuré pour optimiser le stockage et faciliter la recherche dans toute la base documentaire.',
        features: ['OCR haute précision (>99%)', 'Support multilingue', 'Traitement par lots', 'Formatage intelligent', 'Optimisation de stockage'],
        kpis: [{ val: '−90%', lbl: 'Stockage' }, { val: '×10', lbl: 'Vitesse' }, { val: '>99%', lbl: 'Précision' }],
        stack: ['Rust', 'OpenCV', 'Tesseract', 'TensorFlow', 'WASM'],
      },
      {
        id: 'encryption',
        num: '02',
        accent: '#34D399',
        icon: FiShield,
        title: 'Chiffrement Quantique',
        sub: 'Protection absolue des données',
        desc: 'Algorithme de chiffrement asymétrique post-quantique qui défie même les intelligences artificielles les plus avancées.',
        features: ['Chiffrement post-quantique', 'Protection contre les IA', 'Vérification d\'intégrité', 'Signature numérique', 'Chiffrement hybride'],
        kpis: [{ val: 'Militaire', lbl: 'Niveau' }, { val: 'Instantané', lbl: 'Vitesse' }, { val: 'Zéro', lbl: 'Faille connue' }],
        stack: ['Rust', 'Ring', 'OpenSSL', 'libsodium', 'WASM'],
      },
    ],
    langLabel: 'Implémentations',
    dlBtn: 'Télécharger',
    dlBusy: 'Téléchargement…',
    featLabel: 'Fonctionnalités',
    benefitLabel: 'Performances',
    stackLabel: 'Stack technique',
    docLabel: 'Documentation',
    docSub: 'Toutes les ressources pour intégrer nos algorithmes',
    docs: [
      { icon: FiFileText, title: 'Documentation API',     sub: 'Référence complète de l\'API' },
      { icon: FiBook,     title: 'Guide d\'intégration',  sub: 'Étape par étape' },
      { icon: FiCode,     title: 'Exemples',              sub: 'Cas concrets d\'utilisation' },
      { icon: FiBarChart2,title: 'Benchmarks',            sub: 'Comparaisons de performances' },
      { icon: FiShield,   title: 'Audit sécurité',        sub: 'Rapport de certification' },
    ],
    ctaHeadline: 'Prêt à intégrer\nnos algorithmes ?',
    ctaSub: 'Rejoignez des centaines de développeurs qui utilisent déjà nos moteurs.',
    ctaSource: 'Voir le code source',
    ctaDemo: 'Essayer la démo',
  },
  en: {
    eyebrow: 'Technology',
    headline1: 'Engines that',
    headline2: 'redefine',
    headline3: 'what\'s possible.',
    subtitle: 'Patented algorithms, written in Rust, ported to every language.',
    stats: [
      { value: '45K',    label: 'Lines of code' },
      { value: '12',     label: 'Contributors' },
      { value: '10K+',   label: 'Downloads' },
      { value: '99.99%', label: 'Uptime' },
      { value: 'A+',     label: 'Security score' },
    ],
    algos: [
      {
        id: 'image',
        num: '01',
        accent: '#9AAEFF',
        icon: FiFileText,
        title: 'Image → Text',
        sub: 'Intelligent text extraction',
        desc: 'Transforms images into structured text to optimize storage and enable search across the entire document base.',
        features: ['High precision OCR (>99%)', 'Multilingual support', 'Batch processing', 'Smart formatting', 'Storage optimization'],
        kpis: [{ val: '−90%', lbl: 'Storage' }, { val: '×10', lbl: 'Speed' }, { val: '>99%', lbl: 'Accuracy' }],
        stack: ['Rust', 'OpenCV', 'Tesseract', 'TensorFlow', 'WASM'],
      },
      {
        id: 'encryption',
        num: '02',
        accent: '#34D399',
        icon: FiShield,
        title: 'Quantum Encryption',
        sub: 'Absolute data protection',
        desc: 'Post-quantum asymmetric encryption algorithm that challenges even the most advanced artificial intelligences.',
        features: ['Post-quantum encryption', 'AI protection', 'Integrity verification', 'Digital signature', 'Hybrid encryption'],
        kpis: [{ val: 'Military', lbl: 'Grade' }, { val: 'Instant', lbl: 'Speed' }, { val: 'Zero', lbl: 'Known flaw' }],
        stack: ['Rust', 'Ring', 'OpenSSL', 'libsodium', 'WASM'],
      },
    ],
    langLabel: 'Implementations',
    dlBtn: 'Download',
    dlBusy: 'Downloading…',
    featLabel: 'Features',
    benefitLabel: 'Performance',
    stackLabel: 'Tech stack',
    docLabel: 'Documentation',
    docSub: 'All resources to integrate our algorithms',
    docs: [
      { icon: FiFileText, title: 'API Documentation',  sub: 'Complete API reference' },
      { icon: FiBook,     title: 'Integration Guide',  sub: 'Step by step' },
      { icon: FiCode,     title: 'Examples',           sub: 'Practical usage cases' },
      { icon: FiBarChart2,title: 'Benchmarks',         sub: 'Performance comparisons' },
      { icon: FiShield,   title: 'Security Audit',     sub: 'Certification report' },
    ],
    ctaHeadline: 'Ready to integrate\nour algorithms?',
    ctaSub: 'Join hundreds of developers already using our processing engines.',
    ctaSource: 'View source code',
    ctaDemo: 'Try the demo',
  },
};

// ─── LANGUAGE DATA ─────────────────────────────────────────────────────────────
const LANGS = (t: typeof T['fr']) => [
  { id: 'rust',       label: 'Rust',       color: '#F74C00', ver: 'v2.4.1', size: '1.2 MB', stars: 5, note: t === T.fr ? 'Version originale, performances optimales' : 'Original version, optimal performance' },
  { id: 'python',     label: 'Python',     color: '#3776AB', ver: 'v2.3.0', size: '850 KB', stars: 5, note: t === T.fr ? 'Facile à intégrer, large adoption'          : 'Easy to integrate, wide adoption' },
  { id: 'javascript', label: 'JS / TS',    color: '#F7DF1E', ver: 'v2.2.0', size: '450 KB', stars: 4, note: t === T.fr ? 'Pour applications web modernes'              : 'For modern web applications' },
  { id: 'java',       label: 'Java',       color: '#007396', ver: 'v2.1.0', size: '1.8 MB', stars: 4, note: t === T.fr ? 'Entreprise, robuste et scalable'             : 'Enterprise, robust and scalable' },
  { id: 'cpp',        label: 'C++',        color: '#00599C', ver: 'v2.0.0', size: '2.1 MB', stars: 3, note: t === T.fr ? 'Haute performance, contrôle total'           : 'High performance, total control' },
  { id: 'go',         label: 'Go',         color: '#00ADD8', ver: 'v2.2.0', size: '950 KB', stars: 4, note: t === T.fr ? 'Concurrent, performances élevées'            : 'Concurrent, high performance' },
];

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

// ─── LANG PILL ──────────────────────────────────────────────────────────────────
const LangPill: React.FC<{
  lang: ReturnType<typeof LANGS>[0];
  selected: boolean;
  onClick: () => void;
}> = ({ lang, selected, onClick }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ y: -1 }}
    whileTap={{ scale: 0.97 }}
    className="relative flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-left transition-all duration-200 border"
    style={{
      background: selected ? `${lang.color}15` : 'rgba(255,255,255,0.02)',
      borderColor: selected ? `${lang.color}50` : 'rgba(255,255,255,0.06)',
    }}
  >
    {/* Color dot */}
    <div className="w-2 h-2 rounded-full shrink-0" style={{ background: lang.color }} />
    <div className="min-w-0">
      <div className="text-xs font-light text-white leading-none mb-0.5">{lang.label}</div>
      <div className="text-[10px] font-light" style={{ color: 'rgba(255,255,255,0.3)' }}>{lang.ver} · {lang.size}</div>
    </div>
    {selected && (
      <div className="ml-auto w-4 h-4 rounded-full flex items-center justify-center shrink-0"
        style={{ background: lang.color }}>
        <FiCheck size={9} className="text-[#1A1F2E]" />
      </div>
    )}
  </motion.button>
);

// ─── ALGORITHM PANEL ───────────────────────────────────────────────────────────
const AlgoPanel: React.FC<{
  algo: typeof T['fr']['algos'][0];
  t: typeof T['fr'];
  langs: ReturnType<typeof LANGS>;
  isOpen: boolean;
  onToggle: () => void;
  selectedLang: string;
  onSelectLang: (id: string) => void;
  isDownloading: boolean;
  onDownload: () => void;
}> = ({ algo, t, langs, isOpen, onToggle, selectedLang, onSelectLang, isDownloading, onDownload }) => {
  const Icon = algo.icon;
  const activeLang = langs.find(l => l.id === selectedLang);

  return (
    <div className="border border-white/5 rounded-2xl overflow-hidden"
      style={{ background: isOpen ? 'rgba(255,255,255,0.015)' : 'transparent' }}>

      {/* Header row — always visible */}
      <motion.button onClick={onToggle} className="w-full text-left group" whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
        <div className="px-8 py-6 grid grid-cols-12 gap-6 items-center">

          {/* Phantom number */}
          <div className="col-span-1 hidden lg:block">
            <div className="text-[3.5rem] font-extralight leading-none select-none"
              style={{ color: `${algo.accent}10`, letterSpacing: '-0.05em' }}>
              {algo.num}
            </div>
          </div>

          {/* Icon + title */}
          <div className="col-span-10 lg:col-span-7 flex items-center gap-5">
            <div className="w-11 h-11 flex items-center justify-center rounded-xl shrink-0"
              style={{ background: `${algo.accent}15`, border: `1px solid ${algo.accent}25` }}>
              <Icon size={17} style={{ color: algo.accent }} />
            </div>
            <div>
              <div className="text-[10px] font-light tracking-[0.25em] uppercase mb-1" style={{ color: algo.accent }}>
                {algo.sub}
              </div>
              <h3 className="text-xl font-extralight text-white tracking-tight">{algo.title}</h3>
            </div>
          </div>

          {/* KPI chips — shown on large screens */}
          <div className="col-span-3 hidden lg:flex items-center gap-2 justify-end">
            {algo.kpis.map((k, i) => (
              <div key={i} className="text-center px-3 py-1.5 rounded-lg"
                style={{ background: `${algo.accent}08`, border: `1px solid ${algo.accent}15` }}>
                <div className="text-sm font-extralight" style={{ color: algo.accent }}>{k.val}</div>
                <div className="text-[9px] text-white/30 uppercase tracking-widest">{k.lbl}</div>
              </div>
            ))}
          </div>

          {/* Chevron */}
          <div className="col-span-1 flex justify-end">
            <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
              <FiArrowRight size={14} className="text-white/20 group-hover:text-white/50 transition-colors" />
            </motion.div>
          </div>
        </div>

        {/* Accent bar bottom when open */}
        {isOpen && <div className="h-px w-full" style={{ background: `linear-gradient(90deg, ${algo.accent}40, transparent)` }} />}
      </motion.button>

      {/* Expanded content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-8 py-8 grid lg:grid-cols-12 gap-10">

              {/* Left: description + features + stack */}
              <div className="lg:col-span-5 flex flex-col gap-8">
                <p className="text-[#98A2B3] text-sm font-light leading-relaxed">{algo.desc}</p>

                {/* Features */}
                <div>
                  <div className="text-[10px] tracking-[0.25em] uppercase font-light text-white/30 mb-3">{t.featLabel}</div>
                  <ul className="space-y-2">
                    {algo.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-[#98A2B3] font-light">
                        <div className="w-1 h-1 rounded-full mt-2 shrink-0" style={{ background: algo.accent }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stack */}
                <div>
                  <div className="text-[10px] tracking-[0.25em] uppercase font-light text-white/30 mb-3">{t.stackLabel}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {algo.stack.map(s => (
                      <span key={s} className="text-[10px] px-2.5 py-1 rounded-md font-light"
                        style={{ background: `${algo.accent}10`, color: `${algo.accent}BB`, border: `1px solid ${algo.accent}18` }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: language selector + download */}
              <div className="lg:col-span-7">
                <div className="text-[10px] tracking-[0.25em] uppercase font-light text-white/30 mb-4">{t.langLabel}</div>

                {/* 3-col lang grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-5">
                  {langs.map(lang => (
                    <LangPill key={lang.id} lang={lang} selected={selectedLang === lang.id} onClick={() => onSelectLang(lang.id)} />
                  ))}
                </div>

                {/* Selected lang details + download */}
                {activeLang && (
                  <motion.div
                    key={activeLang.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl p-5 border"
                    style={{ background: `${activeLang.color}08`, borderColor: `${activeLang.color}20` }}
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="text-sm font-light text-white mb-1">{activeLang.label}</div>
                        <div className="text-xs text-white/30 font-light">{activeLang.note}</div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs font-light" style={{ color: activeLang.color }}>{activeLang.ver}</div>
                        <div className="text-[10px] text-white/30">{activeLang.size}</div>
                      </div>
                    </div>

                    <motion.button
                      onClick={onDownload}
                      disabled={isDownloading}
                      whileHover={{ scale: isDownloading ? 1 : 1.02 }}
                      whileTap={{ scale: isDownloading ? 1 : 0.97 }}
                      className="w-full flex items-center justify-center gap-2.5 py-3 rounded-lg text-sm font-light transition-all duration-200 disabled:opacity-60"
                      style={{ background: activeLang.color, color: '#1A1F2E' }}
                    >
                      {isDownloading ? (
                        <>
                          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-3.5 h-3.5 border-2 border-[#1A1F2E]/40 border-t-[#1A1F2E] rounded-full" />
                          {t.dlBusy}
                        </>
                      ) : (
                        <>
                          <FiDownload size={13} />
                          {t.dlBtn} {activeLang.label}
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
const AlgorithmsSection: React.FC<{ language: 'fr' | 'en' }> = ({ language }) => {
  const t = T[language];
  const langs = LANGS(t);

  const [openAlgo, setOpenAlgo] = useState<string>('image');
  const [selectedLangs, setSelectedLangs] = useState<Record<string, string>>({ image: 'rust', encryption: 'rust' });
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownload = async (algoId: string) => {
    const langId = selectedLangs[algoId];
    const lang = langs.find(l => l.id === langId);
    if (!lang) return;
    setDownloading(algoId);
    await new Promise(r => setTimeout(r, 1500));
    const blob = new Blob([`// ABFVision ${algoId} — ${lang.label} ${lang.ver}\n// ${new Date().toLocaleDateString()}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    Object.assign(document.createElement('a'), { href: url, download: `abfvision-${algoId}-${langId}.txt` }).click();
    URL.revokeObjectURL(url);
    setDownloading(null);
  };

  return (
    <div className="min-h-screen bg-[#1A1F2E] text-white overflow-hidden">

      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-24 px-6 sm:px-12 lg:px-20 border-b border-white/5">
        {/* Atmospherics */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(154,174,255,0.05) 0%, transparent 70%)', transform: 'translate(30%,-30%)' }} />
          <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.04) 0%, transparent 70%)', transform: 'translateY(30%)' }} />
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="alg" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#9AAEFF" strokeWidth="0.5"/>
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#alg)" />
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
                <span className="text-[#9AAEFF]">{t.headline2}</span><br />
                {t.headline3}
              </h1>
            </Reveal>
            <Reveal delay={0.25} className="lg:pb-2">
              <p className="text-[#98A2B3] text-lg font-light leading-relaxed max-w-md">{t.subtitle}</p>
            </Reveal>
          </div>

          {/* Stats band */}
          <Reveal delay={0.4}>
            <div className="grid grid-cols-5 gap-px mt-20 border border-white/5 rounded-xl overflow-hidden">
              {t.stats.map((s, i) => (
                <div key={i} className="bg-white/[0.02] px-4 py-5 text-center hover:bg-white/[0.04] transition-colors">
                  <div className="text-2xl sm:text-3xl font-extralight text-white mb-1">{s.value}</div>
                  <div className="text-[10px] text-[#484f68] font-light uppercase tracking-widest">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ ALGORITHMS ══════════════════════════════════════════════════════ */}
      <section className="border-b border-white/5 py-20 px-6 sm:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="flex items-end justify-between mb-10">
              <div>
                <SectionLabel>{language === 'fr' ? 'Bibliothèque' : 'Library'}</SectionLabel>
                <h2 className="text-3xl sm:text-4xl font-extralight tracking-tight">
                  {language === 'fr' ? 'Algorithmes disponibles' : 'Available algorithms'}
                </h2>
              </div>
              <p className="hidden lg:block text-[#484f68] text-sm font-light max-w-xs text-right">
                {language === 'fr' ? 'Cliquez sur un moteur pour explorer et télécharger' : 'Click an engine to explore and download'}
              </p>
            </div>
          </Reveal>

          <div className="flex flex-col gap-3">
            {t.algos.map((algo, i) => (
              <Reveal key={algo.id} delay={0.08 * i}>
                <AlgoPanel
                  algo={algo}
                  t={t}
                  langs={langs}
                  isOpen={openAlgo === algo.id}
                  onToggle={() => setOpenAlgo(openAlgo === algo.id ? '' : algo.id)}
                  selectedLang={selectedLangs[algo.id]}
                  onSelectLang={id => setSelectedLangs(p => ({ ...p, [algo.id]: id }))}
                  isDownloading={downloading === algo.id}
                  onDownload={() => handleDownload(algo.id)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ DOCUMENTATION ═══════════════════════════════════════════════════ */}
      <section className="border-b border-white/5 py-20 px-6 sm:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16">

            {/* Sticky label */}
            <Reveal className="lg:col-span-3 lg:sticky lg:top-24 lg:self-start">
              <SectionLabel>{t.docLabel}</SectionLabel>
              <h2 className="text-3xl font-extralight tracking-tight leading-snug">
                {language === 'fr' ? 'Tout pour\nintégrer\nen quelques\nlignes' : 'Everything\nto integrate\nin a few\nlines'}
              </h2>
              <div className="mt-6 w-12 h-px bg-[#9AAEFF]/30" />
            </Reveal>

            {/* Doc grid */}
            <div className="lg:col-span-9 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden">
              {t.docs.map((doc, i) => {
                const Icon = doc.icon;
                return (
                  <Reveal key={i} delay={0.07 * i}>
                    <motion.a href="#"
                      whileHover={{ backgroundColor: 'rgba(154,174,255,0.03)' }}
                      className="bg-[#1A1F2E] p-7 flex flex-col group transition-colors h-full">
                      <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#9AAEFF]/10 border border-[#9AAEFF]/15 mb-5 group-hover:bg-[#9AAEFF]/15 transition-colors">
                        <Icon size={15} className="text-[#9AAEFF]" />
                      </div>
                      <div className="text-sm font-light text-white mb-1.5">{doc.title}</div>
                      <div className="text-xs text-[#484f68] font-light leading-relaxed flex-1">{doc.sub}</div>
                      <div className="mt-4 flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-[#9AAEFF]/0 group-hover:text-[#9AAEFF]/60 transition-all">
                        {language === 'fr' ? 'Lire' : 'Read'}
                        <FiArrowRight size={9} />
                      </div>
                    </motion.a>
                  </Reveal>
                );
              })}
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
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extralight tracking-tight leading-tight mb-6 whitespace-pre-line">
                {t.ctaHeadline.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {i === 1 ? <span className="text-[#9AAEFF]">{line}</span> : line}
                    {i < t.ctaHeadline.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h2>
              <p className="text-[#98A2B3] font-light mb-10 text-lg">{t.ctaSub}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-[#9AAEFF] text-[#1A1F2E] font-light text-sm tracking-wide rounded-xl"
                  style={{ boxShadow: '0 0 40px rgba(154,174,255,0.2)' }}>
                  <FiCode size={14} />
                  {t.ctaSource}
                </motion.button>
                <motion.button whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-3 px-8 py-4 border border-[#9AAEFF]/25 text-[#9AAEFF] font-light text-sm tracking-wide rounded-xl hover:bg-[#9AAEFF]/8 transition-all duration-300">
                  <FiTerminal size={14} />
                  {t.ctaDemo}
                </motion.button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
};


const FiCoffee = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M2 6h2v12h12v2h-12c-1.1 0-2-.9-2-2v-12zm2 2v8h8v-8h-8z" />
    <path d="M18 6h-2v2h2v2h-2v2h2v2h-2v2h2v2h-2v2h2v2h-6v2h10v-12c0-2.21-1.79-4-4-4z" />
  </svg>
);

export default AlgorithmsSection;