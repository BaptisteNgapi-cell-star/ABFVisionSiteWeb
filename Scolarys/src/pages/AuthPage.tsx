import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FiMail, FiLock, FiEye, FiEyeOff, FiUser,
  FiArrowRight, FiCheck, FiPhone,
} from "react-icons/fi";

type Mode = "login" | "register";

function FontLoader() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500&family=IBM+Plex+Sans:wght@300;400;500;600&family=Syne:wght@700;800&display=swap";
    document.head.appendChild(link);
  }, []);
  return null;
}

// ─── FLOATING ORB ─────────────────────────────────────────────────────────────
function Orb({ x, y, size, color, delay }: { x: string; y: string; size: number; color: string; delay: number }) {
  const style: React.CSSProperties = {
    position: "absolute",
    left: x,
    top: y,
    width: size,
    height: size,
    borderRadius: "50%",
    background: `radial-gradient(circle at 40% 40%, ${color}18, ${color}04 60%, transparent)`,
    border: `1px solid ${color}12`,
    pointerEvents: "none",
    animationName: "authOrbFloat",
    animationDuration: `${6 + delay}s`,
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "infinite",
    animationDelay: `${delay}s`,
  };
  return <div style={style} />;
}

// ─── KEYFRAMES injected once via a <style> tag (only animations — not layout/design) ──
const KEYFRAMES = `
  @keyframes authOrbFloat { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-30px) scale(1.04)} }
  @keyframes authPulse     { 0%,100%{opacity:1} 50%{opacity:.3} }
  @keyframes authSpin      { to{transform:rotate(360deg)} }
`;

// ─── INPUT FIELD ──────────────────────────────────────────────────────────────
function Field({
  label, type = "text", placeholder, icon, value, onChange, error,
}: {
  label: string; type?: string; placeholder: string;
  icon: React.ReactNode; value: string;
  onChange: (v: string) => void; error?: string;
}) {
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (show ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="text-[11px] uppercase tracking-[2px] transition-colors duration-200 select-none"
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          color: focused ? "#9AAEFF" : "rgba(255,255,255,0.3)",
        }}
      >
        {label}
      </label>

      <div
        className="relative transition-all duration-200"
        style={{
          background: focused ? "rgba(154,174,255,0.06)" : "rgba(255,255,255,0.03)",
          border: `1px solid ${error
            ? "rgba(248,113,113,0.5)"
            : focused
              ? "rgba(154,174,255,0.4)"
              : "rgba(255,255,255,0.08)"}`,
          borderRadius: 14,
          boxShadow: focused ? "0 0 0 3px rgba(154,174,255,0.08)" : "none",
        }}
      >
        <div
          className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center transition-colors duration-200"
          style={{ color: focused ? "#9AAEFF" : "rgba(255,255,255,0.2)" }}
        >
          {icon}
        </div>

        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent border-none outline-none text-[14px] text-white/90 placeholder-white/15"
          style={{
            padding: "14px 16px 14px 44px",
            paddingRight: isPassword ? 44 : 16,
            fontFamily: "'IBM Plex Sans', sans-serif",
            borderRadius: 14,
            caretColor: "#9AAEFF",
          }}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(s => !s)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center p-1 bg-transparent border-none cursor-pointer transition-colors duration-200 hover:text-white/50"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            {show ? <FiEyeOff size={14} /> : <FiEye size={14} />}
          </button>
        )}
      </div>

      {error && (
        <motion.span
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[11px] text-[#F87171]"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          {error}
        </motion.span>
      )}
    </div>
  );
}

// ─── STRENGTH BAR ─────────────────────────────────────────────────────────────
function StrengthBar({ password }: { password: string }) {
  const score = (() => {
    if (!password) return 0;
    let s = 0;
    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  })();
  const colors = ["transparent", "#F87171", "#F59E0B", "#34D399", "#9AAEFF"];
  const labels = ["", "Faible", "Moyen", "Fort", "Très fort"];
  if (!password) return null;
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map(i => (
          <div
            key={i}
            className="flex-1 h-[3px] rounded-full transition-all duration-300"
            style={{ background: i <= score ? colors[score] : "rgba(255,255,255,0.07)" }}
          />
        ))}
      </div>
      <span
        className="text-[10px] tracking-[1px]"
        style={{ fontFamily: "'IBM Plex Mono', monospace", color: colors[score] }}
      >
        {labels[score]}
      </span>
    </div>
  );
}

// ─── FEATURE CHIP ─────────────────────────────────────────────────────────────
function Chip({ icon, label, color }: { icon: React.ReactNode; label: string; color: string }) {
  return (
    <div
      className="flex items-center gap-2 px-3.5 py-2 rounded-xl"
      style={{ background: `${color}08`, border: `1px solid ${color}20` }}
    >
      <span style={{ color }}>{icon}</span>
      <span className="text-[11px] text-white/50" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
        {label}
      </span>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("login");
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [lEmail, setLEmail] = useState("");
  const [lPass, setLPass] = useState("");
  const [rName, setRName] = useState("");
  const [rPhone, setRPhone] = useState("");
  const [rEmail, setREmail] = useState("");
  const [rPass, setRPass] = useState("");
  const [rPass2, setRPass2] = useState("");
  const [agree, setAgree] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  useEffect(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t); }, []);

  function switchMode(m: Mode) {
    setMode(m); setErrors({}); setSuccess(false); setLoading(false);
  }

  function validate() {
    const e: Record<string, string> = {};
    if (mode === "login") {
      if (!lEmail) e.lEmail = "Email requis";
      if (!lPass) e.lPass = "Mot de passe requis";
    } else {
      if (!rName) e.rName = "Nom requis";
      if (!rEmail) e.rEmail = "Email requis";
      if (rPass.length < 8) e.rPass = "8 caractères minimum";
      if (rPass !== rPass2) e.rPass2 = "Les mots de passe ne correspondent pas";
      if (!agree) e.agree = "Veuillez accepter les conditions";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => navigate("/accueil"), 2600);
    }, 1400);
  }

  const panelVariants = {
    initial: { opacity: 0, x: mode === "login" ? -24 : 24, scale: 0.98 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: mode === "login" ? 24 : -24, scale: 0.98 },
  };

  return (
    <>
      <FontLoader />
      <style>{KEYFRAMES}</style>

      {/* ROOT */}
      <div
        className="w-full min-h-screen overflow-x-hidden antialiased transition-opacity duration-500"
        style={{
          background: "#0d1018",
          color: "#e6edf3",
          fontFamily: "'IBM Plex Sans', sans-serif",
          opacity: mounted ? 1 : 0,
        }}
      >
        {/* ── BACKGROUND ── */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Gradient mesh */}
          <div
            className="absolute inset-0"
            style={{
              background: [
                "radial-gradient(ellipse 80% 60% at 20% 10%, rgba(154,174,255,0.12) 0%, transparent 60%)",
                "radial-gradient(ellipse 60% 50% at 80% 90%, rgba(52,211,153,0.10) 0%, transparent 55%)",
                "radial-gradient(ellipse 40% 40% at 50% 50%, rgba(192,132,252,0.05) 0%, transparent 60%)",
              ].join(", "),
            }}
          />
          {/* Grid */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: [
                "linear-gradient(rgba(154,174,255,0.04) 1px, transparent 1px)",
                "linear-gradient(90deg, rgba(154,174,255,0.04) 1px, transparent 1px)",
              ].join(", "),
              backgroundSize: "56px 56px",
            }}
          />
          <Orb x="-80px" y="10%" size={400} color="#9AAEFF" delay={0} />
          <Orb x="60%" y="-60px" size={320} color="#34D399" delay={1.5} />
          <Orb x="80%" y="70%" size={280} color="#C084FC" delay={3} />
          <Orb x="20%" y="75%" size={240} color="#9AAEFF" delay={2} />
        </div>

        {/* ── LAYOUT ── */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-screen">

          {/* ── LEFT PANEL ── */}
          <div
            className="hidden lg:flex flex-col justify-center px-14 py-[60px] relative overflow-hidden"
            style={{ borderRight: "1px solid transparent" }}
          >
            {/* Separator line */}
            <div
              className="absolute top-0 right-0 bottom-0 w-px"
              style={{
                background: "linear-gradient(to bottom, transparent, rgba(154,174,255,0.15) 30%, rgba(154,174,255,0.15) 70%, transparent)",
              }}
            />

            {/* Logo */}
            <div className="flex items-center gap-3 mb-14">
              <div
                className="w-[42px] h-[42px] flex items-center justify-center"
                style={{
                  borderRadius: 12,
                  background: "rgba(154,174,255,0.08)",
                  border: "1px solid rgba(154,174,255,0.2)",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L3 7v10l9 5 9-5V7L12 2z" stroke="#9AAEFF" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M12 2v20M3 7l9 5 9-5" stroke="#9AAEFF" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <div
                  className="text-[20px] font-extrabold text-white tracking-[-0.5px] leading-none"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Nova
                </div>
                <div
                  className="text-[9px] tracking-[2px] uppercase mt-0.5"
                  style={{ fontFamily: "'IBM Plex Mono', monospace", color: "rgba(154,174,255,0.5)" }}
                >
                  by Scolarys
                </div>
              </div>
            </div>

            {/* Headline */}
            <div className="mb-8">
              <div
                className="flex items-center gap-2 mb-5 text-[#9AAEFF] text-[10px] tracking-[3px] uppercase"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                {/* Pulsing dot — inline style for animation */}
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full bg-[#9AAEFF]"
                  style={{
                    boxShadow: "0 0 8px #9AAEFF",
                    animationName: "authPulse",
                    animationDuration: "2s",
                    animationTimingFunction: "ease-in-out",
                    animationIterationCount: "infinite",
                  }}
                />
                Plateforme éducative
              </div>

              <h1
                className="text-white leading-none mb-[18px]"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "clamp(42px, 4.5vw, 64px)",
                  fontWeight: 800,
                  letterSpacing: "-3px",
                }}
              >
                L'école<br />
                <span className="text-[#9AAEFF]">réinventée.</span>
              </h1>

              <p
                className="text-[14px] text-white/35 font-light leading-[1.75] max-w-[380px]"
                style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
              >
                Gérez vos établissements, suivez vos élèves et accédez aux meilleurs enseignants du Congo depuis une seule plateforme.
              </p>
            </div>

            {/* Feature chips */}
            <div className="flex flex-col gap-2 mb-9">
              <Chip icon={<FiCheck size={12} />} label="Scolarys — Gestion scolaire complète" color="#9AAEFF" />
              <Chip icon={<FiCheck size={12} />} label="ProfConnect — Meilleurs profs du Congo" color="#34D399" />
              <Chip icon={<FiCheck size={12} />} label="Tableau de bord financier temps réel" color="#C084FC" />
            </div>

            {/* Stats */}
            <div
              className="flex overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16 }}
            >
              {[
                { v: "120+", l: "Établissements" },
                { v: "4 800+", l: "Élèves suivis" },
                { v: "98%", l: "Satisfaction" },
              ].map((s, i, arr) => (
                <div
                  key={i}
                  className="flex-1 py-4 px-5 text-center"
                  style={{ borderRight: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}
                >
                  <div
                    className="text-[22px] font-extrabold text-[#9AAEFF] tracking-[-1px] mb-[3px]"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {s.v}
                  </div>
                  <div
                    className="text-[9px] uppercase tracking-[1.5px] text-white/20"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    {s.l}
                  </div>
                </div>
              ))}
            </div>

            {/* Phantom text */}
            <div
              className="absolute -bottom-10 -left-5 pointer-events-none select-none whitespace-nowrap"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 180,
                fontWeight: 800,
                color: "rgba(154,174,255,0.025)",
                letterSpacing: "-8px",
              }}
            >
              NOVA
            </div>
          </div>

          {/* ── RIGHT PANEL ── */}
          <div className="flex flex-col items-center justify-center px-6 lg:px-12 py-[60px] min-h-screen">
            {/* Card */}
            <div
              className="w-full relative overflow-hidden"
              style={{
                maxWidth: 440,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 24,
                padding: "36px 36px 32px",
                backdropFilter: "blur(20px)",
                boxShadow: "0 32px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              {/* Top glow bar */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 transition-all duration-500"
                style={{
                  borderRadius: "20px 20px 0 0",
                  background: mode === "login"
                    ? "linear-gradient(90deg, #9AAEFF, #C084FC, transparent)"
                    : "linear-gradient(90deg, #34D399, #9AAEFF, transparent)",
                }}
              />

              {/* Corner glow */}
              <div
                className="absolute -top-[60px] -right-[60px] w-[200px] h-[200px] rounded-full pointer-events-none transition-all duration-500"
                style={{
                  background: mode === "login"
                    ? "radial-gradient(circle, rgba(154,174,255,0.1), transparent)"
                    : "radial-gradient(circle, rgba(52,211,153,0.1), transparent)",
                }}
              />

              {/* ── MODE TOGGLE ── */}
              <div className="mb-7">
                <div
                  className="grid grid-cols-2 relative p-1"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 14,
                  }}
                >
                  <motion.div
                    className="absolute top-1 left-1 pointer-events-none"
                    animate={{ x: mode === "login" ? 0 : "100%" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    style={{
                      width: "calc(50% - 4px)",
                      height: "calc(100% - 8px)",
                      background: "linear-gradient(135deg, rgba(154,174,255,0.15), rgba(192,132,252,0.15))",
                      border: "1px solid rgba(154,174,255,0.25)",
                      borderRadius: 10,
                    }}
                  />
                  {(["login", "register"] as Mode[]).map(m => (
                    <button
                      key={m}
                      onClick={() => switchMode(m)}
                      className="relative z-10 py-[9px] px-4 text-[12px] font-medium tracking-[0.3px] transition-colors duration-200 cursor-pointer border-none bg-transparent"
                      style={{
                        fontFamily: "'IBM Plex Sans', sans-serif",
                        borderRadius: 10,
                        color: mode === m ? "#fff" : "rgba(255,255,255,0.3)",
                      }}
                    >
                      {m === "login" ? "Connexion" : "Inscription"}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── FORM AREA ── */}
              <AnimatePresence mode="wait">
                {!success ? (
                  <motion.div
                    key={mode}
                    variants={panelVariants}
                    initial="initial" animate="animate" exit="exit"
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col gap-5"
                  >
                    {/* Title */}
                    <div className="mb-1">
                      <h2
                        className="text-[26px] font-extrabold tracking-[-1px] text-white mb-1.5"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                      >
                        {mode === "login" ? "Bon retour 👋" : "Créer un compte"}
                      </h2>
                      <p
                        className="text-[13px] text-white/35 m-0"
                        style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                      >
                        {mode === "login"
                          ? "Connectez-vous à votre espace Nova"
                          : "Rejoignez la communauté Scolarys"}
                      </p>
                    </div>

                    {/* ── LOGIN FIELDS ── */}
                    {mode === "login" ? (
                      <>
                        <Field label="Adresse email" type="email" placeholder="vous@etablissement.cg"
                          icon={<FiMail size={14} />} value={lEmail} onChange={setLEmail} error={errors.lEmail} />
                        <Field label="Mot de passe" type="password" placeholder="••••••••••"
                          icon={<FiLock size={14} />} value={lPass} onChange={setLPass} error={errors.lPass} />
                        <div className="text-right -mt-2">
                          <a
                            href="#"
                            className="text-[11px] text-[#9AAEFF] no-underline tracking-[1px] hover:underline"
                            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                          >
                            Mot de passe oublié ?
                          </a>
                        </div>
                      </>
                    ) : (
                      /* ── REGISTER FIELDS ── */
                      <>
                        <Field label="Nom complet" placeholder="Prénom Nom"
                          icon={<FiUser size={14} />} value={rName} onChange={setRName} error={errors.rName} />
                        <Field label="Téléphone" type="tel" placeholder="+242 06 000 0000"
                          icon={<FiPhone size={14} />} value={rPhone} onChange={setRPhone} />
                        <Field label="Adresse email" type="email" placeholder="vous@etablissement.cg"
                          icon={<FiMail size={14} />} value={rEmail} onChange={setREmail} error={errors.rEmail} />

                        <div className="flex flex-col gap-2.5">
                          <Field label="Mot de passe" type="password" placeholder="Min. 8 caractères"
                            icon={<FiLock size={14} />} value={rPass} onChange={setRPass} error={errors.rPass} />
                          <StrengthBar password={rPass} />
                        </div>

                        <Field label="Confirmer le mot de passe" type="password" placeholder="••••••••••"
                          icon={<FiLock size={14} />} value={rPass2} onChange={setRPass2} error={errors.rPass2} />

                        {/* CGU */}
                        <div className="flex flex-col gap-1">
                          <label
                            className="flex items-start gap-2.5 cursor-pointer"
                            onClick={() => setAgree(a => !a)}
                          >
                            <div
                              className="shrink-0 mt-px w-[18px] h-[18px] flex items-center justify-center transition-all duration-150"
                              style={{
                                borderRadius: 6,
                                background: agree ? "#9AAEFF" : "transparent",
                                border: `1.5px solid ${agree ? "#9AAEFF" : "rgba(255,255,255,0.15)"}`,
                              }}
                            >
                              {agree && <FiCheck size={11} color="#0d1117" />}
                            </div>
                            <span
                              className="text-[12px] text-white/40 leading-[1.6]"
                              style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                            >
                              J'accepte les{" "}
                              <a href="#" className="text-[#9AAEFF] no-underline hover:underline">conditions d'utilisation</a>
                              {" "}et la{" "}
                              <a href="#" className="text-[#9AAEFF] no-underline hover:underline">politique de confidentialité</a>
                            </span>
                          </label>
                          {errors.agree && (
                            <span
                              className="text-[11px] text-[#F87171] pl-7"
                              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                            >
                              {errors.agree}
                            </span>
                          )}
                        </div>
                      </>
                    )}

                    {/* ── SUBMIT ── */}
                    <motion.button
                      onClick={handleSubmit}
                      disabled={loading}
                      whileHover={loading ? {} : { scale: 1.02, y: -1 }}
                      whileTap={loading ? {} : { scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2.5 py-[15px] border-none cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed transition-shadow duration-200"
                      style={{
                        borderRadius: 14,
                        fontFamily: "'Syne', sans-serif",
                        fontSize: 15,
                        fontWeight: 700,
                        color: "#0d1018",
                        letterSpacing: "-0.3px",
                        background: mode === "login"
                          ? "linear-gradient(135deg, #9AAEFF, #C084FC)"
                          : "linear-gradient(135deg, #34D399, #9AAEFF)",
                        boxShadow: "0 8px 32px rgba(154,174,255,0.25)",
                      }}
                    >
                      {loading ? (
                        /* Spinner — inline animation style */
                        <span
                          className="inline-block w-[18px] h-[18px] rounded-full"
                          style={{
                            border: "2px solid rgba(13,16,24,0.3)",
                            borderTopColor: "#0d1018",
                            animationName: "authSpin",
                            animationDuration: "0.7s",
                            animationTimingFunction: "linear",
                            animationIterationCount: "infinite",
                          }}
                        />
                      ) : (
                        <>
                          <span>{mode === "login" ? "Se connecter" : "Créer mon compte"}</span>
                          <FiArrowRight size={16} />
                        </>
                      )}
                    </motion.button>

                    {/* Divider */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
                      <span
                        className="text-[10px] text-white/20 tracking-[2px]"
                        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                      >
                        OU
                      </span>
                      <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
                    </div>

                    {/* Switch mode */}
                    <p
                      className="text-center text-[12px] text-white/30 m-0"
                      style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                    >
                      {mode === "login" ? "Pas encore de compte ? " : "Déjà inscrit ? "}
                      <button
                        onClick={() => switchMode(mode === "login" ? "register" : "login")}
                        className="bg-transparent border-none cursor-pointer text-[#9AAEFF] text-[12px] font-medium p-0 underline underline-offset-[3px] hover:text-[#b8c8ff] transition-colors duration-200"
                        style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                      >
                        {mode === "login" ? "Créer un compte" : "Me connecter"}
                      </button>
                    </p>
                  </motion.div>
                ) : (
                  /* ── SUCCESS STATE ── */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center gap-5 py-5 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 20 }}
                      className="w-[72px] h-[72px] rounded-full flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg, rgba(52,211,153,0.2), rgba(154,174,255,0.2))",
                        border: "1.5px solid rgba(52,211,153,0.4)",
                      }}
                    >
                      <FiCheck size={28} color="#34D399" />
                    </motion.div>

                    <div>
                      <h3
                        className="text-[22px] font-extrabold text-white mb-2 tracking-[-0.5px]"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                      >
                        {mode === "login" ? "Connexion réussie !" : "Compte créé !"}
                      </h3>
                      <p
                        className="text-[13px] text-white/35 m-0"
                        style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                      >
                        {mode === "login"
                          ? "Redirection vers votre tableau de bord Nova…"
                          : "Bienvenue ! Redirection en cours…"}
                      </p>
                    </div>

                    {/* Progress bar */}
                    <div
                      className="w-full h-0.5 rounded-full overflow-hidden"
                      style={{ background: "rgba(255,255,255,0.07)" }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2.5, ease: "linear" }}
                        className="h-full rounded-full"
                        style={{ background: "linear-gradient(90deg, #34D399, #9AAEFF)" }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <p
              className="text-center text-[10px] text-white/15 tracking-[1px] mt-6"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              © 2026 Scolarys · Nova Platform · Brazzaville, Congo
            </p>
          </div>
        </div>
      </div>
    </>
  );
}