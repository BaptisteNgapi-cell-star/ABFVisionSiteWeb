// components/ContactSection.tsx
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  FiMail, FiPhone, FiMapPin, FiSend, FiUser,
  FiMessageSquare, FiGlobe, FiClock, FiCheck,
  FiArrowRight, FiAlertCircle
} from 'react-icons/fi';

// ─── TRANSLATIONS ──────────────────────────────────────────────────────────────
const T = {
  fr: {
    eyebrow: 'Contact',
    headline1: 'Parlons de',
    headline2: 'votre projet.',
    subtitle: 'Nous sommes là pour répondre à vos questions et vous accompagner dans la transformation numérique de votre établissement.',
    statsReply: 'Réponse moy.',
    statsSat: 'Satisfaction',
    formTitle: 'Envoyez-nous un message',
    labelName: 'Nom complet',
    labelEmail: 'Adresse email',
    labelSubject: 'Sujet',
    labelMessage: 'Message',
    phName: 'Votre nom',
    phEmail: 'votre@email.com',
    phSubject: 'En quoi pouvons-nous vous aider ?',
    phMessage: 'Décrivez votre projet ou votre question…',
    sendBtn: 'Envoyer le message',
    sendingBtn: 'Envoi en cours…',
    successMsg: 'Message envoyé avec succès.',
    errorMsg: 'Une erreur est survenue, réessayez.',
    coordTitle: 'Nos coordonnées',
    coordSubtitle: 'Plusieurs façons de nous joindre',
    labelEmailCoord: 'Email',
    labelPhone: 'Téléphone',
    labelAddress: 'Adresse',
    labelSite: 'Site web',
    labelHours: 'Disponibilité',
    teamTitle: 'L\'équipe',
    teamSubtitle: 'Contactez directement nos fondateurs',
    basedIn: 'Basés à Paris',
    basedSub: 'Au cœur de l\'innovation éducative',
    mapPlaceholder: 'Carte interactive',
  },
  en: {
    eyebrow: 'Contact',
    headline1: 'Let\'s talk about',
    headline2: 'your project.',
    subtitle: 'We\'re here to answer your questions and support the digital transformation of your institution.',
    statsReply: 'Avg. response',
    statsSat: 'Satisfaction',
    formTitle: 'Send us a message',
    labelName: 'Full name',
    labelEmail: 'Email address',
    labelSubject: 'Subject',
    labelMessage: 'Message',
    phName: 'Your name',
    phEmail: 'you@email.com',
    phSubject: 'How can we help you?',
    phMessage: 'Describe your project or question…',
    sendBtn: 'Send message',
    sendingBtn: 'Sending…',
    successMsg: 'Message sent successfully.',
    errorMsg: 'Something went wrong, please retry.',
    coordTitle: 'Our contacts',
    coordSubtitle: 'Multiple ways to reach us',
    labelEmailCoord: 'Email',
    labelPhone: 'Phone',
    labelAddress: 'Address',
    labelSite: 'Website',
    labelHours: 'Availability',
    teamTitle: 'The team',
    teamSubtitle: 'Reach our founders directly',
    basedIn: 'Based in Paris',
    basedSub: 'At the heart of educational innovation',
    mapPlaceholder: 'Interactive map',
  },
};

// ─── DATA ──────────────────────────────────────────────────────────────────────
const CONTACT = {
  email: 'contact@nova-scolarys.com',
  phone: '+33 1 23 45 67 89',
  address: { fr: '123 Avenue de l\'Éducation, 75000 Paris, France', en: '123 Education Avenue, 75000 Paris, France' },
  website: 'www.nova-scolarys.com',
  availability: { fr: 'Lun – Ven : 9h – 18h', en: 'Mon – Fri: 9am – 6pm' },
};

const TEAM = [
  {
    num: '01',
    name: 'Baptiste Ngapi',
    accent: '#9AAEFF',
    role: { fr: 'Co-fondateur & Développeur Full-Stack', en: 'Co-founder & Full-Stack Developer' },
    spec: { fr: 'Développement technique & Architecture', en: 'Technical Development & Architecture' },
    email: 'baptiste@nova-scolarys.com',
  },
  {
    num: '02',
    name: 'KONGA-NZINGA Fredman',
    accent: '#34D399',
    role: { fr: 'Co-fondateur & Expert Réseaux', en: 'Co-founder & Network Expert' },
    spec: { fr: 'Infrastructure & Télécommunications', en: 'Infrastructure & Telecommunications' },
    email: 'fred@nova-scolarys.com',
  },
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

// Field component
const Field: React.FC<{
  label: string; required?: boolean;
  children: React.ReactNode;
}> = ({ label, required, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10px] uppercase tracking-[0.2em] font-light text-white/25">
      {label}{required && <span className="text-[#9AAEFF]/50 ml-0.5">*</span>}
    </label>
    {children}
  </div>
);

const inputCls = "w-full bg-white/3 border border-white/8 rounded-xl px-4 py-3 text-sm font-extralight text-white placeholder-white/15 focus:outline-none focus:border-[#9AAEFF]/40 transition-colors duration-200";

// ─── COORD ROW ─────────────────────────────────────────────────────────────────
const CoordRow: React.FC<{
  icon: React.ElementType; label: string; value: string; href?: string;
}> = ({ icon: Icon, label, value, href }) => (
  <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.18 }}
    className="flex items-center gap-4 py-4 border-b border-white/5 last:border-0 group">
    <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#9AAEFF]/8 border border-[#9AAEFF]/15 shrink-0 group-hover:bg-[#9AAEFF]/12 transition-colors">
      <Icon size={14} className="text-[#9AAEFF]" />
    </div>
    <div className="min-w-0">
      <div className="text-[10px] uppercase tracking-[0.2em] text-white/20 font-light mb-0.5">{label}</div>
      {href ? (
        <a href={href} className="text-sm font-extralight text-white/50 hover:text-white/80 transition-colors truncate block">
          {value}
        </a>
      ) : (
        <span className="text-sm font-extralight text-white/50">{value}</span>
      )}
    </div>
    <FiArrowRight size={11} className="ml-auto text-white/10 group-hover:text-[#9AAEFF]/40 transition-colors shrink-0" />
  </motion.div>
);

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
const ContactSection: React.FC<{ language?: 'fr' | 'en'; onNavigate?: (s: string) => void }> = ({
  language = 'fr',
}) => {
  const t = T[language];
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(false);
    await new Promise(r => setTimeout(r, 1800));
    setSending(false);
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#1A1F2E] text-white overflow-hidden">

      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-20 px-6 sm:px-12 lg:px-20 border-b border-white/5">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(154,174,255,0.04) 0%, transparent 70%)', transform: 'translate(30%,-30%)' }} />
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="cg" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#9AAEFF" strokeWidth="0.5" />
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#cg)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-end">
            <div>
              <Reveal>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1 h-8 rounded-full bg-[#9AAEFF]" />
                  <span className="text-[#9AAEFF] text-xs font-light tracking-[0.3em] uppercase">{t.eyebrow}</span>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extralight leading-[1.05] tracking-tight">
                  {t.headline1}<br />
                  <span className="text-[#9AAEFF]">{t.headline2}</span>
                </h1>
              </Reveal>
            </div>
            <Reveal delay={0.22} className="lg:pb-2">
              <p className="text-[#98A2B3] text-lg font-light leading-relaxed mb-8 max-w-md">{t.subtitle}</p>
              {/* Mini stats */}
              <div className="grid grid-cols-2 gap-px border border-white/5 rounded-xl overflow-hidden">
                {[
                  { val: '< 24h', lbl: t.statsReply },
                  { val: '98%', lbl: t.statsSat },
                ].map((s, i) => (
                  <div key={i} className="bg-white/2 px-6 py-4 text-center">
                    <div className="text-2xl font-extralight text-white">{s.val}</div>
                    <div className="text-[10px] text-[#484f68] uppercase tracking-widest font-light mt-0.5">{s.lbl}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ FORM + COORDS ═══════════════════════════════════════════════════ */}
      <section className="border-b border-white/5 py-20 px-6 sm:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10">

          {/* ── Contact form ── */}
          <div className="lg:col-span-7">
            <Reveal>
              <SectionLabel>{t.formTitle}</SectionLabel>
            </Reveal>

            {/* Success / Error banners */}
            <AnimatePresence>
              {sent && (
                <motion.div key="success" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border mb-6"
                  style={{ background: 'rgba(52,211,153,0.06)', borderColor: 'rgba(52,211,153,0.2)' }}>
                  <FiCheck size={13} className="text-[#34D399] shrink-0" />
                  <span className="text-sm font-light text-[#34D399]">{t.successMsg}</span>
                </motion.div>
              )}
              {error && (
                <motion.div key="error" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border mb-6"
                  style={{ background: 'rgba(248,113,113,0.06)', borderColor: 'rgba(248,113,113,0.2)' }}>
                  <FiAlertCircle size={13} className="text-[#F87171] shrink-0" />
                  <span className="text-sm font-light text-[#F87171]">{t.errorMsg}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <Reveal delay={0.07}>
              <div className="rounded-2xl border border-white/5 overflow-hidden bg-white/1">
                <div className="h-0.5" style={{ background: 'linear-gradient(90deg, #9AAEFF, transparent)' }} />
                <form onSubmit={onSubmit} className="p-8">
                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    <Field label={t.labelName} required>
                      <div className="relative">
                        <FiUser size={12} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                        <input name="name" type="text" required value={form.name} onChange={onChange}
                          placeholder={t.phName}
                          className={inputCls + ' pl-10'} />
                      </div>
                    </Field>
                    <Field label={t.labelEmail} required>
                      <div className="relative">
                        <FiMail size={12} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                        <input name="email" type="email" required value={form.email} onChange={onChange}
                          placeholder={t.phEmail}
                          className={inputCls + ' pl-10'} />
                      </div>
                    </Field>
                  </div>

                  <div className="mb-5">
                    <Field label={t.labelSubject} required>
                      <input name="subject" type="text" required value={form.subject} onChange={onChange}
                        placeholder={t.phSubject}
                        className={inputCls} />
                    </Field>
                  </div>

                  <div className="mb-7">
                    <Field label={t.labelMessage} required>
                      <div className="relative">
                        <FiMessageSquare size={12} className="absolute left-4 top-4 text-white/20" />
                        <textarea name="message" required rows={6} value={form.message} onChange={onChange}
                          placeholder={t.phMessage}
                          className={inputCls + ' pl-10 resize-none'} />
                      </div>
                    </Field>
                  </div>

                  <motion.button type="submit" disabled={sending}
                    whileHover={sending ? {} : { scale: 1.02, y: -1 }} whileTap={sending ? {} : { scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-light tracking-wide transition-all"
                    style={{
                      background: sending ? 'rgba(154,174,255,0.35)' : '#9AAEFF',
                      color: '#1A1F2E',
                      boxShadow: sending ? 'none' : '0 0 35px rgba(154,174,255,0.2)',
                      cursor: sending ? 'not-allowed' : 'pointer',
                    }}>
                    {sending ? (
                      <>
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-[#1A1F2E]/30 border-t-[#1A1F2E] rounded-full" />
                        {t.sendingBtn}
                      </>
                    ) : (
                      <>
                        <FiSend size={13} />
                        {t.sendBtn}
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </Reveal>
          </div>

          {/* ── Coords ── */}
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <SectionLabel>{t.coordTitle}</SectionLabel>
              <div className="rounded-2xl border border-white/5 overflow-hidden bg-white/1 mb-5">
                <div className="h-0.5" style={{ background: 'linear-gradient(90deg, #34D399, transparent)' }} />
                <div className="px-7 py-5">
                  <CoordRow icon={FiMail} label={t.labelEmailCoord} value={CONTACT.email} href={`mailto:${CONTACT.email}`} />
                  <CoordRow icon={FiPhone} label={t.labelPhone} value={CONTACT.phone} href={`tel:${CONTACT.phone}`} />
                  <CoordRow icon={FiMapPin} label={t.labelAddress} value={CONTACT.address[language]} />
                  <CoordRow icon={FiGlobe} label={t.labelSite} value={CONTACT.website} href={`https://${CONTACT.website}`} />
                  <CoordRow icon={FiClock} label={t.labelHours} value={CONTACT.availability[language]} />
                </div>
              </div>
            </Reveal>

            {/* Location card */}
            <Reveal delay={0.18}>
              <div className="rounded-2xl border border-white/5 overflow-hidden bg-white/1">
                <div className="h-0.5" style={{ background: 'linear-gradient(90deg, #C084FC, transparent)' }} />
                <div className="p-6 text-center">
                  <motion.div animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-12 h-12 flex items-center justify-center rounded-2xl mx-auto mb-4 bg-[#C084FC]/12 border border-[#C084FC]/20">
                    <FiMapPin size={18} className="text-[#C084FC]" />
                  </motion.div>
                  <h3 className="text-base font-extralight text-white mb-1">{t.basedIn}</h3>
                  <p className="text-xs text-white/25 font-light mb-5">{t.basedSub}</p>
                  {/* Map placeholder */}
                  <div className="h-28 rounded-xl border border-white/5 bg-white/1.5 flex items-center justify-center relative overflow-hidden">
                    <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
                      <defs><pattern id="mgrid" width="24" height="24" patternUnits="userSpaceOnUse">
                        <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#9AAEFF" strokeWidth="0.5" />
                      </pattern></defs>
                      <rect width="100%" height="100%" fill="url(#mgrid)" />
                    </svg>
                    <div className="flex flex-col items-center gap-1.5 relative z-10">
                      <div className="w-2 h-2 rounded-full bg-[#9AAEFF] animate-pulse" />
                      <span className="text-[10px] text-white/20 font-light tracking-widest uppercase">{t.mapPlaceholder}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ TEAM ════════════════════════════════════════════════════════════ */}
      <section className="border-b border-white/5 py-20 px-6 sm:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16">

            <Reveal className="lg:col-span-3 lg:sticky lg:top-24 lg:self-start">
              <SectionLabel>{t.teamTitle}</SectionLabel>
              <h2 className="text-3xl font-extralight tracking-tight leading-snug">
                {t.teamSubtitle}
              </h2>
              <div className="mt-6 w-12 h-px bg-[#9AAEFF]/30" />
            </Reveal>

            <div className="lg:col-span-9 flex flex-col divide-y divide-white/5">
              {TEAM.map((member, i) => (
                <Reveal key={member.name} delay={0.07 * i}>
                  <motion.div className="py-8 first:pt-0 group"
                    whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                    <div className="grid sm:grid-cols-12 gap-6 items-center">
                      {/* Phantom number */}
                      <div className="sm:col-span-1 hidden sm:block">
                        <span className="text-3xl font-extralight select-none leading-none"
                          style={{ color: `${member.accent}12`, letterSpacing: '-0.05em' }}>
                          {member.num}
                        </span>
                      </div>
                      {/* Name + role */}
                      <div className="sm:col-span-5">
                        <div className="text-[10px] tracking-[0.2em] uppercase font-light mb-1"
                          style={{ color: member.accent }}>
                          {member.role[language]}
                        </div>
                        <h3 className="text-lg font-extralight text-white tracking-tight">{member.name}</h3>
                      </div>
                      {/* Spec */}
                      <div className="sm:col-span-4">
                        <p className="text-xs text-white/25 font-light leading-relaxed">{member.spec[language]}</p>
                      </div>
                      {/* Email */}
                      <div className="sm:col-span-2 flex justify-end">
                        <a href={`mailto:${member.email}`}
                          className="flex items-center gap-1.5 text-xs font-light transition-colors"
                          style={{ color: `${member.accent}80` }}
                          onMouseEnter={e => (e.currentTarget.style.color = member.accent)}
                          onMouseLeave={e => (e.currentTarget.style.color = `${member.accent}80`)}>
                          <FiMail size={11} />
                          Email
                        </a>
                      </div>
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
        <div className="relative max-w-7xl mx-auto text-center">
          <Reveal>
            <p className="text-xs tracking-[0.35em] uppercase text-[#9AAEFF]/60 font-light mb-6">Nova</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extralight tracking-tight leading-tight mb-6">
              {language === 'fr'
                ? <><span className="text-[#9AAEFF]">Prêt</span> à démarrer ?</>
                : <><span className="text-[#9AAEFF]">Ready</span> to get started?</>}
            </h2>
            <p className="text-[#98A2B3] font-light mb-10 text-lg max-w-xl mx-auto">
              {language === 'fr'
                ? 'Contactez-nous et obtenez une démonstration personnalisée de Nova en moins de 48h.'
                : 'Reach out and get a personalized Nova demo in less than 48 hours.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a href={`mailto:${CONTACT.email}`}
                whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-[#9AAEFF] text-[#1A1F2E] font-light text-sm tracking-wide rounded-xl"
                style={{ boxShadow: '0 0 40px rgba(154,174,255,0.2)' }}>
                <FiMail size={14} />
                {language === 'fr' ? 'Écrire un email' : 'Send an email'}
              </motion.a>
              <motion.a href={`tel:${CONTACT.phone}`}
                whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-3 px-8 py-4 border border-[#9AAEFF]/25 text-[#9AAEFF] font-light text-sm tracking-wide rounded-xl hover:bg-[#9AAEFF]/8 transition-all duration-300">
                <FiPhone size={14} />
                {language === 'fr' ? 'Appeler directement' : 'Call directly'}
              </motion.a>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
};

export default ContactSection;