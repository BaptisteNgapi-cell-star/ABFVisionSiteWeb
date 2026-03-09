// pages/Homepage.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AboutSection from '../components/Apropos';
import StoreSection from '../components/Store';
import ContactSection from '../components/Contact';
import SolutionsSection from '../components/SolutionsSection';
import { 
  FiMenu, FiX, FiArrowRight, FiMail, FiGlobe, FiDownload,
  FiBook, FiCode, FiStar, FiUser, FiMessageCircle,
  FiPlus, FiLogIn, FiLogOut, FiUserPlus, FiEdit3, FiHeart
} from 'react-icons/fi';

// Traductions
const translations = {
  fr: {
    nav: {
      accueil: 'Accueil',
      apropos: 'À Propos',
      solutions: 'Nos Solutions',
      logiciels: 'Notre Store',
      documentation: 'Documentation',
      contact: 'Contact'
    },
    hero: {
      title: "Nova",
      subtitle: "Plateforme de Gestion Scolaire Intelligente",
      description: "Découvrez notre suite complète de solutions logicielles conçues pour révolutionner la gestion des établissements éducatifs. Performance, innovation et simplicité.",
      buttons: {
        solutions: "Découvrir notre store",
        contact: "Demander une démo"
      }
    },
    testimonials: {
      title: "Ce que disent nos utilisateurs",
      subtitle: "Rejoignez les établissements qui nous font confiance",
      rating: "sur 10",
      seeMore: "Voir plus de témoignages",
      addComment: "Partager mon expérience",
      myComments: "Mes avis",
      noComments: "Vous n'avez pas encore partagé votre expérience",
      loginToComment: "Connectez-vous pour partager votre avis",
      commentCount: "commentaire",
      commentCount_plural: "commentaires"
    },
    auth: {
      login: "Se connecter",
      logout: "Se déconnecter",
      register: "S'inscrire",
      profile: "Mon profil",
      welcome: "Bonjour",
      guest: "Invité"
    },
    commentModal: {
      title: "Partagez votre expérience",
      subtitle: "Votre avis nous intéresse !",
      name: "Votre nom",
      role: "Votre rôle",
      comment: "Votre commentaire",
      rating: "Note (sur 10)",
      submit: "Publier le commentaire",
      submitting: "Publication en cours...",
      success: "Commentaire publié avec succès !"
    },
    loading: "Chargement..."
  },
  en: {
    nav: {
      accueil: 'Home',
      apropos: 'About Us',
      solutions: 'Our Solutions',
      logiciels: 'Our Store',
      documentation: 'Documentation',
      contact: 'Contact'
    },
    hero: {
      title: "Nova",
      subtitle: "Smart School Management Platform",
      description: "Discover our complete suite of software solutions designed to revolutionize educational institution management. Performance, innovation and simplicity.",
      buttons: {
        solutions: "Discover our store",
        contact: "Request a demo"
      }
    },
    testimonials: {
      title: "What our users say",
      subtitle: "Join the institutions that trust us",
      rating: "out of 10",
      seeMore: "See more testimonials",
      addComment: "Share my experience",
      myComments: "My reviews",
      noComments: "You haven't shared your experience yet",
      loginToComment: "Log in to share your opinion",
      commentCount: "comment",
      commentCount_plural: "comments"
    },
    auth: {
      login: "Login",
      logout: "Logout",
      register: "Register",
      profile: "My profile",
      welcome: "Hello",
      guest: "Guest"
    },
    commentModal: {
      title: "Share your experience",
      subtitle: "We value your opinion!",
      name: "Your name",
      role: "Your role",
      comment: "Your comment",
      rating: "Rating (out of 10)",
      submit: "Publish comment",
      submitting: "Publishing...",
      success: "Comment published successfully!"
    },
    loading: "Loading..."
  }
};

// Types
interface User {
  id: string;
  name: string;
  email: string;
  isLoggedIn: boolean;
}

interface BaseTestimonial {
  id: number | string;
  name: string;
  rating: number;
  avatar: string;
}

interface InitialTestimonial extends BaseTestimonial {
  role: {
    fr: string;
    en: string;
  };
  comment: {
    fr: string;
    en: string;
  };
}

interface UserComment extends BaseTestimonial {
  role: string;
  comment: string;
  userId: string;
  date: string;
  language: 'fr' | 'en';
}

type Testimonial = InitialTestimonial | UserComment;

// Données des témoignages initiaux
const initialTestimonialsData: InitialTestimonial[] = [
  {
    id: 1,
    name: "Marie Dubois",
    role: {
      fr: "Directrice d'école primaire",
      en: "Primary School Director"
    },
    comment: {
      fr: "La plateforme a transformé notre façon de gérer l'établissement. L'interface est intuitive et le gain de temps considérable !",
      en: "The platform transformed how we manage our institution. The interface is intuitive and the time savings are considerable!"
    },
    rating: 9,
    avatar: "/images/avatars/1.jpg"
  },
  {
    id: 2,
    name: "Pierre Martin",
    role: {
      fr: "Parent d'élève",
      en: "Student Parent"
    },
    comment: {
      fr: "L'application mobile est exceptionnelle. Je peux suivre la scolarité de mes enfants en temps réel.",
      en: "The mobile app is exceptional. I can monitor my children's schooling in real time."
    },
    rating: 10,
    avatar: "/images/avatars/2.jpg"
  },
  {
    id: 3,
    name: "Sophie Lambert",
    role: {
      fr: "Enseignante",
      en: "Teacher"
    },
    comment: {
      fr: "La gestion des emplois du temps et des notes est tellement simplifiée. Un vrai gain de productivité.",
      en: "Managing schedules and grades is so simplified. A real productivity gain."
    },
    rating: 8,
    avatar: "/images/avatars/3.jpg"
  },
  {
    id: 4,
    name: "Thomas Leroy",
    role: {
      fr: "Proviseur de lycée",
      en: "High School Principal"
    },
    comment: {
      fr: "La plateforme a considérablement amélioré notre communication interne et avec les parents.",
      en: "The platform has significantly improved our internal communication and with parents."
    },
    rating: 9,
    avatar: "/images/avatars/4.jpg"
  }
];

// Composant Étoiles de notation
const StarRating: React.FC<{ 
  rating: number; 
  size?: number;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}> = ({ 
  rating, 
  size = 20,
  interactive = false,
  onRatingChange 
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (starValue: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(starValue);
    }
  };

  const displayRating = hoverRating || rating;

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => {
        const starValue = (i + 1) * 2;
        const isFull = starValue <= displayRating;

        return (
          <motion.button
            key={i}
            type="button"
            whileHover={interactive ? { scale: 1.2 } : {}}
            whileTap={interactive ? { scale: 0.9 } : {}}
            onClick={() => handleStarClick(starValue)}
            onMouseEnter={() => interactive && setHoverRating(starValue)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            className={interactive ? 'cursor-pointer' : 'cursor-default'}
            disabled={!interactive}
          >
            <FiStar 
              className={isFull ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} 
              size={size} 
            />
          </motion.button>
        );
      })}
      
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-white font-light ml-2 text-sm"
      >
        {rating}/10
      </motion.span>
    </div>
  );
};

// Fonction pour obtenir le texte du rôle selon la langue
const getRoleText = (testimonial: Testimonial, language: 'fr' | 'en'): string => {
  if ('role' in testimonial && typeof testimonial.role === 'object') {
    return testimonial.role[language];
  }
  return (testimonial as UserComment).role;
};

// Fonction pour obtenir le texte du commentaire selon la langue
const getCommentText = (testimonial: Testimonial, language: 'fr' | 'en'): string => {
  if ('comment' in testimonial && typeof testimonial.comment === 'object') {
    return testimonial.comment[language];
  }
  return (testimonial as UserComment).comment;
};

// Composant Témoignage
const TestimonialCard: React.FC<{ 
  testimonial: Testimonial; 
  language: 'fr' | 'en';
  isActive?: boolean;
}> = ({ testimonial, language, isActive = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className={`bg-[#1E2430]/80 rounded-2xl border border-[#9AAEFF]/20 p-6 backdrop-blur-sm transition-all duration-500 ${
        isActive ? 'scale-105 shadow-lg shadow-[#9AAEFF]/10' : 'scale-95'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-[#9AAEFF] to-[#7B93FF] rounded-full flex items-center justify-center shadow-lg">
              <FiUser className="w-6 h-6 text-[#1E2430]" />
            </div>
            <div className="absolute -inset-1 bg-[#9AAEFF]/20 rounded-full blur-sm" />
          </div>
          <div>
            <h4 className="text-white font-light text-lg">{testimonial.name}</h4>
            <p className="text-[#9AAEFF] text-sm font-light">
              {getRoleText(testimonial, language)}
            </p>
          </div>
        </div>
        
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-[#9AAEFF]/50"
        >
          <FiMessageCircle size={24} />
        </motion.div>
      </div>

      <div className="mb-4">
        <StarRating rating={testimonial.rating} />
      </div>

      <p className="text-[#98A2B3] font-light leading-relaxed text-sm">
        "{getCommentText(testimonial, language)}"
      </p>

      {'date' in testimonial && testimonial.date && (
        <p className="text-[#98A2B3]/50 text-xs font-light mt-3">
          {new Date(testimonial.date).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')}
        </p>
      )}
    </motion.div>
  );
};

// Composant Modal d'Ajout de Commentaire
const CommentModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (comment: Omit<UserComment, 'id' | 'userId' | 'date' | 'avatar'>) => void;
  language: 'fr' | 'en';
  isSubmitting: boolean;
}> = ({ isOpen, onClose, onSubmit, language, isSubmitting }) => {
  const t = translations[language].commentModal;
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    comment: '',
    rating: 8
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      language
    });
  };

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-[#1E2430] rounded-2xl border border-[#9AAEFF]/20 p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-light text-white">{t.title}</h3>
                <p className="text-[#9AAEFF] text-sm font-light mt-1">{t.subtitle}</p>
              </div>
              <button
                onClick={onClose}
                className="text-[#98A2B3] hover:text-white transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[#9AAEFF] font-light text-sm">
                  {t.name} *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="w-full bg-[#2A3040] border border-[#9AAEFF]/20 rounded-lg px-4 py-3 text-white font-light placeholder-[#98A2B3]/50 focus:border-[#9AAEFF] focus:outline-none transition-all duration-300"
                  placeholder={t.name}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[#9AAEFF] font-light text-sm">
                  {t.role} *
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                  required
                  className="w-full bg-[#2A3040] border border-[#9AAEFF]/20 rounded-lg px-4 py-3 text-white font-light placeholder-[#98A2B3]/50 focus:border-[#9AAEFF] focus:outline-none transition-all duration-300"
                  placeholder={language === 'fr' ? 'Ex: Directeur d\'école' : 'Ex: School Director'}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[#9AAEFF] font-light text-sm">
                  {t.rating} *
                </label>
                <StarRating 
                  rating={formData.rating} 
                  interactive={true}
                  onRatingChange={handleRatingChange}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[#9AAEFF] font-light text-sm">
                  {t.comment} *
                </label>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                  required
                  rows={4}
                  className="w-full bg-[#2A3040] border border-[#9AAEFF]/20 rounded-lg px-4 py-3 text-white font-light placeholder-[#98A2B3]/50 focus:border-[#9AAEFF] focus:outline-none transition-all duration-300 resize-none"
                  placeholder={t.comment}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <motion.button
                  type="button"
                  onClick={onClose}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 border border-[#9AAEFF]/20 text-[#9AAEFF] py-3 rounded-lg font-light transition-all duration-300"
                >
                  {language === 'fr' ? 'Annuler' : 'Cancel'}
                </motion.button>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="flex-1 bg-[#9AAEFF] text-[#1E2430] py-3 rounded-lg font-light flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-[#1E2430] border-t-transparent rounded-full"
                      />
                      {t.submitting}
                    </>
                  ) : (
                    <>
                      <FiEdit3 size={16} />
                      {t.submit}
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Loader
const LoadingSpinner: React.FC<{ text: string }> = ({ text }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-gradient-to-br from-[#1E2430] via-[#1A1F2E] to-[#1E2430] z-50 flex items-center justify-center"
  >
    <div className="flex flex-col items-center gap-6">
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="w-16 h-16 border-2 border-[#9AAEFF]/30 rounded-full flex items-center justify-center"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-3 h-3 bg-[#9AAEFF] rounded-full"
        />
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-[#9AAEFF]/80 text-sm font-light tracking-widest uppercase"
      >
        {text}
      </motion.p>
    </div>
  </motion.div>
);

// Points scintillants prédéfinis
const sparklePositions = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${(i * 5) % 100}%`,
  top: `${(i * 7) % 100}%`,
  duration: 3 + (i % 3),
  delay: i * 0.2
}));

const Homepage = () => {
  const [activeSection, setActiveSection] = useState<string>('accueil');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [language, setLanguage] = useState<'fr' | 'en'>(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('app-language') as 'fr' | 'en';
      return savedLanguage || 'fr';
    }
    return 'fr';
  });

  const [user, setUser] = useState<User>(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('app-user');
      return savedUser ? JSON.parse(savedUser) : { 
        id: '', 
        name: '', 
        email: '', 
        isLoggedIn: false 
      };
    }
    return { id: '', name: '', email: '', isLoggedIn: false };
  });

  const [userComments, setUserComments] = useState<UserComment[]>(() => {
    if (typeof window !== 'undefined') {
      const savedComments = localStorage.getItem('app-user-comments');
      return savedComments ? JSON.parse(savedComments) : [];
    }
    return [];
  });

  const [allTestimonials, setAllTestimonials] = useState<Testimonial[]>([...initialTestimonialsData]);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isMyCommentsView, setIsMyCommentsView] = useState(false);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const newLanguage = language === 'fr' ? 'en' : 'fr';
    setLanguage(newLanguage);
    if (typeof window !== 'undefined') {
      localStorage.setItem('app-language', newLanguage);
    }
  };

  const handleLogin = () => {
    const newUser: User = {
      id: 'user-' + Date.now(),
      name: 'Utilisateur',
      email: 'user@example.com',
      isLoggedIn: true
    };
    setUser(newUser);
    if (typeof window !== 'undefined') {
      localStorage.setItem('app-user', JSON.stringify(newUser));
    }
    setIsProfileMenuOpen(false);
  };

  const handleLogout = () => {
    const guestUser: User = { id: '', name: '', email: '', isLoggedIn: false };
    setUser(guestUser);
    if (typeof window !== 'undefined') {
      localStorage.setItem('app-user', JSON.stringify(guestUser));
    }
    setIsProfileMenuOpen(false);
    setIsMyCommentsView(false);
  };

  const handleAddComment = async (commentData: Omit<UserComment, 'id' | 'userId' | 'date' | 'avatar'>) => {
    if (!user.isLoggedIn) {
      handleLogin();
      return;
    }

    setIsSubmittingComment(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newComment: UserComment = {
      id: 'comment-' + Date.now(),
      userId: user.id,
      avatar: "/images/avatars/user.jpg",
      ...commentData,
      date: new Date().toISOString()
    };

    const updatedComments = [...userComments, newComment];
    setUserComments(updatedComments);
    setAllTestimonials(prev => [newComment, ...prev]);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('app-user-comments', JSON.stringify(updatedComments));
    }

    setIsSubmittingComment(false);
    setIsCommentModalOpen(false);
  };

  const handleViewMyComments = () => {
    if (!user.isLoggedIn) {
      handleLogin();
      return;
    }
    setIsMyCommentsView(true);
  };

  const sections = [
    { 
      id: 'accueil', 
      name: translations[language].nav.accueil,
      bg: 'bg-gradient-to-br from-[#1E2430] via-[#1A1F2E] to-[#1E2430]',
      accent: '#9AAEFF'
    },
    { 
      id: 'apropos', 
      name: translations[language].nav.apropos,
      bg: 'bg-gradient-to-br from-[#1B1F27] via-[#1A1F2E] to-[#1B1F27]',
      accent: '#9AAEFF'
    },
    { 
      id: 'solutions', 
      name: translations[language].nav.solutions,
      bg: 'bg-gradient-to-br from-[#1E2430] via-[#1A1F2E] to-[#1E2430]',
      accent: '#9AAEFF'
    },
    { 
      id: 'logiciels', 
      name: translations[language].nav.logiciels,
      bg: 'bg-gradient-to-br from-[#1E2430] via-[#1A1F2E] to-[#1E2430]',
      accent: '#9AAEFF'
    },
    { 
      id: 'documentation', 
      name: translations[language].nav.documentation,
      bg: 'bg-gradient-to-br from-[#1B1F27] via-[#1A1F2E] to-[#1B1F27]',
      accent: '#9AAEFF'
    },
    { 
      id: 'contact', 
      name: translations[language].nav.contact,
      bg: 'bg-gradient-to-br from-[#1E2430] via-[#1A1F2E] to-[#1E2430]',
      accent: '#9AAEFF'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = async (sectionId: string) => {
    setIsLoading(true);
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsLoading(false);
  };

  const renderActiveSection = () => {
    if (activeSection === 'apropos') {
      return <AboutSection language={language} />;
    }
    
    if (activeSection === 'logiciels') {
      return <StoreSection language={language} />;
    }
    
    if (activeSection === 'contact') {
      return <ContactSection language={language} onNavigate={navigateTo} />;
    }

    if (activeSection === 'solutions') {
      return <SolutionsSection language={language} onNavigate={navigateTo} />;
    }
    
    const section = sections.find(s => s.id === activeSection);
    
    return (
      <div className={`min-h-screen ${section?.bg} transition-all duration-1000 pt-16`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-light text-[#9AAEFF] mb-4">
                {section?.name}
              </h2>
              <p className="text-[#98A2B3] font-light text-lg max-w-2xl mx-auto">
                Section {section?.name} - Contenu à venir
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#1E2430] text-white overflow-x-hidden">
      <AnimatePresence>
        {isLoading && <LoadingSpinner text={translations[language].loading} />}
      </AnimatePresence>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 h-16 w-full ${
          scrolled ? 'bg-[#1E2430]/90 backdrop-blur-lg border-b border-[#9AAEFF]/20' : 'bg-transparent'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="flex items-center justify-between w-full">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => navigateTo('accueil')}
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-[#9AAEFF] to-[#7B93FF] rounded-lg flex items-center justify-center shadow-lg">
                  <FiCode className="w-5 h-5 text-[#1E2430]" />
                </div>
                <div className="absolute -inset-1 bg-[#9AAEFF]/20 rounded-lg blur-sm group-hover:blur-md transition-all duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-light text-white leading-none">
                  Nova
                </span>
                <span className="text-xs text-[#9AAEFF]/70 font-light">
                  {language === 'fr' ? 'Gestion Scolaire Intelligente' : 'Smart School Management'}
                </span>
              </div>
            </motion.div>

            {/* Navigation Desktop */}
            <div className="hidden md:flex items-center space-x-1">
              {sections.map((section) => (
                <motion.button
                  key={section.id}
                  onClick={() => navigateTo(section.id)}
                  className={`relative px-4 py-2 transition-all duration-300 group ${
                    activeSection === section.id 
                      ? 'text-[#9AAEFF]' 
                      : 'text-[#98A2B3] hover:text-[#9AAEFF]'
                  }`}
                >
                  <span className="relative z-10 font-light tracking-wide text-sm">
                    {section.name}
                  </span>
                  
                  <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-[#9AAEFF] transform origin-left transition-transform duration-300 ${
                    activeSection === section.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'
                  }`} />
                </motion.button>
              ))}
            </div>

            {/* Contrôles */}
            <div className="flex items-center gap-3">
              <motion.button
                onClick={toggleLanguage}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#9AAEFF]/20 bg-[#9AAEFF]/10 text-[#9AAEFF] hover:bg-[#9AAEFF]/20 transition-all duration-300 text-sm"
              >
                <FiGlobe className="w-4 h-4" />
                <span className="uppercase tracking-wide">
                  {language === 'fr' ? 'EN' : 'FR'}
                </span>
              </motion.button>

              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#9AAEFF]/20 bg-[#9AAEFF]/10 text-[#9AAEFF] hover:bg-[#9AAEFF]/20 transition-all duration-300"
                >
                  <FiUser size={16} />
                  <span className="text-sm font-light">
                    {user.isLoggedIn ? translations[language].auth.welcome : translations[language].auth.guest}
                  </span>
                </motion.button>

                <AnimatePresence>
                  {isProfileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-[#1E2430] border border-[#9AAEFF]/20 rounded-lg shadow-lg backdrop-blur-sm z-50"
                    >
                      <div className="p-2">
                        {user.isLoggedIn ? (
                          <>
                            <div className="px-3 py-2 text-sm text-[#98A2B3] border-b border-[#9AAEFF]/10">
                              {user.name}
                            </div>
                            <button
                              onClick={handleViewMyComments}
                              className="w-full text-left px-3 py-2 text-sm text-[#9AAEFF] hover:bg-[#9AAEFF]/10 rounded-md transition-colors flex items-center gap-2"
                            >
                              <FiMessageCircle size={14} />
                              {translations[language].testimonials.myComments}
                            </button>
                            <button
                              onClick={() => setIsCommentModalOpen(true)}
                              className="w-full text-left px-3 py-2 text-sm text-[#9AAEFF] hover:bg-[#9AAEFF]/10 rounded-md transition-colors flex items-center gap-2"
                            >
                              <FiPlus size={14} />
                              {translations[language].testimonials.addComment}
                            </button>
                            <button
                              onClick={handleLogout}
                              className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-400/10 rounded-md transition-colors flex items-center gap-2 mt-1"
                            >
                              <FiLogOut size={14} />
                              {translations[language].auth.logout}
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={handleLogin}
                              className="w-full text-left px-3 py-2 text-sm text-[#9AAEFF] hover:bg-[#9AAEFF]/10 rounded-md transition-colors flex items-center gap-2"
                            >
                              <FiLogIn size={14} />
                              {translations[language].auth.login}
                            </button>
                            <button
                              onClick={handleLogin}
                              className="w-full text-left px-3 py-2 text-sm text-[#9AAEFF] hover:bg-[#9AAEFF]/10 rounded-md transition-colors flex items-center gap-2 mt-1"
                            >
                              <FiUserPlus size={14} />
                              {translations[language].auth.register}
                            </button>
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="md:hidden text-[#9AAEFF] p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 md:hidden bg-[#1E2430]/95 backdrop-blur-lg pt-16"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8 p-8">
              {sections.map((section) => (
                <motion.button
                  key={section.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => navigateTo(section.id)}
                  className={`text-2xl font-light transition-all duration-300 ${
                    activeSection === section.id 
                      ? 'text-[#9AAEFF]' 
                      : 'text-[#98A2B3] hover:text-[#9AAEFF]'
                  }`}
                >
                  {section.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="w-full pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="w-full"
          >
            {activeSection === 'accueil' ? (
              <HeroSection 
                onNavigate={navigateTo} 
                language={language}
                testimonials={isMyCommentsView ? userComments : allTestimonials}
                isMyCommentsView={isMyCommentsView}
                onBackToAllComments={() => setIsMyCommentsView(false)}
                user={user}
                userComments={userComments}
                onAddComment={() => setIsCommentModalOpen(true)}
                onViewMyComments={handleViewMyComments}
              />
            ) : (
              renderActiveSection()
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        onSubmit={handleAddComment}
        language={language}
        isSubmitting={isSubmittingComment}
      />
    </div>
  );
};

interface HeroSectionProps {
  onNavigate: (section: string) => void;
  language: 'fr' | 'en';
  testimonials: Testimonial[];
  isMyCommentsView: boolean;
  onBackToAllComments: () => void;
  user: User;
  userComments: UserComment[];
  onAddComment: () => void;
  onViewMyComments: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  onNavigate, 
  language,
  testimonials,
  isMyCommentsView,
  onBackToAllComments,
  user,
  userComments,
  onAddComment,
  onViewMyComments
}) => {
  const t = translations[language].hero;
  const testimonialsT = translations[language].testimonials;
  const [currentWord, setCurrentWord] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const featureWords = language === 'fr' 
    ? ["Innovation", "Performance", "Simplicité", "Efficacité"]
    : ["Innovation", "Performance", "Simplicity", "Efficiency"];

  const stats = [
    { number: '150+', label: language === 'fr' ? 'Établissements' : 'Institutions' },
    { number: '50k+', label: language === 'fr' ? 'Utilisateurs' : 'Users' },
    { number: '98%', label: language === 'fr' ? 'Satisfaction' : 'Satisfaction' },
    { number: '24/7', label: language === 'fr' ? 'Support' : 'Support' }
  ];

  useEffect(() => {
    if (testimonials.length > 0 && !isMyCommentsView) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [testimonials.length, isMyCommentsView]);

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % featureWords.length);
    }, 2500);
    return () => clearInterval(wordInterval);
  }, [featureWords.length]);

  const quickLinks = [
    {
      icon: FiDownload,
      url: "#",
      name: "Téléchargements",
    },
    {
      icon: FiBook,
      url: "#",
      name: "Documentation",
    },
    {
      icon: FiMail,
      url: "#",
      name: "Contact",
    }
  ];

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#1E2430] via-[#1A1F2E] to-[#1E2430] pt-16">
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute top-1/4 -left-20 w-96 h-96 border border-[#9AAEFF]/10 rounded-full"
        />
        <motion.div
          animate={{ 
            rotate: [360, 0],
            scale: [1.1, 1, 1.1]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute bottom-1/4 -right-20 w-80 h-80 border border-[#9AAEFF]/5 rounded-full"
        />
        
        {sparklePositions.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: sparkle.duration,
              repeat: Infinity,
              delay: sparkle.delay
            }}
            className="absolute w-1 h-1 bg-[#9AAEFF]/30 rounded-full"
            style={{
              left: sparkle.left,
              top: sparkle.top,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-3 px-4 py-2 bg-[#9AAEFF]/10 border border-[#9AAEFF]/20 rounded-full"
              >
                <div className="w-2 h-2 bg-[#9AAEFF] rounded-full animate-pulse" />
                <span className="text-[#9AAEFF] text-sm font-light uppercase tracking-widest">
                  {language === 'fr' ? 'Plateforme Intelligente' : 'Smart Platform'}
                </span>
              </motion.div>

              <div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-white mb-4 leading-tight">
                  {t.title.split(' ').map((word, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="block"
                    >
                      {word}
                    </motion.span>
                  ))}
                </h1>
                
                <div className="h-12 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={currentWord}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="text-xl sm:text-2xl text-[#9AAEFF] font-light"
                    >
                      {featureWords[currentWord]}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl text-[#98A2B3] font-light"
              >
                {t.subtitle}
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-lg text-[#98A2B3] font-light leading-relaxed max-w-lg"
              >
                {t.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onNavigate('logiciels')}
                  className="group bg-[#9AAEFF] text-[#1E2430] px-8 py-4 rounded-lg font-light tracking-wide flex items-center gap-3 shadow-lg hover:shadow-[#9AAEFF]/25 transition-all duration-300 text-lg"
                >
                  {t.buttons.solutions}
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onNavigate('contact')}
                  className="group border border-[#9AAEFF] text-[#9AAEFF] px-8 py-4 rounded-lg font-light tracking-wide flex items-center gap-3 bg-[#9AAEFF]/10 hover:bg-[#9AAEFF]/20 transition-all duration-300 text-lg"
                >
                  {t.buttons.contact}
                  <FiMail className="group-hover:scale-110 transition-transform" />
                </motion.button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-[#9AAEFF]/10"
              >
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl sm:text-3xl font-light text-[#9AAEFF] mb-1">
                      {stat.number}
                    </div>
                    <div className="text-xs text-[#98A2B3] font-light uppercase tracking-widest">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative"
            >
              <div className="relative">
                <div className="w-full bg-gradient-to-br from-[#9AAEFF]/5 to-[#9AAEFF]/10 rounded-2xl border border-[#9AAEFF]/20 backdrop-blur-sm p-8">
                  
                  <div className="text-center mb-8">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.05, 1],
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        ease: "easeInOut" 
                      }}
                      className="w-16 h-16 bg-gradient-to-br from-[#9AAEFF] to-[#7B93FF] rounded-2xl flex items-center justify-center mx-auto shadow-lg mb-4"
                    >
                      <FiHeart className="w-8 h-8 text-[#1E2430]" />
                    </motion.div>
                    
                    <h3 className="text-2xl font-light text-white mb-2">
                      {isMyCommentsView ? testimonialsT.myComments : testimonialsT.title}
                    </h3>
                    
                    <p className="text-[#9AAEFF]/70 font-light text-sm mb-4">
                      {isMyCommentsView 
                        ? `${user.name} • ${testimonials.length} ${testimonials.length !== 1 ? testimonialsT.commentCount_plural : testimonialsT.commentCount}`
                        : testimonialsT.subtitle
                      }
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      {isMyCommentsView ? (
                        <motion.button
                          onClick={onBackToAllComments}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center justify-center gap-2 px-4 py-2 text-sm text-[#9AAEFF] border border-[#9AAEFF]/20 rounded-lg hover:bg-[#9AAEFF]/10 transition-all duration-300"
                        >
                          <FiArrowRight className="rotate-180" size={14} />
                          {language === 'fr' ? 'Retour aux témoignages' : 'Back to testimonials'}
                        </motion.button>
                      ) : (
                        <>
                          <motion.button
                            onClick={onAddComment}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-[#9AAEFF] text-[#1E2430] rounded-lg font-light text-sm transition-all duration-300"
                          >
                            <FiPlus size={16} />
                            {testimonialsT.addComment}
                          </motion.button>

                          {user.isLoggedIn && userComments.length > 0 && (
                            <motion.button
                              onClick={onViewMyComments}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex items-center justify-center gap-2 px-4 py-2 border border-[#9AAEFF]/20 text-[#9AAEFF] rounded-lg font-light text-sm hover:bg-[#9AAEFF]/10 transition-all duration-300"
                            >
                              <FiMessageCircle size={14} />
                              {testimonialsT.myComments}
                              <span className="bg-[#9AAEFF]/20 text-[#9AAEFF] text-xs px-1.5 py-0.5 rounded-full">
                                {userComments.length}
                              </span>
                            </motion.button>
                          )}
                        </>
                      )}
                    </div>

                    {!user.isLoggedIn && !isMyCommentsView && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[#98A2B3]/70 text-xs font-light mt-3"
                      >
                        {testimonialsT.loginToComment}
                      </motion.p>
                    )}
                  </div>

                  {testimonials.length > 0 ? (
                    <>
                      {!isMyCommentsView ? (
                        <AnimatePresence mode="wait">
                          <TestimonialCard
                            key={currentTestimonial}
                            testimonial={testimonials[currentTestimonial]}
                            language={language}
                            isActive={true}
                          />
                        </AnimatePresence>
                      ) : (
                        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                          {testimonials.map((testimonial) => (
                            <TestimonialCard
                              key={testimonial.id}
                              testimonial={testimonial}
                              language={language}
                              isActive={false}
                            />
                          ))}
                        </div>
                      )}

                      {!isMyCommentsView && testimonials.length > 1 && (
                        <div className="flex justify-center gap-2 mt-6">
                          {testimonials.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentTestimonial(index)}
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                index === currentTestimonial 
                                  ? 'bg-[#9AAEFF] w-6' 
                                  : 'bg-[#9AAEFF]/30 hover:bg-[#9AAEFF]/50'
                              }`}
                            />
                          ))}
                        </div>
                      )}

                      {!isMyCommentsView && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1 }}
                          className="text-center mt-6 pt-6 border-t border-[#9AAEFF]/10"
                        >
                          <p className="text-[#98A2B3] font-light text-sm mb-2">
                            {language === 'fr' ? 'Note moyenne' : 'Average rating'}
                          </p>
                          <div className="flex justify-center">
                            <StarRating 
                              rating={Math.round(testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length)} 
                              size={16} 
                            />
                          </div>
                        </motion.div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <FiMessageCircle className="mx-auto text-[#9AAEFF]/50 mb-3" size={32} />
                      <p className="text-[#98A2B3] font-light">
                        {testimonialsT.noComments}
                      </p>
                      {!user.isLoggedIn && (
                        <motion.button
                          onClick={onAddComment}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="mt-4 px-4 py-2 bg-[#9AAEFF] text-[#1E2430] rounded-lg font-light text-sm transition-all duration-300"
                        >
                          {language === 'fr' ? 'Se connecter pour partager' : 'Log in to share'}
                        </motion.button>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="absolute -inset-4 bg-gradient-to-r from-[#9AAEFF]/10 to-transparent rounded-2xl blur-xl -z-10" />
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="flex justify-center gap-6 mt-8"
              >
                {quickLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ scale: 1.2, y: -5 }}
                      className="w-12 h-12 bg-[#9AAEFF]/10 border border-[#9AAEFF]/20 rounded-lg flex items-center justify-center text-[#9AAEFF] hover:bg-[#9AAEFF]/20 transition-all duration-300 backdrop-blur-sm"
                    >
                      <Icon size={20} />
                    </motion.a>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-px h-8 bg-[#9AAEFF]/50 rounded-full" />
          <span className="text-xs text-[#9AAEFF]/70 font-light tracking-widest uppercase">
            Scroll
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Homepage;