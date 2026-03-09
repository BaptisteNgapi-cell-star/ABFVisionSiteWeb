// components/AboutSection.tsx
import React, { useRef } from 'react'; // Suppression de useState, useEffect inutilisés
import { motion, useInView } from 'framer-motion';
import {
  FiLinkedin, FiGithub, FiMail, FiExternalLink,
  FiZap, FiCode, FiLayout,
  FiServer, FiBookOpen, FiTarget, FiArrowRight
} from 'react-icons/fi'; 

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
const T = {
  fr: {
    eyebrow: 'Qui sommes-nous',
    headline1: 'Une vision.',
    headline2: 'Trois fondateurs.',
    headline3: 'Un écosystème.',
    storyLabel: 'Notre histoire',
    storyBody: 'Nova est née d\'une conviction simple : la gestion scolaire en Afrique méritait mieux. Ce qui a commencé comme un projet passionné est devenu une plateforme complète qui transforme le quotidien des établissements éducatifs.',
    nameLabel: 'L\'étymologie du nom',
    // Explication de "Nova" en français
    novaExplanation: 'Nova vient du latin "novus" qui signifie nouveau. Comme une étoile qui devient soudainement brillante, Nova représente l\'émergence d\'une nouvelle ère dans la gestion scolaire.',
    scola: { title: 'Nova', body: 'Du latin novus — le nouveau, l\'innovation, la renaissance numérique de l\'éducation.' },
    visionLabel: 'Notre vision',
    visionBody: 'Créer un écosystème numérique intelligent qui simplifie la gestion éducative, connecte les communautés scolaires et permet à chaque établissement de se concentrer sur l\'essentiel : la réussite des élèves.',
    valuesLabel: 'Nos valeurs',
    values: [
      { title: 'Innovation',  body: 'Nous repoussons constamment les limites pour offrir des solutions toujours plus intelligentes.' },
      { title: 'Simplicité',  body: 'La technologie au service de l\'humain, pas l\'inverse.' },
      { title: 'Excellence',  body: 'Nous visons le meilleur pour nos utilisateurs, sans compromis.' },
    ],
    teamLabel: 'L\'équipe',
    teamSub: 'Trois passionnés, une mission.',
    bnLabel: 'Membre de Blue Numeric',
    bnBody: 'Nous sommes fiers de faire partie de Blue Numeric, une startup innovante spécialisée dans les solutions numériques avancées.',
    bnCta: 'Visiter Blue Numeric',
    funFacts: {
      baptiste: 'Peut coder en dormant — on suspecte des super-pouvoirs.',
      awa: 'Son design est si bon qu\'il devance vos besoins.',
      fred: 'Réseaux si rapides qu\'il voyage dans le temps. Presque.',
    },
  },
  en: {
    eyebrow: 'Who we are',
    headline1: 'One vision.',
    headline2: 'Three founders.',
    headline3: 'One ecosystem.',
    storyLabel: 'Our story',
    storyBody: 'Nova was born from a simple conviction: school management in Africa deserved better. What started as a passionate project has become a comprehensive platform transforming how educational institutions operate daily.',
    nameLabel: 'The etymology',
    // Explication de "Nova" en anglais
    novaExplanation: 'Nova comes from Latin "novus" meaning new. Like a star that suddenly becomes brilliant, Nova represents the emergence of a new era in school management.',
    scola: { title: 'Nova', body: 'From Latin novus — the new, innovation, the digital renaissance of education.' },
    visionLabel: 'Our vision',
    visionBody: 'Create an intelligent digital ecosystem that simplifies educational management, connects school communities, and allows each institution to focus on what matters most: student success.',
    valuesLabel: 'Our values',
    values: [
      { title: 'Innovation', body: 'We constantly push boundaries to deliver ever smarter solutions.' },
      { title: 'Simplicity', body: 'Technology serving people, not the other way around.' },
      { title: 'Excellence', body: 'We aim for the best for our users, with no compromises.' },
    ],
    teamLabel: 'The team',
    teamSub: 'Three passionate, one mission.',
    bnLabel: 'Member of Blue Numeric',
    bnBody: 'We are proud to be part of Blue Numeric, an innovative startup specializing in advanced digital solutions.',
    bnCta: 'Visit Blue Numeric',
    funFacts: {
      baptiste: 'Can code while sleeping — superpowers suspected.',
      awa: 'Her design is so good it anticipates your needs.',
      fred: 'Networks so fast he time travels. Almost.',
    },
  },
};

// ─── TEAM DATA ────────────────────────────────────────────────────────────────
const TEAM = [
  {
    key: 'baptiste',
    name: 'Baptiste Ngapi',
    role: { fr: 'Co-fondateur · Full-Stack', en: 'Co-founder · Full-Stack' },
    icon: FiCode,
    accent: '#9AAEFF',
    num: '01',
    tags: ['React', 'Node.js', 'AI', 'Architecture'],
    linkedin: '#', github: '#', email: 'baptiste@nova-edu.com',
  },
  {
    key: 'awa',
    name: 'Miekountou Belssaja Awa',
    role: { fr: 'Co-fondatrice · UX/UI Design', en: 'Co-founder · UX/UI Design' },
    icon: FiLayout,
    accent: '#C084FC',
    num: '02',
    tags: ['UI/UX', 'Figma', 'Research', 'Proto'],
    linkedin: '#', github: '#', email: 'awa@nova-edu.com',
  },
  {
    key: 'fred',
    name: 'KONGA-NZINGA Fredman',
    role: { fr: 'Co-fondateur · Réseaux & Infra', en: 'Co-founder · Networks & Infra' },
    icon: FiServer,
    accent: '#34D399',
    num: '03',
    tags: ['Networking', 'Security', 'Cloud', 'DevOps'],
    linkedin: '#', github: '#', email: 'fred@nova-edu.com',
  },
];

// ─── UTILS ────────────────────────────────────────────────────────────────────
const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
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

// ─── TEAM CARD ────────────────────────────────────────────────────────────────
const TeamCard: React.FC<{ member: typeof TEAM[0]; language: 'fr' | 'en'; delay: number }> = ({ member, language, delay }) => {
  const Icon = member.icon;
  const t = T[language];
  const fact = t.funFacts[member.key as keyof typeof t.funFacts];
  const [hovered, setHovered] = React.useState(false);

  return (
    <Reveal delay={delay}>
      <motion.div
        className="relative group border border-white/5 rounded-2xl overflow-hidden bg-[#1A1F2E] hover:border-white/10 transition-colors duration-300"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
      >
        {/* Accent top bar - préservé exactement */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-0.5" // Changé de h-[2px] à h-0.5 (équivalent exact)
          style={{ background: member.accent }}
          animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
          initial={{ scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Phantom number */}
        <div
          className="absolute top-4 right-4 text-[5rem] font-extralight leading-none select-none pointer-events-none"
          style={{ color: `${member.accent}08`, letterSpacing: '-0.05em' }}
        >
          {member.num}
        </div>

        <div className="p-8">
          {/* Icon */}
          <div className="w-12 h-12 flex items-center justify-center rounded-xl mb-6"
            style={{ background: `${member.accent}15`, border: `1px solid ${member.accent}25` }}>
            <Icon size={18} style={{ color: member.accent }} />
          </div>

          {/* Name + role */}
          <div className="mb-5">
            <div className="text-[10px] font-light tracking-[0.25em] uppercase mb-2" style={{ color: member.accent }}>
              {member.role[language]}
            </div>
            <h3 className="text-xl font-extralight text-white leading-snug tracking-tight">
              {member.name}
            </h3>
          </div>

          {/* Fun fact */}
          <div className="flex items-start gap-2.5 mb-5 p-3 rounded-lg" style={{ background: `${member.accent}08`, border: `1px solid ${member.accent}12` }}>
            <FiZap size={11} className="mt-0.5 shrink-0" style={{ color: member.accent }} />
            <p className="text-xs font-light leading-relaxed" style={{ color: `${member.accent}CC` }}>
              {fact}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {member.tags.map(tag => (
              <span key={tag} className="text-[10px] px-2.5 py-1 rounded-md font-light"
                style={{ background: `${member.accent}10`, color: `${member.accent}BB`, border: `1px solid ${member.accent}18` }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/5 mb-5" />

          {/* Social links */}
          <div className="flex items-center gap-2">
            {[
              { icon: FiLinkedin, href: member.linkedin },
              { icon: FiGithub,   href: member.github },
              { icon: FiMail,     href: `mailto:${member.email}` },
            ].map(({ icon: SIcon, href }) => (
              <motion.a key={href} href={href}
                whileHover={{ y: -2 }}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/3 border border-white/5 text-[#484f68] hover:text-white transition-colors">
                {/* Changé bg-white/[0.03] → bg-white/3 et border-white/[0.07] → border-white/5 (équivalents exacts) */}
                <SIcon size={13} />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const AboutSection: React.FC<{ language: 'fr' | 'en' }> = ({ language }) => {
  const t = T[language];

  return (
    <div className="min-h-screen bg-[#1A1F2E] text-white overflow-hidden">

      {/* ══ HERO BAND ══════════════════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-24 px-6 sm:px-12 lg:px-20 border-b border-white/5">
        {/* Background atmospherics - inchangé */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(154,174,255,0.06) 0%, transparent 70%)', transform: 'translate(30%,-30%)' }} />
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="ag" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#9AAEFF" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ag)" />
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
              <p className="text-[#98A2B3] text-lg font-light leading-relaxed max-w-md">
                {t.storyBody}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ STORY + ETYMOLOGY ═════════════════════════════════════════════════ */}
      <section className="border-b border-white/5 py-20 px-6 sm:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-start">

          {/* Left: Story */}
          <Reveal className="lg:col-span-5">
            <SectionLabel>{t.storyLabel}</SectionLabel>
            <p className="text-[#98A2B3] text-base font-light leading-relaxed">
              {t.storyBody}
            </p>

            {/* Vision block */}
            <div className="mt-10 pt-10 border-t border-white/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#9AAEFF] shrink-0">
                  <FiTarget size={14} className="text-[#1A1F2E]" />
                </div>
                <span className="text-xs tracking-[0.25em] uppercase text-[#9AAEFF] font-light">{t.visionLabel}</span>
              </div>
              <p className="text-[#98A2B3] text-sm font-light leading-relaxed">{t.visionBody}</p>
            </div>
          </Reveal>

          {/* Right: Etymology card */}
          <Reveal delay={0.12} className="lg:col-span-7">
            <div className="rounded-2xl border border-white/5 overflow-hidden bg-white/2">
              {/* Changé bg-white/[0.02] → bg-white/2 (équivalent exact) */}
              <div className="px-8 pt-7 pb-4 border-b border-white/5">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-1 h-5 rounded-full bg-[#9AAEFF]/60" />
                  <span className="text-xs tracking-[0.3em] uppercase text-[#9AAEFF]/70 font-light">{t.nameLabel}</span>
                </div>
                <div className="text-4xl font-extralight tracking-tight text-white mt-3">
                  <span className="text-[#9AAEFF]">Nova</span>
                </div>
                {/* Ajout de l'explication du nom Nova */}
                <p className="text-xs text-[#98A2B3] font-light mt-3 max-w-md">
                  {t.novaExplanation}
                </p>
              </div>

              <div className="grid sm:grid-cols-1 gap-px bg-white/5">
                {/* Changé pour afficher seulement une carte avec l'explication de Nova */}
                <div className="bg-[#1A1F2E] p-7">
                  <div className="w-9 h-9 flex items-center justify-center rounded-lg mb-4"
                    style={{ background: '#9AAEFF15', border: '1px solid #9AAEFF25' }}>
                    <FiBookOpen size={15} style={{ color: '#9AAEFF' }} />
                  </div>
                  <div className="text-lg font-extralight tracking-tight mb-2" style={{ color: '#9AAEFF' }}>
                    {t.scola.title}
                  </div>
                  <p className="text-xs text-[#484f68] font-light leading-relaxed">{t.scola.body}</p>
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ══ VALUES ════════════════════════════════════════════════════════════ */}
      <section className="border-b border-white/5 py-20 px-6 sm:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16">

            {/* Sticky label */}
            <Reveal className="lg:col-span-3 lg:sticky lg:top-24 lg:self-start">
              <SectionLabel>{t.valuesLabel}</SectionLabel>
              <h2 className="text-3xl font-extralight tracking-tight leading-snug">
                {language === 'fr' ? <>Ce qui<br />nous<br />guide</> : <>What<br />guides<br />us</>}
              </h2>
              <div className="mt-6 w-12 h-px bg-[#9AAEFF]/30" />
            </Reveal>

            {/* Values list */}
            <div className="lg:col-span-9 flex flex-col divide-y divide-white/5">
              {t.values.map((v, i) => (
                <Reveal key={i} delay={0.08 * i}>
                  <motion.div
                    className="py-8 grid sm:grid-cols-12 gap-6 items-center group"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="sm:col-span-1">
                      <div className="text-[2.5rem] font-extralight leading-none select-none"
                        style={{ color: 'rgba(154,174,255,0.1)', letterSpacing: '-0.05em' }}>
                        {String(i + 1).padStart(2, '0')}
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <h3 className="text-xl font-extralight text-white tracking-tight">{v.title}</h3>
                    </div>
                    <div className="sm:col-span-7">
                      <p className="text-sm text-[#484f68] font-light leading-relaxed">{v.body}</p>
                    </div>
                    <div className="sm:col-span-1 flex justify-end">
                      <FiArrowRight size={13} className="text-[#9AAEFF]/0 group-hover:text-[#9AAEFF]/60 transition-colors" />
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══ TEAM ══════════════════════════════════════════════════════════════ */}
      <section className="border-b border-white/5 py-20 px-6 sm:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="flex items-end justify-between mb-12">
              <div>
                <SectionLabel>{t.teamLabel}</SectionLabel>
                <h2 className="text-3xl sm:text-4xl font-extralight tracking-tight">{t.teamSub}</h2>
              </div>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden">
            {TEAM.map((member, i) => (
              <div key={member.key} className="bg-[#1A1F2E]">
                <TeamCard member={member} language={language} delay={0.08 * i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BLUE NUMERIC ══════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 sm:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="relative rounded-2xl border border-white/5 overflow-hidden">
              {/* Bg glow */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 60% 100% at 90% 50%, rgba(0,123,255,0.07) 0%, transparent 70%)' }} />

              <div className="relative grid lg:grid-cols-12 gap-10 items-center p-10 sm:p-14">

                {/* Logo BN */}
                <div className="lg:col-span-2 flex justify-start lg:justify-center">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #007BFF, #0056B3)', boxShadow: '0 0 40px rgba(0,123,255,0.25)' }}>
                    <span className="text-white font-bold text-2xl tracking-tight">BN</span>
                  </div>
                </div>

                {/* Text */}
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-1 h-5 rounded-full" style={{ background: '#007BFF' }} />
                    <span className="text-xs tracking-[0.3em] uppercase font-light" style={{ color: '#007BFF' }}>
                      {t.bnLabel}
                    </span>
                  </div>
                  <p className="text-[#98A2B3] font-light leading-relaxed text-sm max-w-lg">{t.bnBody}</p>
                </div>

                {/* CTA */}
                <div className="lg:col-span-3 flex lg:justify-end">
                  <motion.a
                    href="https://bluenumeric.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-white text-sm font-light tracking-wide transition-all duration-300"
                    style={{ background: 'linear-gradient(135deg, #007BFF, #0056B3)', boxShadow: '0 0 30px rgba(0,123,255,0.2)' }}
                  >
                    {t.bnCta}
                    <FiExternalLink size={13} />
                  </motion.a>
                </div>

              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
};

export default AboutSection;