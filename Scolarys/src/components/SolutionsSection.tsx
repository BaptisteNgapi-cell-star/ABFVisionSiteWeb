// components/SolutionsSection.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiUsers, FiUser, FiSmartphone, FiArrowRight,
  FiShield, FiBarChart2, FiClock, FiTrendingUp,
  FiCpu, FiCode, FiLayers, FiDownload, FiCheckCircle
} from 'react-icons/fi';
import AlgorithmsSection from './Algorithme';
import TemplatesSection from './TemplatesSection';

interface SolutionsSectionProps {
  language: 'fr' | 'en';
  onNavigate: (section: string) => void;
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

const getSolutions = (lang: 'fr' | 'en') => [
  {
    index: '01',
    icon: FiUsers,
    title: lang === 'fr' ? 'Établissements' : 'Institutions',
    headline: lang === 'fr' ? 'Pilotez tout depuis\nune seule plateforme' : 'Manage everything\nfrom one platform',
    description: lang === 'fr'
      ? 'Administration, pédagogie, communication — centralisés, synchronisés, intelligents.'
      : 'Administration, pedagogy, communication — centralized, synchronized, intelligent.',
    features: lang === 'fr'
      ? ['Gestion administrative centralisée', 'Suivi pédagogique avancé', 'Communication unifiée', 'Rapports et analytics']
      : ['Centralized administrative management', 'Advanced pedagogical monitoring', 'Unified communication', 'Reports and analytics'],
    kpi: [{ val: '+40%', lbl: lang === 'fr' ? 'Efficacité' : 'Efficiency' }, { val: '-60%', lbl: lang === 'fr' ? 'Admin' : 'Admin Time' }],
    accent: '#9AAEFF',
    num: 0,
  },
  {
    index: '02',
    icon: FiUser,
    title: lang === 'fr' ? 'Enseignants' : 'Teachers',
    headline: lang === 'fr' ? 'Reprenez du temps\npour ce qui compte' : 'Reclaim time\nfor what matters',
    description: lang === 'fr'
      ? 'Emplois du temps, notes, ressources pédagogiques — tout s\'organise en quelques clics.'
      : 'Schedules, grades, educational resources — everything organizes in a few clicks.',
    features: lang === 'fr'
      ? ['Gestion des emplois du temps', 'Saisie et analyse des notes', 'Communication avec les familles', 'Ressources pédagogiques']
      : ['Schedule management', 'Grade entry and analysis', 'Communication with families', 'Educational resources'],
    kpi: [{ val: '+50%', lbl: lang === 'fr' ? 'Productivité' : 'Productivity' }, { val: '-70%', lbl: lang === 'fr' ? 'Répétitif' : 'Repetitive' }],
    accent: '#34D399',
    num: 1,
  },
  {
    index: '03',
    icon: FiSmartphone,
    title: lang === 'fr' ? 'Parents' : 'Parents',
    headline: lang === 'fr' ? 'Restez au cœur\nde la scolarité' : 'Stay at the heart\nof education',
    description: lang === 'fr'
      ? 'Suivi en temps réel, notifications, agenda partagé — la transparence totale, mobile d\'abord.'
      : 'Real-time monitoring, notifications, shared calendar — total transparency, mobile-first.',
    features: lang === 'fr'
      ? ['Suivi en temps réel', 'Notifications instantanées', 'Communication directe', 'Agenda partagé']
      : ['Real-time monitoring', 'Instant notifications', 'Direct communication', 'Shared calendar'],
    kpi: [{ val: '+90%', lbl: lang === 'fr' ? 'Satisfaction' : 'Satisfaction' }, { val: '24/7', lbl: lang === 'fr' ? 'Accès' : 'Access' }],
    accent: '#F59E0B',
    num: 2,
  },
];

const getTools = (lang: 'fr' | 'en', handlers: { algo: () => void; tpl: () => void; onNavigate: (s: string) => void }) => [
  { icon: FiCpu, label: lang === 'fr' ? 'Algorithmes' : 'Algorithms', sub: lang === 'fr' ? 'Moteurs d\'optimisation brevetés' : 'Patented optimization engines', accent: '#9AAEFF', action: handlers.algo },
  { icon: FiLayers, label: lang === 'fr' ? 'Templates' : 'Templates', sub: lang === 'fr' ? 'Bibliothèque de modèles administratifs' : 'Administrative document library', accent: '#34D399', action: handlers.tpl },
  { icon: FiCode, label: 'API', sub: lang === 'fr' ? 'Connectez vos outils via notre API' : 'Connect your tools via our API', accent: '#F59E0B', action: () => handlers.onNavigate('documentation') },
  { icon: FiDownload, label: lang === 'fr' ? 'Ressources' : 'Resources', sub: lang === 'fr' ? 'Documentation et téléchargements' : 'Documentation and downloads', accent: '#C084FC', action: () => handlers.onNavigate('downloads') },
];

const getStrengths = (lang: 'fr' | 'en') => [
  { icon: FiShield, title: lang === 'fr' ? 'Sécurité' : 'Security', body: lang === 'fr' ? 'Chiffrement de bout en bout, conformité RGPD, hébergement souverain.' : 'End-to-end encryption, GDPR compliance, sovereign hosting.' },
  { icon: FiBarChart2, title: lang === 'fr' ? 'Analytics' : 'Analytics', body: lang === 'fr' ? 'Tableaux de bord temps réel, indicateurs personnalisés, alertes proactives.' : 'Real-time dashboards, custom indicators, proactive alerts.' },
  { icon: FiClock, title: lang === 'fr' ? 'Gain de temps' : 'Time Saving', body: lang === 'fr' ? 'Automatisation des tâches répétitives pour se concentrer sur l\'essentiel.' : 'Automate repetitive tasks to focus on what matters.' },
  { icon: FiTrendingUp, title: lang === 'fr' ? 'Évolutivité' : 'Scalability', body: lang === 'fr' ? 'De la petite école au grand campus, la plateforme s\'adapte à votre rythme.' : 'From small school to large campus, the platform adapts to your pace.' },
];

const globalStats = (lang: 'fr' | 'en') => [
  { value: '150+', label: lang === 'fr' ? 'Établissements' : 'Institutions' },
  { value: '50K+', label: lang === 'fr' ? 'Utilisateurs' : 'Users' },
  { value: '10K+', label: lang === 'fr' ? 'Téléchargements' : 'Downloads' },
  { value: '98%', label: lang === 'fr' ? 'Satisfaction' : 'Satisfaction' },
];

// ─── FADE IN WRAPPER ──────────────────────────────────────────────────────────
const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

// ─── MAIN CONTENT ─────────────────────────────────────────────────────────────
const MainSolutionsContent: React.FC<{
  language: 'fr' | 'en';
  onNavigate: (s: string) => void;
  onShowAlgorithms: () => void;
  onShowTemplates: () => void;
}> = ({ language, onNavigate, onShowAlgorithms, onShowTemplates }) => {
  const [hoveredSolution, setHoveredSolution] = useState<number | null>(null);
  const solutions = getSolutions(language);
  const tools = getTools(language, { algo: onShowAlgorithms, tpl: onShowTemplates, onNavigate });
  const strengths = getStrengths(language);
  const stats = globalStats(language);

  return (
    <div className="min-h-screen bg-[#1A1F2E] text-white overflow-hidden">

      {/* ══ HERO BAND ════════════════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-24 px-6 sm:px-12 lg:px-20 border-b border-white/5">
        {/* Background texture */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(154,174,255,0.06) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.04) 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />
          {/* Fine grid */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#9AAEFF" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <Reveal delay={0}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 rounded-full bg-[#9AAEFF]" />
              <span className="text-[#9AAEFF] text-xs font-light tracking-[0.3em] uppercase">
                {language === 'fr' ? 'Nos Solutions' : 'Our Solutions'}
              </span>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-16 items-end">
            <Reveal delay={0.1}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extralight leading-[1.05] tracking-tight">
                {language === 'fr' ? (
                  <>Une plateforme,<br /><span className="text-[#9AAEFF]">trois univers.</span></>
                ) : (
                  <>One platform,<br /><span className="text-[#9AAEFF]">three worlds.</span></>
                )}
              </h1>
            </Reveal>
            <Reveal delay={0.25} className="lg:pb-2">
              <p className="text-[#98A2B3] text-lg font-light leading-relaxed max-w-md">
                {language === 'fr'
                  ? 'Scolarys conçoit des outils qui s\'effacent pour laisser place à l\'essentiel — enseigner, apprendre, connecter.'
                  : 'Scolarys designs tools that fade into the background, leaving room for what matters — teaching, learning, connecting.'}
              </p>
              <motion.button
                whileHover={{ x: 6 }}
                onClick={() => onNavigate('logiciels')}
                className="mt-8 flex items-center gap-3 text-[#9AAEFF] text-sm font-light tracking-wide group"
              >
                <span className="border-b border-[#9AAEFF]/40 pb-px group-hover:border-[#9AAEFF] transition-colors">
                  {language === 'fr' ? 'Voir notre store' : 'See our store'}
                </span>
                <FiArrowRight size={14} />
              </motion.button>
            </Reveal>
          </div>

          {/* Stats inline */}
          <Reveal delay={0.4}>
            <div className="grid grid-cols-4 gap-px mt-20 border border-white/5 rounded-xl overflow-hidden">
              {stats.map((s, i) => (
                <div key={i} className="bg-white/2 px-6 py-5 text-center hover:bg-white/4 transition-colors">
                  <div className="text-2xl sm:text-3xl font-extralight text-white mb-1">{s.value}</div>
                  <div className="text-xs text-[#484f68] font-light uppercase tracking-widest">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ SOLUTIONS : EDITORIAL STACK ══════════════════════════════════════ */}
      <section className="border-b border-white/5">
        {solutions.map((sol, idx) => {
          const Icon = sol.icon;
          const isHovered = hoveredSolution === idx;

          return (
            <motion.article
              key={idx}
              className="relative border-b border-white/5 last:border-b-0 cursor-default"
              onHoverStart={() => setHoveredSolution(idx)}
              onHoverEnd={() => setHoveredSolution(null)}
              style={{ background: isHovered ? `rgba(154,174,255,0.02)` : 'transparent' }}
              transition={{ duration: 0.3 }}
            >
              {/* Accent bar left */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-0.5"
                animate={{ scaleY: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
                style={{ background: sol.accent, originY: 0 }}
                transition={{ duration: 0.35 }}
              />

              <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-16 sm:py-20">
                <div className="grid lg:grid-cols-12 gap-10 items-center">

                  {/* Number + Icon col */}
                  <Reveal delay={0.05 * idx} className="lg:col-span-1 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
                    <div className="text-[8rem] leading-none font-extralight select-none"
                      style={{ color: `${sol.accent}12`, letterSpacing: '-0.05em', lineHeight: 0.85 }}>
                      {sol.index}
                    </div>
                  </Reveal>

                  {/* Headline col */}
                  <Reveal delay={0.08 + 0.04 * idx} className="lg:col-span-4">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-9 h-9 flex items-center justify-center rounded-lg"
                        style={{ background: `${sol.accent}15`, border: `1px solid ${sol.accent}25` }}>
                        <Icon size={16} style={{ color: sol.accent }} />
                      </div>
                      <span className="text-xs font-light tracking-[0.25em] uppercase" style={{ color: sol.accent }}>
                        {sol.title}
                      </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extralight leading-tight tracking-tight whitespace-pre-line">
                      {sol.headline}
                    </h2>
                  </Reveal>

                  {/* Description + features col */}
                  <Reveal delay={0.14 + 0.04 * idx} className="lg:col-span-4">
                    <p className="text-[#98A2B3] font-light leading-relaxed mb-6 text-sm">
                      {sol.description}
                    </p>
                    <ul className="space-y-2.5">
                      {sol.features.map((f, fi) => (
                        <li key={fi} className="flex items-start gap-2.5 text-sm text-[#98A2B3] font-light">
                          <FiCheckCircle size={12} className="mt-0.5 shrink-0" style={{ color: sol.accent }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </Reveal>

                  {/* KPIs col */}
                  <Reveal delay={0.18 + 0.04 * idx} className="lg:col-span-3">
                    <div className="grid grid-cols-2 gap-3">
                      {sol.kpi.map((k, ki) => (
                        <div key={ki} className="rounded-xl p-4 text-center border"
                          style={{ background: `${sol.accent}08`, borderColor: `${sol.accent}18` }}>
                          <div className="text-2xl font-extralight mb-1" style={{ color: sol.accent }}>{k.val}</div>
                          <div className="text-[10px] text-[#484f68] uppercase tracking-widest font-light">{k.lbl}</div>
                        </div>
                      ))}
                    </div>
                    <motion.button
                      whileHover={{ x: 4 }}
                      onClick={() => onNavigate('logiciels')}
                      className="mt-5 flex items-center gap-2 text-xs font-light tracking-wide group w-full"
                      style={{ color: sol.accent }}
                    >
                      <span className="border-b pb-px transition-colors" style={{ borderColor: `${sol.accent}30` }}>
                        {language === 'fr' ? 'Découvrir' : 'Discover'}
                      </span>
                      <FiArrowRight size={11} />
                    </motion.button>
                  </Reveal>

                </div>
              </div>
            </motion.article>
          );
        })}
      </section>

      {/* ══ TECHNICAL TOOLS — HORIZONTAL MARQUEE CARDS ═══════════════════════ */}
      <section className="border-b border-white/5 py-20 px-6 sm:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="flex items-end justify-between mb-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-6 rounded-full bg-[#9AAEFF]/60" />
                  <span className="text-[#9AAEFF] text-xs font-light tracking-[0.3em] uppercase">
                    {language === 'fr' ? 'Outils Techniques' : 'Technical Tools'}
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extralight tracking-tight">
                  {language === 'fr' ? 'Sous le capot' : 'Under the hood'}
                </h2>
              </div>
              <p className="hidden lg:block text-[#484f68] font-light text-sm max-w-xs text-right">
                {language === 'fr'
                  ? 'Technologies brevetées et ressources téléchargeables'
                  : 'Patented technologies and downloadable resources'}
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden">
            {tools.map((tool, i) => {
              const Icon = tool.icon;
              return (
                <Reveal key={i} delay={0.08 * i}>
                  <motion.button
                    onClick={tool.action}
                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
                    className="relative w-full text-left bg-[#1A1F2E] p-8 group transition-colors flex flex-col h-full min-h-[180px]"
                  >
                    {/* Top accent line on hover */}
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-px"
                      style={{ background: tool.accent }}
                      initial={{ scaleX: 0, opacity: 0 }}
                      whileHover={{ scaleX: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg mb-5"
                      style={{ background: `${tool.accent}15`, border: `1px solid ${tool.accent}25` }}>
                      <Icon size={17} style={{ color: tool.accent }} />
                    </div>
                    <div className="font-light text-white text-base mb-2">{tool.label}</div>
                    <div className="text-xs text-[#484f68] font-light leading-relaxed flex-1">{tool.sub}</div>
                    <div className="mt-5 flex items-center gap-1.5 text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: tool.accent }}>
                      {language === 'fr' ? 'Explorer' : 'Explore'}
                      <FiArrowRight size={9} />
                    </div>
                  </motion.button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ STRENGTHS — ASYMMETRIC 2-COL ════════════════════════════════════ */}
      <section className="border-b border-white/5 py-20 px-6 sm:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16">
            {/* Left sticky label */}
            <Reveal className="lg:col-span-3 lg:sticky lg:top-24 lg:self-start">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 rounded-full bg-[#9AAEFF]/60" />
                <span className="text-[#9AAEFF] text-xs font-light tracking-[0.3em] uppercase">
                  {language === 'fr' ? 'Pourquoi nous' : 'Why us'}
                </span>
              </div>
              <h2 className="text-3xl font-extralight tracking-tight leading-snug">
                {language === 'fr' ? 'Ce qui\nnous rend\ndifférents' : 'What makes\nus\ndifferent'}
              </h2>
              <div className="mt-6 w-12 h-px bg-[#9AAEFF]/30" />
            </Reveal>

            {/* Right: 2x2 strength grid */}
            <div className="lg:col-span-9 grid sm:grid-cols-2 gap-px bg-white/5 rounded-2xl overflow-hidden">
              {strengths.map((s, i) => {
                const Icon = s.icon;
                return (
                  <Reveal key={i} delay={0.08 * i}>
                    <motion.div
                      whileHover={{ backgroundColor: 'rgba(154,174,255,0.03)' }}
                      className="bg-[#1A1F2E] p-8 group transition-colors"
                    >
                      <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#9AAEFF]/10 border border-[#9AAEFF]/15 mb-5 group-hover:bg-[#9AAEFF]/15 transition-colors">
                        <Icon size={15} className="text-[#9AAEFF]" />
                      </div>
                      <h3 className="text-base font-light text-white mb-2 tracking-wide">{s.title}</h3>
                      <p className="text-sm text-[#484f68] font-light leading-relaxed">{s.body}</p>
                    </motion.div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA BAND ════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 sm:px-12 lg:px-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(154,174,255,0.055) 0%, transparent 70%)' }} />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xs tracking-[0.35em] uppercase text-[#9AAEFF]/70 font-light mb-6">
                {language === 'fr' ? 'Prochaine étape' : 'Next step'}
              </p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extralight tracking-tight leading-tight mb-6">
                {language === 'fr'
                  ? <>Prêt à transformer<br /><span className="text-[#9AAEFF]">votre établissement ?</span></>
                  : <>Ready to transform<br /><span className="text-[#9AAEFF]">your institution?</span></>}
              </h2>
              <p className="text-[#98A2B3] font-light mb-10 text-lg">
                {language === 'fr'
                  ? 'Rejoignez les 150+ établissements qui font confiance à Scolarys.'
                  : 'Join 150+ institutions that trust Scolarys.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onNavigate('logiciels')}
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-[#9AAEFF] text-[#1A1F2E] font-light text-sm tracking-wide rounded-xl transition-all duration-300"
                  style={{ boxShadow: '0 0 40px rgba(154,174,255,0.2)' }}
                >
                  {language === 'fr' ? 'Découvrir le store' : 'Discover the store'}
                  <FiArrowRight size={14} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onNavigate('contact')}
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-[#9AAEFF]/25 text-[#9AAEFF] font-light text-sm tracking-wide rounded-xl hover:bg-[#9AAEFF]/8 transition-all duration-300"
                >
                  {language === 'fr' ? 'Demander une démo' : 'Request a demo'}
                </motion.button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
};

// ─── NAVIGATION BAR (sub-views) ───────────────────────────────────────────────
const NavigationBar: React.FC<{
  language: 'fr' | 'en';
  activeView: 'algorithms' | 'templates';
  onBack: () => void;
  onSwitch: (v: 'algorithms' | 'templates') => void;
}> = ({ language, activeView, onBack, onSwitch }) => (
  <motion.div
    initial={{ opacity: 0, y: -16 }}
    animate={{ opacity: 1, y: 0 }}
    className="sticky top-16 z-40 bg-[#1A1F2E]/95 backdrop-blur-lg border-b border-white/5"
  >
    <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 h-14 flex items-center justify-between">
      <button onClick={onBack} className="flex items-center gap-2 text-[#9AAEFF] text-sm font-light hover:opacity-70 transition-opacity">
        <FiArrowRight className="rotate-180" size={13} />
        {language === 'fr' ? 'Retour aux solutions' : 'Back to solutions'}
      </button>
      <div className="flex items-center gap-1">
        {(['algorithms', 'templates'] as const).map(v => (
          <button
            key={v}
            onClick={() => onSwitch(v)}
            className={`px-4 py-1.5 rounded-lg text-xs font-light tracking-wide transition-all ${
              activeView === v ? 'bg-[#9AAEFF] text-[#1A1F2E]' : 'text-[#98A2B3] hover:text-white hover:bg-white/5'
            }`}
          >
            {v === 'algorithms' ? (language === 'fr' ? 'Algorithmes' : 'Algorithms') : 'Templates'}
          </button>
        ))}
      </div>
    </div>
  </motion.div>
);

// ─── ROOT COMPONENT ───────────────────────────────────────────────────────────
const SolutionsSection: React.FC<SolutionsSectionProps> = ({ language, onNavigate }) => {
  const [activeView, setActiveView] = useState<'main' | 'algorithms' | 'templates'>('main');

  const handleNavigate = (section: string) => {
    if (activeView !== 'main') {
      setActiveView('main');
      setTimeout(() => onNavigate(section), 300);
    } else {
      onNavigate(section);
    }
  };

  return (
    <>
      {activeView !== 'main' && (
        <NavigationBar
          language={language}
          activeView={activeView as 'algorithms' | 'templates'}
          onBack={() => setActiveView('main')}
          onSwitch={setActiveView}
        />
      )}

      <AnimatePresence mode="wait">
        {activeView === 'main' && (
          <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <MainSolutionsContent
              language={language}
              onNavigate={handleNavigate}
              onShowAlgorithms={() => setActiveView('algorithms')}
              onShowTemplates={() => setActiveView('templates')}
            />
          </motion.div>
        )}
        {activeView === 'algorithms' && (
          <motion.div key="algorithms" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <AlgorithmsSection language={language} />
          </motion.div>
        )}
        {activeView === 'templates' && (
          <motion.div key="templates" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <TemplatesSection language={language} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SolutionsSection;