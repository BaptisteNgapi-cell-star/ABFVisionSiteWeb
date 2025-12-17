// components/AboutSection.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  FiLinkedin, FiGithub, FiMail, FiExternalLink, 
  FiUsers, FiEye, FiTarget, FiCode, FiLayout,
  FiServer, FiZap
} from 'react-icons/fi';

// Traductions pour la section À Propos
const aboutTranslations = {
  fr: {
    title: "À Propos de Nous",
    subtitle: "Notre Vision, Notre Équipe",
    story: {
      title: "La folle histoire derrière ABFVision",
      content: "ABFVision, c'est bien plus qu'un simple nom ! C'est l'histoire de trois passionnés qui couraient les écoles pour comprendre les besoins éducatifs... et qui ont eu une illumination en chemin !"
    },
    nameExplanation: {
      title: "Mais que signifie ABFVision ?",
      abf: {
        title: "ABF = Awa, Baptiste, Fred",
        content: "Les trois compères à l'origine de cette aventure ! Chacun avec ses super-pouvoirs :"
      },
      vision: {
        title: "VISION = Notre focalisation commune",
        content: "Comme des super-héros qui alignent leurs visions laser vers un seul objectif !"
      }
    },
    team: {
      title: "Notre Équipe",
      subtitle: "Des passionnés d'innovation éducative"
    },
    blueNumeric: {
      title: "Membre de Blue Numeric",
      content: "Nous sommes fiers de faire partie de Blue Numeric, une startup innovante spécialisée dans les solutions numériques avancées.",
      visit: "Visiter Blue Numeric"
    }
  },
  en: {
    title: "About Us",
    subtitle: "Our Vision, Our Team",
    story: {
      title: "The crazy story behind ABFVision",
      content: "ABFVision is much more than just a name! It's the story of three enthusiasts running around schools to understand educational needs... who had an epiphany along the way!"
    },
    nameExplanation: {
      title: "But what does ABFVision mean?",
      abf: {
        title: "ABF = Awa, Baptiste, Fred",
        content: "The three buddies behind this adventure! Each with their superpowers:"
      },
      vision: {
        title: "VISION = Our common focus",
        content: "Like superheroes aligning their laser visions towards a single goal!"
      }
    },
    team: {
      title: "Our Team",
      subtitle: "Passionate about educational innovation"
    },
    blueNumeric: {
      title: "Member of Blue Numeric",
      content: "We are proud to be part of Blue Numeric, an innovative startup specializing in advanced digital solutions.",
      visit: "Visit Blue Numeric"
    }
  }
};

// Données de l'équipe avec descriptions amusantes
const teamMembers = [
  {
    name: "Baptiste Ngapi",
    role: {
      fr: "Co-fondateur & Développeur Full-Stack",
      en: "Co-founder & Full-Stack Developer"
    },
    description: {
      fr: "Notre génie du code qui transforme le café en lignes de code impeccables ! Baptiste donne vie à nos idées les plus folles avec une élégance technique remarquable.",
      en: "Our code genius who turns coffee into flawless lines of code! Baptiste brings our craziest ideas to life with remarkable technical elegance."
    },
    image: "/images/baptiste.jpg",
    linkedin: "#",
    github: "#",
    email: "baptiste@abfvision.com",
    specialties: ["React", "Node.js", "AI Integration", "Architecture"],
    funFact: {
      fr: "Peut coder en dormant (on suspecte des super-pouvoirs)",
      en: "Can code while sleeping (we suspect superpowers)"
    },
    icon: FiCode,
    color: "from-blue-500 to-cyan-400",
    gradient: "from-[#3B82F6] to-[#06B6D4]"
  },
  {
    name: "Miekountou Belssaja Awa",
    role: {
      fr: "Co-fondatrice & Designer UX/UI",
      en: "Co-founder & UX/UI Designer"
    },
    description: {
      fr: "Notre magicienne des interfaces ! Awa transforme les besoins complexes en designs si intuitifs qu'ils semblent lire dans vos pensées.",
      en: "Our interface magician! Awa transforms complex needs into designs so intuitive they seem to read your mind."
    },
    image: "/images/awa.jpg",
    linkedin: "#",
    github: "#",
    email: "awa@abfvision.com",
    specialties: ["UI/UX Design", "Figma", "User Research", "Prototypage"],
    funFact: {
      fr: "Son design est si bon qu'il devance vos besoins",
      en: "Her design is so good it anticipates your needs"
    },
    icon: FiLayout,
    color: "from-purple-500 to-pink-400",
    gradient: "from-[#8B5CF6] to-[#EC4899]"
  },
  {
    name: "KONGA-NZINGA Fredman Mutch",
    role: {
      fr: "Co-fondateur & Expert en Réseaux et Télécommunications",
      en: "Co-founder & Network and Telecommunications Expert"
    },
    description: {
      fr: "Notre architecte des réseaux ! Fred construit des infrastructures si solides qu'elles pourraient supporter un éléphant qui danse.",
      en: "Our network architect! Fred builds infrastructures so solid they could support a dancing elephant."
    },
    image: "/images/fred.jpg",
    linkedin: "#",
    github: "#",
    email: "fred@abfvision.com",
    specialties: ["Networking", "Security", "Cloud Infrastructure", "DevOps"],
    funFact: {
      fr: "Réseaux si rapides qu'il voyage dans le temps (presque)",
      en: "Networks so fast he time travels (almost)"
    },
    icon: FiServer,
    color: "from-green-500 to-emerald-400",
    gradient: "from-[#10B981] to-[#059669]"
  }
];

// Composant Typing Animation optimisé
const TypingText: React.FC<{ 
  text: string; 
  speed?: number;
  className?: string;
  delay?: number;
}> = ({ text, speed = 30, className, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) {
      const startTimer = setTimeout(() => {
        setHasStarted(true);
      }, delay);
      return () => clearTimeout(startTimer);
    }

    if (hasStarted && currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, speed, hasStarted, delay]);

  return (
    <span className={className}>
      {displayedText}
      {currentIndex < text.length && (
        <span className="ml-0.5 opacity-70 animate-pulse">|</span>
      )}
    </span>
  );
};

// Composant Team Member optimisé avec version amusante
const TeamMemberCard: React.FC<{
  member: typeof teamMembers[0];
  language: 'fr' | 'en';
  index: number;
}> = ({ member, language, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-[#1E2430] rounded-2xl p-6 border border-[#9AAEFF]/20 hover:border-[#9AAEFF]/40 transition-all duration-300 h-full hover:transform hover:scale-[1.02]"
    >
      {/* Avatar avec effet spécial */}
      <div className="flex items-center gap-4 mb-4">
        <motion.div 
          className={`w-16 h-16 bg-gradient-to-br ${member.gradient} rounded-2xl flex items-center justify-center shadow-lg shrink-0 group-hover:shadow-[#9AAEFF]/40 transition-all`}
          whileHover={{ scale: 1.05, rotate: 2 }}
        >
          <div className="w-14 h-14 bg-[#1E2430] rounded-xl flex items-center justify-center text-white font-light text-lg">
            <member.icon className="text-[#9AAEFF] text-xl" />
          </div>
        </motion.div>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-light text-white truncate">
            {member.name}
          </h3>
          <p className="text-[#9AAEFF] text-sm font-light">
            {member.role[language]}
          </p>
        </div>
      </div>

      {/* Description avec typing */}
      <div className="mb-4 min-h-[80px]">
        <p className="text-[#98A2B3] text-sm leading-relaxed">
          {isInView ? (
            <TypingText 
              text={member.description[language]} 
              speed={20}
              delay={index * 200}
            />
          ) : (
            member.description[language]
          )}
        </p>
      </div>

      {/* Fun Fact */}
      <motion.div 
        className="mb-3 p-3 bg-[#9AAEFF]/5 rounded-lg border border-[#9AAEFF]/10"
        whileHover={{ scale: 1.02 }}
      >
        <p className="text-[#9AAEFF] text-xs italic flex items-center gap-2">
          <FiZap className="text-[#9AAEFF]" size={12} />
          {member.funFact[language]}
        </p>
      </motion.div>

      {/* Spécialités */}
      <div className="flex flex-wrap gap-1 mb-4">
        {member.specialties.map((specialty, specIndex) => (
          <motion.span
            key={specIndex}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: index * 0.1 + specIndex * 0.1 }}
            className="px-2 py-1 bg-[#9AAEFF]/10 border border-[#9AAEFF]/20 text-[#9AAEFF] text-xs rounded-full font-light"
          >
            {specialty}
          </motion.span>
        ))}
      </div>

      {/* Liens sociaux */}
      <div className="flex gap-2">
        {[
          { icon: FiLinkedin, href: member.linkedin },
          { icon: FiGithub, href: member.github },
          { icon: FiMail, href: `mailto:${member.email}` }
        ].map((social, socialIndex) => (
          <motion.a
            key={socialIndex}
            href={social.href}
            className="w-8 h-8 bg-[#1E2430] border border-[#9AAEFF]/20 rounded-lg flex items-center justify-center text-[#9AAEFF] hover:bg-[#9AAEFF]/10 transition-all duration-200"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <social.icon size={14} />
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

// Composant pour le cercle avec les icônes React
const VisionCircle: React.FC<{ language: 'fr' | 'en' }> = () => {
  const circleRef = useRef(null);
  const isInView = useInView(circleRef, { once: true });

  return (
    <motion.div
      ref={circleRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1, delay: 0.5 }}
      className="relative w-full aspect-square max-w-md mx-auto"
    >
      {/* Cercle principal avec effet de profondeur */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#9AAEFF]/10 to-[#7B93FF]/5 rounded-full border border-[#9AAEFF]/20 flex items-center justify-center shadow-2xl">
        
        {/* Point central - la VISION avec animation élégante */}
        <motion.div
          className="relative w-24 h-24 bg-gradient-to-br from-[#9AAEFF] to-[#7B93FF] rounded-full flex items-center justify-center shadow-lg z-10"
          animate={isInView ? { 
            scale: [1, 1.05, 1],
          } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <FiTarget className="text-white text-2xl" />
          
          {/* Effet de halo subtil */}
          <motion.div
            className="absolute -inset-2 bg-[#9AAEFF]/20 rounded-full"
            animate={isInView ? { 
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3]
            } : {}}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>

        {/* Points pour chaque membre de l'équipe avec animations élégantes */}
        {teamMembers.map((member, index) => {
          const angle = (index * 120 * Math.PI) / 180;
          const radius = 140;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);

          return (
            <motion.div
              key={member.name}
              className="absolute"
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={isInView ? { 
                opacity: 1, 
                x: x, 
                y: y,
              } : {}}
              transition={{ 
                duration: 0.8, 
                delay: 0.8 + index * 0.3,
                type: "spring",
                stiffness: 50
              }}
            >
              <motion.div
                className={`w-14 h-14 bg-gradient-to-br ${member.gradient} rounded-2xl flex items-center justify-center shadow-lg border border-white/20 backdrop-blur-sm`}
                whileHover={{ scale: 1.2, rotate: 5 }}
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  y: {
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.5,
                    ease: "easeInOut"
                  }
                }}
              >
                <member.icon className="text-white text-lg" />
              </motion.div>

              {/* Ligne de connexion élégante vers le centre */}
              <svg
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                width={radius}
                height="2"
                style={{
                  transform: `rotate(${angle}rad)`,
                  transformOrigin: 'left center'
                }}
              >
                <motion.line
                  x1="0"
                  y1="1"
                  x2={radius}
                  y2="1"
                  stroke="url(#gradient)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1, delay: 1.2 + index * 0.2 }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#9AAEFF" stopOpacity="0" />
                    <stop offset="50%" stopColor="#9AAEFF" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#9AAEFF" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Nom avec animation d'apparition */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.5 + index * 0.1 }}
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
              >
                <span className="text-white text-sm font-light bg-[#1E2430]/90 px-3 py-1.5 rounded-full border border-[#9AAEFF]/30 backdrop-blur-sm">
                  {member.name.split(' ')[0]}
                </span>
              </motion.div>
            </motion.div>
          );
        })}

        {/* Texte central animé */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
         
        </motion.div>
      </div>
    </motion.div>
  );
};

const AboutSection: React.FC<{ language: 'fr' | 'en' }> = ({ 
  language 
}) => {
  const t = aboutTranslations[language];
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  return (
    <section ref={sectionRef} className="min-h-screen bg-gradient-to-br from-[#1B1F27] via-[#1A1F2E] to-[#1B1F27] py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* En-tête de section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#9AAEFF]/10 border border-[#9AAEFF]/20 rounded-full mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-1.5 h-1.5 bg-[#9AAEFF] rounded-full" />
              <span className="text-[#9AAEFF] text-sm font-light uppercase tracking-widest">
                {language === 'fr' ? 'Notre Histoire' : 'Our Story'}
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-4 min-h-16 flex items-center justify-center">
              {isInView ? (
                <TypingText 
                  text={t.title} 
                  speed={60}
                />
              ) : (
                t.title
              )}
            </h1>

            <p className="text-xl text-[#9AAEFF] font-light max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </motion.div>

          {/* Section Histoire avec le cercle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid lg:grid-cols-2 gap-12 items-center mb-20"
          >
            <div className="space-y-8">
              {/* Histoire */}
              <div className="space-y-4">
                <h2 className="text-3xl font-light text-[#9AAEFF] mb-4">
                  {isInView ? (
                    <TypingText 
                      text={t.story.title} 
                      speed={40}
                      delay={300}
                    />
                  ) : (
                    t.story.title
                  )}
                </h2>
                
                <p className="text-lg text-[#98A2B3] font-light leading-relaxed">
                  {isInView ? (
                    <TypingText 
                      text={t.story.content} 
                      speed={20}
                      delay={600}
                    />
                  ) : (
                    t.story.content
                  )}
                </p>
              </div>

              {/* Explication ABF */}
              <div className="space-y-6">
                <motion.div 
                  className="bg-[#1E2430] rounded-2xl p-6 border border-[#9AAEFF]/20"
                  whileHover={{ y: -2 }}
                >
                  <h3 className="text-2xl font-light text-[#9AAEFF] mb-3 flex items-center gap-3">
                    <FiUsers className="text-[#9AAEFF]" />
                    {t.nameExplanation.abf.title}
                  </h3>
                  <p className="text-[#98A2B3] mb-4">
                    {t.nameExplanation.abf.content}
                  </p>
                  <div className="space-y-2">
                    {teamMembers.map((member) => (
                      <motion.div 
                        key={member.name} 
                        className="flex items-center gap-3 p-2 hover:bg-[#9AAEFF]/5 rounded-lg transition-colors"
                        whileHover={{ x: 4 }}
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-[#9AAEFF] to-[#7B93FF] rounded-lg flex items-center justify-center text-white text-sm">
                          <member.icon size={14} />
                        </div>
                        <div>
                          <span className="text-white font-light">{member.name}</span>
                          <span className="text-[#9AAEFF] text-sm ml-2">- {member.role[language]}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Explication VISION */}
                <motion.div 
                  className="bg-[#1E2430] rounded-2xl p-6 border border-[#9AAEFF]/20"
                  whileHover={{ y: -2 }}
                >
                  <h3 className="text-2xl font-light text-[#9AAEFF] mb-3 flex items-center gap-3">
                    <FiEye className="text-[#9AAEFF]" />
                    {t.nameExplanation.vision.title}
                  </h3>
                  <p className="text-[#98A2B3]">
                    {t.nameExplanation.vision.content}
                  </p>
                  <motion.div 
                    className="mt-4 p-4 bg-[#9AAEFF]/5 rounded-lg border border-[#9AAEFF]/10"
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="text-[#9AAEFF] text-sm italic">
                      {language === 'fr' 
                        ? "Nos regards sont tous braqués vers le même objectif : créer les meilleurs logiciels éducatifs !" 
                        : "Our gazes are all fixed on the same goal: creating the best educational software!"
                      }
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* Cercle de vision */}
            <VisionCircle language={language} />
          </motion.div>

          {/* Section Équipe */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-[#9AAEFF] mb-4">
                {t.team.title}
              </h2>
              <p className="text-lg text-[#98A2B3] font-light">
                {t.team.subtitle}
              </p>
            </div>

            {/* Grid optimisée */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member, index) => (
                <TeamMemberCard
                  key={member.name}
                  member={member}
                  language={language}
                  index={index}
                />
              ))}
            </div>
          </motion.div>

          {/* Section Blue Numeric */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-[#1E2430] rounded-2xl border border-[#9AAEFF]/20 p-8"
          >
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h2 className="text-2xl font-light text-[#9AAEFF]">
                  {t.blueNumeric.title}
                </h2>
                
                <p className="text-[#98A2B3] font-light leading-relaxed">
                  {t.blueNumeric.content}
                </p>
                
                <motion.a
                  href="https://bluenumeric.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#9AAEFF] text-[#1E2430] px-6 py-3 rounded-lg font-light hover:bg-[#9AAEFF]/90 transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t.blueNumeric.visit}
                  <FiExternalLink size={16} />
                </motion.a>
              </div>

              <div className="text-center">
                <motion.div 
                  className="inline-flex items-center gap-4 bg-[#1E2430]/50 rounded-2xl p-6 border border-[#9AAEFF]/20"
                  whileHover={{ y: -2 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#007BFF] to-[#0056B3] rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold">BN</span>
                  </div>
                  <div className="text-left">
                    <h3 className="text-white font-light text-xl">Blue Numeric</h3>
                    <p className="text-[#98A2B3] text-sm font-light">
                      {language === 'fr' ? 'Startup Innovante' : 'Innovative Startup'}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;