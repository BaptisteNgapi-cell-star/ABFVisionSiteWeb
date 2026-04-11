// components/Templates/TemplatesSection.tsx
import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  FiDownload, FiSearch, FiX, FiArrowRight,
  FiGrid, FiList, FiFilter, FiCheck, FiEye,
  FiStar, FiBook, FiUsers, FiLayout,
  FiClipboard, FiCalendar, FiBarChart2, FiMail
} from 'react-icons/fi';

// ─── TYPES ─────────────────────────────────────────────────────────────────────
type Language = 'fr' | 'en';
type ViewMode = 'grid' | 'list';
type SortBy = 'popularity' | 'recent' | 'rating' | 'alphabetical';

interface Template {
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

// ─── TRANSLATIONS ──────────────────────────────────────────────────────────────
const T = {
  fr: {
    eyebrow: 'Templates',
    headline1: 'Bibliothèque de',
    headline2: 'modèles pro.',
    subtitle: 'Tous vos documents administratifs, scolaires et pédagogiques — prêts à l\'emploi.',
    searchPh: 'Rechercher un template…',
    catAll: 'Tous',
    sortLabel: 'Trier par',
    sorts: [
      { id: 'popularity',   label: 'Popularité' },
      { id: 'recent',       label: 'Récents' },
      { id: 'rating',       label: 'Note' },
      { id: 'alphabetical', label: 'A → Z' },
    ],
    viewGrid: 'Grille',
    viewList: 'Liste',
    templates: 'templates',
    dlBtn: 'Télécharger',
    previewBtn: 'Aperçu',
    dlBusy: 'Téléchargement…',
    empty: 'Aucun template trouvé',
    emptySub: 'Essayez d\'autres mots-clés ou catégories.',
    resetBtn: 'Tout afficher',
    whyLabel: 'Rejoindre',
    ctaHeadline1: 'Créez.',
    ctaHeadline2: 'Partagez.',
    ctaHeadline3: 'Inspirez.',
    ctaSub: 'Rejoignez notre communauté de créateurs et monétisez vos propres templates.',
    ctaExplore: 'Explorer tous les templates',
    ctaContact: 'Contacter un designer',
    statsCreators: 'Créateurs',
    statsTemplates: 'Templates',
    statsSatisfaction: 'Satisfaction',
    selectedDl: 'Télécharger la sélection',
  },
  en: {
    eyebrow: 'Templates',
    headline1: 'Professional',
    headline2: 'template library.',
    subtitle: 'All your administrative, school and pedagogical documents — ready to use.',
    searchPh: 'Search a template…',
    catAll: 'All',
    sortLabel: 'Sort by',
    sorts: [
      { id: 'popularity',   label: 'Popularity' },
      { id: 'recent',       label: 'Recent' },
      { id: 'rating',       label: 'Rating' },
      { id: 'alphabetical', label: 'A → Z' },
    ],
    viewGrid: 'Grid',
    viewList: 'List',
    templates: 'templates',
    dlBtn: 'Download',
    previewBtn: 'Preview',
    dlBusy: 'Downloading…',
    empty: 'No templates found',
    emptySub: 'Try different keywords or categories.',
    resetBtn: 'Show all',
    whyLabel: 'Join us',
    ctaHeadline1: 'Create.',
    ctaHeadline2: 'Share.',
    ctaHeadline3: 'Inspire.',
    ctaSub: 'Join our creator community and monetize your own templates.',
    ctaExplore: 'Explore all templates',
    ctaContact: 'Contact a designer',
    statsCreators: 'Creators',
    statsTemplates: 'Templates',
    statsSatisfaction: 'Satisfaction',
    selectedDl: 'Download selection',
  },
};

// ─── MOCK DATA ──────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: 'all',           label: { fr: 'Tous',           en: 'All' },          icon: FiLayout },
  { id: 'admin',         label: { fr: 'Administration', en: 'Administration'}, icon: FiClipboard },
  { id: 'report',        label: { fr: 'Bulletins',      en: 'Report cards' },  icon: FiBarChart2 },
  { id: 'schedule',      label: { fr: 'Emplois du temps',en: 'Schedules' },    icon: FiCalendar },
  { id: 'communication', label: { fr: 'Communication',  en: 'Communication' }, icon: FiMail },
  { id: 'pedagogy',      label: { fr: 'Pédagogie',      en: 'Pedagogy' },      icon: FiBook },
];

const TEMPLATES: Template[] = [
  { id: 't1', category: 'report', type: 'pdf', accent: '#9AAEFF', icon: FiBarChart2,
    name: { fr: 'Bulletin trimestriel', en: 'Quarterly report card' },
    description: { fr: 'Bulletin de notes complet avec graphiques et appréciations.', en: 'Complete report card with charts and comments.' },
    downloads: 4200, rating: 4.9, lastUpdated: '2024-11-01', size: '1.2 MB', tags: ['notes', 'bulletin', 'pdf'], featured: true },
  { id: 't2', category: 'schedule', type: 'xlsx', accent: '#34D399', icon: FiCalendar,
    name: { fr: 'Emploi du temps hebdomadaire', en: 'Weekly schedule' },
    description: { fr: 'Grille horaire éditable pour toute l\'équipe enseignante.', en: 'Editable timetable for the full teaching staff.' },
    downloads: 3100, rating: 4.7, lastUpdated: '2024-10-15', size: '840 KB', tags: ['planning', 'xlsx', 'horaire'], featured: true },
  { id: 't3', category: 'admin', type: 'docx', accent: '#F59E0B', icon: FiClipboard,
    name: { fr: 'Fiche d\'inscription', en: 'Enrollment form' },
    description: { fr: 'Formulaire d\'inscription élève complet et personnalisable.', en: 'Complete and customizable student enrollment form.' },
    downloads: 5800, rating: 4.8, lastUpdated: '2024-09-30', size: '320 KB', tags: ['inscription', 'formulaire'], featured: true },
  { id: 't4', category: 'communication', type: 'pdf', accent: '#C084FC', icon: FiMail,
    name: { fr: 'Lettre aux parents', en: 'Letter to parents' },
    description: { fr: 'Modèle de communication officielle vers les familles.', en: 'Official communication template for families.' },
    downloads: 2900, rating: 4.6, lastUpdated: '2024-11-10', size: '210 KB', tags: ['courrier', 'parents', 'officiel'] },
  { id: 't5', category: 'pedagogy', type: 'docx', accent: '#F87171', icon: FiBook,
    name: { fr: 'Fiche de cours', en: 'Lesson plan' },
    description: { fr: 'Trame pédagogique structurée pour la préparation des cours.', en: 'Structured pedagogical framework for lesson preparation.' },
    downloads: 3400, rating: 4.7, lastUpdated: '2024-10-20', size: '180 KB', tags: ['cours', 'pédagogie', 'plan'] },
  { id: 't6', category: 'admin', type: 'pdf', accent: '#FB923C', icon: FiUsers,
    name: { fr: 'Liste de classe', en: 'Class list' },
    description: { fr: 'Registre d\'appel avec présences et notes rapides.', en: 'Attendance register with quick notes.' },
    downloads: 6100, rating: 4.9, lastUpdated: '2024-11-05', size: '150 KB', tags: ['appel', 'classe', 'liste'], featured: true },
  { id: 't7', category: 'report', type: 'xlsx', accent: '#9AAEFF', icon: FiBarChart2,
    name: { fr: 'Relevé de notes annuel', en: 'Annual grade transcript' },
    description: { fr: 'Tableau récapitulatif des résultats sur toute l\'année.', en: 'Summary table of results for the full year.' },
    downloads: 2200, rating: 4.5, lastUpdated: '2024-08-01', size: '950 KB', tags: ['notes', 'annuel', 'récapitulatif'] },
  { id: 't8', category: 'communication', type: 'docx', accent: '#34D399', icon: FiMail,
    name: { fr: 'Convocation réunion', en: 'Meeting notice' },
    description: { fr: 'Modèle de convocation formelle pour réunions pédagogiques.', en: 'Formal notice template for pedagogical meetings.' },
    downloads: 1800, rating: 4.4, lastUpdated: '2024-07-20', size: '95 KB', tags: ['réunion', 'convocation', 'officiel'] },
];

// ─── UTILS ─────────────────────────────────────────────────────────────────────
const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
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

// Type badge
const TypeBadge: React.FC<{ type: string }> = ({ type }) => {
  const colors: Record<string, string> = { pdf: '#F87171', xlsx: '#34D399', docx: '#9AAEFF' };
  const c = colors[type] ?? '#98A2B3';
  return (
    <span className="text-[9px] px-2 py-0.5 rounded font-light uppercase tracking-widest"
      style={{ background: `${c}18`, color: c, border: `1px solid ${c}28` }}>
      {type}
    </span>
  );
};

// ─── PREVIEW MODAL ─────────────────────────────────────────────────────────────
const PreviewModal: React.FC<{
  template: Template | null; isOpen: boolean; onClose: () => void;
  onDownload: (t: Template) => void; language: Language;
}> = ({ template, isOpen, onClose, onDownload, language }) => {
  const t = T[language];
  if (!template) return null;
  const Icon = template.icon;
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={onClose}>
          <motion.div initial={{ scale: 0.92, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }} transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.38 }}
            className="bg-[#1A1F2E] border border-white/8 rounded-2xl max-w-lg w-full overflow-hidden"
            onClick={e => e.stopPropagation()}>

            {/* Accent top bar */}
            <div className="h-0.5" style={{ background: `linear-gradient(90deg, ${template.accent}, transparent)` }} />

            <div className="p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-7">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl"
                    style={{ background: `${template.accent}18`, border: `1px solid ${template.accent}28` }}>
                    <Icon size={18} style={{ color: template.accent }} />
                  </div>
                  <div>
                    <TypeBadge type={template.type} />
                    <h3 className="text-xl font-extralight text-white tracking-tight mt-1">
                      {template.name[language]}
                    </h3>
                  </div>
                </div>
                <button onClick={onClose} className="text-white/20 hover:text-white/60 transition-colors">
                  <FiX size={18} />
                </button>
              </div>

              {/* Mock preview area */}
              <div className="rounded-xl border border-white/5 mb-7 overflow-hidden"
                style={{ background: `${template.accent}05` }}>
                <div className="h-44 flex items-center justify-center flex-col gap-3">
                  <Icon size={32} style={{ color: `${template.accent}50` }} />
                  <div className="space-y-2 w-48 opacity-30">
                    {[100, 80, 90, 70].map((w, i) => (
                      <div key={i} className="h-1.5 rounded-full"
                        style={{ width: `${w}%`, background: template.accent }} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Meta */}
              <p className="text-sm text-white/40 font-light leading-relaxed mb-6">
                {template.description[language]}
              </p>
              <div className="grid grid-cols-3 gap-3 mb-7">
                {[
                  { label: 'Rating', val: `${template.rating}★` },
                  { label: 'Downloads', val: template.downloads.toLocaleString() },
                  { label: 'Size', val: template.size },
                ].map((m, i) => (
                  <div key={i} className="rounded-xl p-3 text-center border"
                    style={{ background: `${template.accent}08`, borderColor: `${template.accent}18` }}>
                    <div className="text-sm font-extralight mb-0.5" style={{ color: template.accent }}>{m.val}</div>
                    <div className="text-[10px] text-white/20 uppercase tracking-widest">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-7">
                {template.tags.map(tag => (
                  <span key={tag} className="text-[10px] px-2.5 py-1 rounded-md font-light"
                    style={{ background: `${template.accent}10`, color: `${template.accent}BB`, border: `1px solid ${template.accent}18` }}>
                    {tag}
                  </span>
                ))}
              </div>

              <motion.button onClick={() => { onDownload(template); onClose(); }}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-light tracking-wide"
                style={{ background: template.accent, color: '#1A1F2E', boxShadow: `0 0 30px ${template.accent}30` }}>
                <FiDownload size={13} />
                {t.dlBtn}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ─── TEMPLATE CARD (grid) ──────────────────────────────────────────────────────
const TemplateCard: React.FC<{
  template: Template; language: Language; selected: boolean;
  onPreview: () => void; onDownload: () => void; onSelect: () => void;
}> = ({ template, language, selected, onPreview, onDownload, onSelect }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = template.icon;
  const t = T[language];
  return (
    <motion.div
      onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)}
      className="relative rounded-2xl border overflow-hidden group cursor-pointer transition-all duration-200"
      style={{
        background: hovered ? `${template.accent}06` : 'rgba(255,255,255,0.01)',
        borderColor: selected ? template.accent : hovered ? `${template.accent}30` : 'rgba(255,255,255,0.06)',
      }}>
      {/* Top accent */}
      <motion.div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: template.accent }}
        animate={{ opacity: hovered || selected ? 1 : 0, scaleX: hovered || selected ? 1 : 0 }}
        transition={{ duration: 0.25 }} />

      {/* Select checkbox */}
      <button onClick={e => { e.stopPropagation(); onSelect(); }}
        className="absolute top-4 left-4 z-10 w-5 h-5 rounded-md border transition-all duration-150 flex items-center justify-center"
        style={{
          background: selected ? template.accent : 'transparent',
          borderColor: selected ? template.accent : 'rgba(255,255,255,0.15)',
        }}>
        {selected && <FiCheck size={10} className="text-[#1A1F2E]" />}
      </button>

      {/* Featured dot */}
      {template.featured && (
        <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ background: template.accent }} />
      )}

      <div className="p-6 pt-10">
        {/* Icon + type */}
        <div className="flex items-center justify-between mb-5">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl"
            style={{ background: `${template.accent}18`, border: `1px solid ${template.accent}25` }}>
            <Icon size={16} style={{ color: template.accent }} />
          </div>
          <TypeBadge type={template.type} />
        </div>

        {/* Name */}
        <h3 className="text-base font-extralight text-white tracking-tight mb-2 leading-snug">
          {template.name[language]}
        </h3>
        <p className="text-xs text-white/30 font-light leading-relaxed mb-5 line-clamp-2">
          {template.description[language]}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex items-center gap-1">
            <FiStar size={10} className="text-yellow-400" />
            <span className="text-xs text-white/30 font-light">{template.rating}</span>
          </div>
          <div className="w-px h-3 bg-white/8" />
          <span className="text-xs text-white/25 font-light">{template.downloads.toLocaleString()}</span>
          <div className="w-px h-3 bg-white/8" />
          <span className="text-xs text-white/20 font-light">{template.size}</span>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2">
          <motion.button onClick={onPreview} whileTap={{ scale: 0.96 }}
            className="flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-light transition-colors border"
            style={{ borderColor: `${template.accent}25`, color: `${template.accent}CC` }}>
            <FiEye size={11} />
            {t.previewBtn}
          </motion.button>
          <motion.button onClick={onDownload} whileTap={{ scale: 0.96 }}
            className="flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-light transition-all"
            style={{ background: template.accent, color: '#1A1F2E' }}>
            <FiDownload size={11} />
            {t.dlBtn}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// ─── TEMPLATE ROW (list) ───────────────────────────────────────────────────────
const TemplateRow: React.FC<{
  template: Template; language: Language; selected: boolean;
  onPreview: () => void; onDownload: () => void; onSelect: () => void;
}> = ({ template, language, selected, onPreview, onDownload, onSelect }) => {
  const Icon = template.icon;
  const t = T[language];
  return (
    <motion.div className="relative rounded-xl border overflow-hidden transition-all duration-200"
      style={{
        background: selected ? `${template.accent}06` : 'rgba(255,255,255,0.01)',
        borderColor: selected ? `${template.accent}40` : 'rgba(255,255,255,0.06)',
      }}
      whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
      <motion.div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-r-full"
        style={{ background: template.accent }}
        animate={{ opacity: selected ? 1 : 0 }} transition={{ duration: 0.2 }} />

      <div className="px-6 py-4 grid grid-cols-12 gap-4 items-center">
        {/* Checkbox */}
        <div className="col-span-1 flex items-center justify-center">
          <button onClick={onSelect}
            className="w-5 h-5 rounded-md border transition-all flex items-center justify-center"
            style={{ background: selected ? template.accent : 'transparent', borderColor: selected ? template.accent : 'rgba(255,255,255,0.15)' }}>
            {selected && <FiCheck size={10} className="text-[#1A1F2E]" />}
          </button>
        </div>
        {/* Icon + name */}
        <div className="col-span-5 flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center rounded-lg shrink-0"
            style={{ background: `${template.accent}15`, border: `1px solid ${template.accent}22` }}>
            <Icon size={13} style={{ color: template.accent }} />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-extralight text-white tracking-tight truncate">
              {template.name[language]}
            </div>
            <div className="text-[10px] text-white/25 truncate">{template.description[language]}</div>
          </div>
        </div>
        {/* Meta */}
        <div className="col-span-3 flex items-center gap-3">
          <TypeBadge type={template.type} />
          <div className="flex items-center gap-1">
            <FiStar size={9} className="text-yellow-400" />
            <span className="text-xs text-white/30">{template.rating}</span>
          </div>
          <span className="text-xs text-white/20">{template.size}</span>
        </div>
        {/* Actions */}
        <div className="col-span-3 flex items-center justify-end gap-2">
          <motion.button onClick={onPreview} whileTap={{ scale: 0.96 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-light border transition-colors"
            style={{ borderColor: `${template.accent}25`, color: `${template.accent}CC` }}>
            <FiEye size={10} />
            {t.previewBtn}
          </motion.button>
          <motion.button onClick={onDownload} whileTap={{ scale: 0.96 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-light"
            style={{ background: template.accent, color: '#1A1F2E' }}>
            <FiDownload size={10} />
            {t.dlBtn}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
const TemplatesSection: React.FC<{ language?: Language; onTemplateSelect?: (t: Template) => void }> = ({
  language = 'fr', onTemplateSelect
}) => {
  const tl = T[language];
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortBy>('popularity');
  const [search, setSearch] = useState('');
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [downloading, setDownloading] = useState<string | null>(null);

  const filtered = useMemo(() => TEMPLATES
    .filter(t => {
      if (activeCategory !== 'all' && t.category !== activeCategory) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          t.name[language].toLowerCase().includes(q) ||
          t.description[language].toLowerCase().includes(q) ||
          t.tags.some(tag => tag.toLowerCase().includes(q))
        );
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'popularity':   return b.downloads - a.downloads;
        case 'recent':       return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        case 'rating':       return b.rating - a.rating;
        case 'alphabetical': return a.name[language].localeCompare(b.name[language]);
        default:             return 0;
      }
    }), [activeCategory, search, sortBy, language]);

  const totalDownloads = useMemo(() =>
    TEMPLATES.reduce((s, t) => s + t.downloads, 0).toLocaleString(), []);

  const handleDownload = async (template: Template) => {
    setDownloading(template.id);
    await new Promise(r => setTimeout(r, 1200));
    const content = `Template: ${template.name[language]}\nCategory: ${template.category}\nSize: ${template.size}\nDownloaded: ${new Date().toLocaleDateString()}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nova-template-${template.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloading(null);
  };

  const handleBulkDl = async () => {
    const sel = TEMPLATES.filter(t => selected.includes(t.id));
    const content = sel.map(t => `• ${t.name[language]} (${t.type}, ${t.size})`).join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nova-templates-bulk.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setSelected([]);
  };

  const toggleSelect = (id: string) =>
    setSelected(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  return (
    <div className="min-h-screen bg-[#1A1F2E] text-white overflow-hidden">

      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-24 px-6 sm:px-12 lg:px-20 border-b border-white/5">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(154,174,255,0.05) 0%, transparent 70%)', transform: 'translate(30%,-30%)' }} />
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="tg" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#9AAEFF" strokeWidth="0.5" />
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#tg)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 rounded-full bg-[#9AAEFF]" />
              <span className="text-[#9AAEFF] text-xs font-light tracking-[0.3em] uppercase">{tl.eyebrow}</span>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-16 items-end">
            <Reveal delay={0.1}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extralight leading-[1.05] tracking-tight">
                {tl.headline1}<br />
                <span className="text-[#9AAEFF]">{tl.headline2}</span>
              </h1>
            </Reveal>
            <Reveal delay={0.25} className="lg:pb-2">
              <p className="text-[#98A2B3] text-lg font-light leading-relaxed max-w-md mb-8">{tl.subtitle}</p>
              {/* Stats */}
              <div className="grid grid-cols-3 gap-px border border-white/5 rounded-xl overflow-hidden">
                {[
                  { val: `${TEMPLATES.length}+`, lbl: tl.statsTemplates },
                  { val: totalDownloads, lbl: language === 'fr' ? 'Téléchargements' : 'Downloads' },
                  { val: '4.7★', lbl: language === 'fr' ? 'Note moy.' : 'Avg. rating' },
                ].map((s, i) => (
                  <div key={i} className="bg-white/2 px-4 py-4 text-center">
                    <div className="text-xl font-extralight text-white">{s.val}</div>
                    <div className="text-[10px] text-[#484f68] uppercase tracking-widest font-light">{s.lbl}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ LIBRARY ══════════════════════════════════════════════════════════ */}
      <section className="border-b border-white/5 py-20 px-6 sm:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">

          {/* Toolbar */}
          <Reveal>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-8">
              <div>
                <SectionLabel>{language === 'fr' ? 'Bibliothèque' : 'Library'}</SectionLabel>
                <h2 className="text-3xl font-extralight tracking-tight">
                  {language === 'fr' ? 'Tous les modèles' : 'All templates'}
                </h2>
              </div>

              {/* Right controls */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Search */}
                <div className="relative">
                  <FiSearch size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder={tl.searchPh}
                    className="pl-9 pr-8 py-2.5 bg-white/3 border border-white/8 rounded-xl text-sm font-light text-white placeholder-white/20 focus:outline-none focus:border-[#9AAEFF]/40 transition-colors w-56"
                  />
                  {search && (
                    <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60">
                      <FiX size={12} />
                    </button>
                  )}
                </div>

                {/* Sort */}
                <select value={sortBy} onChange={e => setSortBy(e.target.value as SortBy)}
                  className="px-3.5 py-2.5 bg-white/3 border border-white/8 rounded-xl text-xs font-light text-white/50 focus:outline-none focus:border-[#9AAEFF]/40 transition-colors appearance-none cursor-pointer">
                  {tl.sorts.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>

                {/* View toggle */}
                <div className="flex items-center p-1 rounded-xl border border-white/8 bg-white/2">
                  {([['grid', FiGrid], ['list', FiList]] as const).map(([mode, Icon]) => (
                    <button key={mode} onClick={() => setViewMode(mode)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg transition-all"
                      style={viewMode === mode ? { background: '#9AAEFF', color: '#1A1F2E' } : { color: 'rgba(255,255,255,0.3)' }}>
                      <Icon size={13} />
                    </button>
                  ))}
                </div>

                {/* Bulk DL */}
                {selected.length > 0 && (
                  <motion.button initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    onClick={handleBulkDl} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-light bg-[#9AAEFF] text-[#1A1F2E]">
                    <FiDownload size={12} />
                    {tl.selectedDl} ({selected.length})
                  </motion.button>
                )}
              </div>
            </div>
          </Reveal>

          {/* Category pills */}
          <Reveal delay={0.06}>
            <div className="flex flex-wrap gap-2 mb-8">
              {CATEGORIES.map(cat => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-light tracking-wide transition-all duration-200 border"
                    style={isActive
                      ? { background: '#9AAEFF', color: '#1A1F2E', borderColor: '#9AAEFF' }
                      : { background: 'rgba(255,255,255,0.02)', color: 'rgba(255,255,255,0.4)', borderColor: 'rgba(255,255,255,0.06)' }}>
                    <Icon size={11} />
                    {cat.label[language]}
                  </button>
                );
              })}
              {/* Count */}
              <div className="ml-auto flex items-center text-xs text-white/20 font-light self-center">
                {filtered.length} {tl.templates}
              </div>
            </div>
          </Reveal>

          {/* Results */}
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-center py-24">
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-white/3 border border-white/8 flex items-center justify-center">
                  <FiFilter size={20} className="text-white/20" />
                </div>
                <h3 className="text-xl font-extralight text-white mb-2">{tl.empty}</h3>
                <p className="text-sm text-white/25 mb-6">{tl.emptySub}</p>
                <button onClick={() => { setSearch(''); setActiveCategory('all'); }}
                  className="flex items-center gap-2 mx-auto px-5 py-2.5 rounded-xl text-xs font-light border border-white/10 text-white/40 hover:text-white/70 hover:border-white/20 transition-all">
                  <FiArrowRight size={11} />
                  {tl.resetBtn}
                </button>
              </motion.div>
            ) : viewMode === 'grid' ? (
              <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((template, i) => (
                  <Reveal key={template.id} delay={0.04 * i}>
                    <TemplateCard template={template} language={language}
                      selected={selected.includes(template.id)}
                      onPreview={() => { setPreviewTemplate(template); setPreviewOpen(true); onTemplateSelect?.(template); }}
                      onDownload={() => handleDownload(template)}
                      onSelect={() => toggleSelect(template.id)} />
                  </Reveal>
                ))}
              </motion.div>
            ) : (
              <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col gap-2">
                {filtered.map((template, i) => (
                  <Reveal key={template.id} delay={0.03 * i}>
                    <TemplateRow template={template} language={language}
                      selected={selected.includes(template.id)}
                      onPreview={() => { setPreviewTemplate(template); setPreviewOpen(true); }}
                      onDownload={() => handleDownload(template)}
                      onSelect={() => toggleSelect(template.id)} />
                  </Reveal>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ══ CTA ══════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 sm:px-12 lg:px-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(154,174,255,0.05) 0%, transparent 70%)' }} />
        <div className="relative max-w-7xl mx-auto">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xs tracking-[0.35em] uppercase text-[#9AAEFF]/70 font-light mb-6">
                {tl.whyLabel}
              </p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extralight tracking-tight leading-tight mb-6">
                <span className="text-[#9AAEFF]">{tl.ctaHeadline1}</span>{' '}
                {tl.ctaHeadline2}<br />
                {tl.ctaHeadline3}
              </h2>
              <p className="text-[#98A2B3] font-light mb-10 text-lg">{tl.ctaSub}</p>

              {/* Community stats */}
              <div className="grid grid-cols-3 gap-px border border-white/5 rounded-xl overflow-hidden mb-10">
                {[
                  { val: '500+', lbl: tl.statsCreators },
                  { val: '10K+', lbl: tl.statsTemplates },
                  { val: '98%',  lbl: tl.statsSatisfaction },
                ].map((s, i) => (
                  <div key={i} className="bg-white/2 px-4 py-5 text-center">
                    <div className="text-2xl font-extralight text-white mb-1">{s.val}</div>
                    <div className="text-[10px] text-[#484f68] uppercase tracking-widest font-light">{s.lbl}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-[#9AAEFF] text-[#1A1F2E] font-light text-sm tracking-wide rounded-xl"
                  style={{ boxShadow: '0 0 40px rgba(154,174,255,0.2)' }}>
                  {tl.ctaExplore}
                  <FiArrowRight size={14} />
                </motion.button>
                <motion.button whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-3 px-8 py-4 border border-[#9AAEFF]/25 text-[#9AAEFF] font-light text-sm tracking-wide rounded-xl hover:bg-[#9AAEFF]/8 transition-all duration-300">
                  {tl.ctaContact}
                </motion.button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Preview modal */}
      <PreviewModal template={previewTemplate} isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)} onDownload={handleDownload} language={language} />
    </div>
  );
};

export default TemplatesSection;