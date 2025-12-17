// components/StoreSection.tsx
import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiDownload, 
  FiSmartphone, 
  FiMonitor, 
  FiBook, 
  FiUsers,
  FiCalendar,
  FiAward,
  FiX,
  FiArrowRight,
  FiGlobe,
  FiChevronLeft,
  FiChevronRight,
  FiStar,
  FiCheck
} from 'react-icons/fi';

// Traductions pour la section Store
const storeTranslations = {
  fr: {
    title: "Nos Solutions",
    subtitle: "Découvrez notre écosystème complet",
    categories: {
      all: "Tous",
      software: "Logiciels",
      mobile: "Applications Mobile"
    },
    features: {
      title: "Pourquoi choisir nos solutions ?",
      items: [
        {
          title: "Interface Intuitive",
          description: "Des interfaces conçues pour une prise en main immédiate"
        },
        {
          title: "Performance Optimale",
          description: "Des solutions rapides et stables pour tous vos besoins"
        },
        {
          title: "Support Réactif",
          description: "Une équipe dédiée pour vous accompagner au quotidien"
        },
        {
          title: "Mises à Jour Régulières",
          description: "Des améliorations continues basées sur vos retours"
        }
      ]
    },
    downloadModal: {
      title: "Télécharger",
      version: "Version",
      size: "Taille",
      requirements: "Configuration requise",
      download: "Télécharger",
      cancel: "Annuler"
    },
    viewDetails: "Voir les détails",
    availableFor: "Disponible pour",
    seeAllFeatures: "Voir toutes les fonctionnalités"
  },
  en: {
    title: "Our Solutions",
    subtitle: "Discover our complete ecosystem",
    categories: {
      all: "All",
      software: "Software",
      mobile: "Mobile Apps"
    },
    features: {
      title: "Why choose our solutions?",
      items: [
        {
          title: "Intuitive Interface",
          description: "Interfaces designed for immediate use"
        },
        {
          title: "Optimal Performance",
          description: "Fast and stable solutions for all your needs"
        },
        {
          title: "Responsive Support",
          description: "A dedicated team to support you daily"
        },
        {
          title: "Regular Updates",
          description: "Continuous improvements based on your feedback"
        }
      ]
    },
    downloadModal: {
      title: "Download",
      version: "Version",
      size: "Size",
      requirements: "Requirements",
      download: "Download",
      cancel: "Cancel"
    },
    viewDetails: "View details",
    availableFor: "Available for",
    seeAllFeatures: "See all features"
  }
};

// Données des produits
const products = [
  {
    id: 1,
    name: "ABFVision",
    category: "software",
    icon: FiMonitor,
    color: "from-[#9AAEFF] to-[#7B93FF]",
    badge: "Premium",
    description: {
      fr: "Plateforme complète de gestion scolaire pour les établissements éducatifs.",
      en: "Complete school management platform for educational institutions."
    },
    features: {
      fr: [
        "Gestion des étudiants et du personnel",
        "Emplois du temps dynamiques",
        "Suivi des résultats académiques",
        "Communication intégrée",
        "Rapports analytiques détaillés"
      ],
      en: [
        "Student and staff management",
        "Dynamic schedules",
        "Academic results tracking",
        "Integrated communication",
        "Detailed analytical reports"
      ]
    },
    versions: [
      { version: "v2.1.0", size: "45 MB", requirements: "Windows 10+, 4GB RAM" },
      { version: "v2.0.5", size: "42 MB", requirements: "Windows 10+, 4GB RAM" }
    ],
    rating: 4.8,
    downloads: "10K+"
  },
  {
    id: 2,
    name: "ABFVision Parent",
    category: "mobile",
    icon: FiUsers,
    color: "from-[#FF6B9D] to-[#FF8E53]",
    badge: "Gratuit",
    description: {
      fr: "Application mobile permettant aux parents de suivre la scolarité de leurs enfants.",
      en: "Mobile app allowing parents to monitor their children's schooling."
    },
    features: {
      fr: [
        "Suivi des résultats en temps réel",
        "Consultation des emplois du temps",
        "Notifications des absences",
        "Messagerie avec les enseignants",
        "Alertes importantes"
      ],
      en: [
        "Real-time results tracking",
        "Schedule consultation",
        "Absence notifications",
        "Messaging with teachers",
        "Important alerts"
      ]
    },
    versions: [
      { version: "v1.5.2", size: "28 MB", requirements: "Android 8.0+ / iOS 13+" },
      { version: "v1.4.8", size: "26 MB", requirements: "Android 8.0+ / iOS 13+" }
    ],
    rating: 4.6,
    downloads: "25K+"
  },
  {
    id: 3,
    name: "ABFVision Étudiant",
    category: "mobile",
    icon: FiBook,
    color: "from-[#4CD964] to-[#5AC8FA]",
    badge: "Gratuit",
    description: {
      fr: "Application dédiée aux étudiants pour accéder à leur emploi du temps et résultats.",
      en: "Dedicated app for students to access their schedule and results."
    },
    features: {
      fr: [
        "Emploi du temps personnel",
        "Résultats académiques",
        "Devoirs et échéances",
        "Ressources pédagogiques",
        "Communication avec les pairs"
      ],
      en: [
        "Personal schedule",
        "Academic results",
        "Homework and deadlines",
        "Educational resources",
        "Peer communication"
      ]
    },
    versions: [
      { version: "v1.3.1", size: "25 MB", requirements: "Android 8.0+ / iOS 13+" },
      { version: "v1.2.9", size: "24 MB", requirements: "Android 8.0+ / iOS 13+" }
    ],
    rating: 4.5,
    downloads: "15K+"
  },
  {
    id: 4,
    name: "ExamLibrary",
    category: "mobile",
    icon: FiAward,
    color: "from-[#FFD166] to-[#FF9E6D]",
    badge: "Nouveau",
    description: {
      fr: "Bibliothèque mobile de sujets d'examens pour une préparation optimale.",
      en: "Mobile library of exam subjects for optimal preparation."
    },
    features: {
      fr: [
        "Base de données exhaustive",
        "Recherche avancée",
        "Favoris et collections",
        "Mode hors ligne",
        "Progression personnelle"
      ],
      en: [
        "Comprehensive database",
        "Advanced search",
        "Favorites and collections",
        "Offline mode",
        "Personal progress"
      ]
    },
    versions: [
      { version: "v1.2.0", size: "35 MB", requirements: "Android 8.0+ / iOS 13+" },
      { version: "v1.1.5", size: "32 MB", requirements: "Android 8.0+ / iOS 13+" }
    ],
    rating: 4.7,
    downloads: "8K+"
  }
];

// Composant Carte Produit pour le carrousel
const ProductCard = ({ 
  product, 
  isActive, 
  onClick,
  language 
}: { 
  product: typeof products[0];
  isActive: boolean;
  onClick: () => void;
  language: 'fr' | 'en';
}) => {
  const Icon = product.icon;
  const t = storeTranslations[language];

  return (
    <motion.div
      onClick={onClick}
      className={`
        flex-shrink-0 w-80 cursor-pointer transition-all duration-500 transform
        ${isActive 
          ? 'scale-105 z-10' 
          : 'scale-95 opacity-70 hover:scale-100 hover:opacity-90'
        }
      `}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`
        relative overflow-hidden rounded-2xl border-2 bg-gradient-to-b from-[#212736] to-[#1A1F2E] backdrop-blur-sm
        h-96 flex flex-col
        ${isActive 
          ? 'border-[#9AAEFF] shadow-2xl shadow-[#9AAEFF]/20' 
          : 'border-[#2A3140] shadow-lg shadow-black/20'
        }
      `}>
        {/* Header avec icône et badge */}
        <div className="h-32 relative overflow-hidden bg-gradient-to-br from-[#1A1F2E] to-[#212736] p-6">
          <div className="flex items-start justify-between">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className={`w-16 h-16 bg-gradient-to-br ${product.color} rounded-2xl flex items-center justify-center shadow-lg`}
            >
              <Icon className="w-8 h-8 text-[#1E2430]" />
            </motion.div>
            
            <div className="flex flex-col items-end gap-2">
              <div className="bg-[#9AAEFF]/20 border border-[#9AAEFF]/30 text-[#9AAEFF] px-3 py-1 rounded-full text-xs font-light">
                {product.badge}
              </div>
              <div className="flex items-center gap-1 text-yellow-400">
                <FiStar size={12} />
                <span className="text-xs text-white">{product.rating}</span>
              </div>
            </div>
          </div>

          {isActive && (
            <motion.div 
              className="absolute inset-0 bg-[#9AAEFF]/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col">
          <div className="mb-4">
            <h3 className={`
              font-bold text-lg mb-2 transition-colors duration-300
              ${isActive ? 'text-[#9AAEFF]' : 'text-white'}
            `}>
              {product.name}
            </h3>
            
            <p className={`
              text-sm mb-3 transition-colors duration-300 text-[#98A2B3] leading-relaxed
            `}>
              {product.description[language]}
            </p>
            
            <div className="flex items-center justify-between text-xs text-[#98A2B3]">
              <span>{product.downloads} {language === 'fr' ? 'téléchargements' : 'downloads'}</span>
              <span>{t.availableFor} {product.category === 'software' ? 'Windows' : 'Android/iOS'}</span>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-2 mt-auto">
            {product.features[language].slice(0, 2).map((feature: string, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <FiCheck className="text-[#4CD964] flex-shrink-0" size={14} />
                <span className="text-[#98A2B3] text-xs line-clamp-1">{feature}</span>
              </div>
            ))}
            {product.features[language].length > 2 && (
              <div className="text-[#9AAEFF] text-xs font-light">
                +{product.features[language].length - 2} {language === 'fr' ? 'fonctionnalités' : 'features'}
              </div>
            )}
          </div>

          {/* Indicateur actif */}
          {isActive && (
            <motion.div 
              className="absolute bottom-4 right-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="w-2 h-2 bg-[#9AAEFF] rounded-full animate-ping" />
              <div className="w-2 h-2 bg-[#9AAEFF] rounded-full absolute top-0" />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Composant Carrousel principal
const ProductCarousel = ({
  products,
  currentIndex,
  onProductSelect,
  onIndexChange,
  language
}: {
  products: typeof products;
  currentIndex: number;
  onProductSelect: (product: typeof products[0]) => void;
  onIndexChange: (index: number) => void;
  language: 'fr' | 'en';
}) => {
  const t = storeTranslations[language];

  const handleNext = useCallback(() => {
    onIndexChange((currentIndex + 1) % products.length);
  }, [currentIndex, products.length, onIndexChange]);

  const handlePrev = useCallback(() => {
    onIndexChange((currentIndex - 1 + products.length) % products.length);
  }, [currentIndex, products.length, onIndexChange]);

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <FiMonitor className="text-[#98A2B3] mb-4" size={48} />
        <h3 className="text-white font-semibold text-lg mb-2">
          {language === 'fr' ? 'Aucun produit trouvé' : 'No products found'}
        </h3>
        <p className="text-[#98A2B3] text-sm">
          {language === 'fr' 
            ? 'Aucun produit ne correspond aux critères sélectionnés.'
            : 'No products match the selected criteria.'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Navigation buttons */}
      {products.length > 1 && (
        <>
          <motion.button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-[#1B1F27]/80 hover:bg-[#9AAEFF]/20 backdrop-blur-sm rounded-full border border-[#9AAEFF]/30 flex items-center justify-center group transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiChevronLeft className="text-[#9AAEFF] group-hover:text-white" size={24} />
          </motion.button>

          <motion.button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-[#1B1F27]/80 hover:bg-[#9AAEFF]/20 backdrop-blur-sm rounded-full border border-[#9AAEFF]/30 flex items-center justify-center group transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiChevronRight className="text-[#9AAEFF] group-hover:text-white" size={24} />
          </motion.button>
        </>
      )}

      {/* Carousel container */}
      <div className="overflow-hidden py-8">
        <motion.div 
          className="flex transition-transform duration-500 ease-out gap-8"
          style={{ 
            transform: `translateX(calc(50% - ${currentIndex * 320}px))`,
            justifyContent: 'center'
          }}
        >
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              isActive={index === currentIndex}
              onClick={() => {
                onIndexChange(index);
                onProductSelect(product);
              }}
              language={language}
            />
          ))}
        </motion.div>
      </div>

      {/* Pagination dots */}
      {products.length > 1 && (
        <div className="flex justify-center mt-8 space-x-3">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => onIndexChange(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-[#9AAEFF] scale-125' 
                  : 'bg-[#2A3140] hover:bg-[#98A2B3]'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Composant Modal de Téléchargement (resté identique)
const DownloadModal: React.FC<{
  product: typeof products[0];
  isOpen: boolean;
  onClose: () => void;
  language: 'fr' | 'en';
}> = ({ product, isOpen, onClose, language }) => {
  const t = storeTranslations[language].downloadModal;

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
            className="bg-[#1E2430] rounded-2xl border border-[#9AAEFF]/20 p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-light text-white">{t.title} {product.name}</h3>
              <button
                onClick={onClose}
                className="text-[#98A2B3] hover:text-white transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {product.versions.map((version, index) => (
                <motion.div
                  key={version.version}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#2A3040] rounded-lg p-4 border border-[#9AAEFF]/10"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[#9AAEFF] font-light">{t.version} {version.version}</span>
                    <span className="text-[#98A2B3] text-sm">{version.size}</span>
                  </div>
                  <p className="text-[#98A2B3] text-sm mb-3">{t.requirements}: {version.requirements}</p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#9AAEFF] text-[#1E2430] py-2 rounded-lg font-light flex items-center justify-center gap-2"
                  >
                    <FiDownload size={16} />
                    {t.download}
                  </motion.button>
                </motion.div>
              ))}
            </div>

            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-4 border border-[#9AAEFF]/20 text-[#9AAEFF] py-2 rounded-lg font-light"
            >
              {t.cancel}
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const StoreSection: React.FC<{ language: 'fr' | 'en'; onNavigate: (section: string) => void }> = ({ 
  language, 
  onNavigate 
}) => {
  const t = storeTranslations[language];
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProducts = products.filter(product => 
    activeCategory === 'all' || product.category === activeCategory
  );

  // Reset index quand la catégorie change
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  const handleProductSelect = (product: typeof products[0]) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const currentProduct = filteredProducts[currentIndex];

  return (
    <section className="min-h-screen bg-linear-to-br from-[#1E2430] via-[#1A1F2E] to-[#1E2430] py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* En-tête de section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-4 py-2 bg-[#9AAEFF]/10 border border-[#9AAEFF]/20 rounded-full mb-6"
            >
              <div className="w-2 h-2 bg-[#9AAEFF] rounded-full animate-pulse" />
              <span className="text-[#9AAEFF] text-sm font-light uppercase tracking-widest">
                {language === 'fr' ? 'Notre Écosystème' : 'Our Ecosystem'}
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-4">
              {t.title}
            </h1>
            <p className="text-xl text-[#9AAEFF] font-light max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </motion.div>

          {/* Filtres de catégories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {['all', 'software', 'mobile'].map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-light transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-[#9AAEFF] text-[#1E2430]'
                    : 'bg-[#9AAEFF]/10 text-[#9AAEFF] border border-[#9AAEFF]/20 hover:bg-[#9AAEFF]/20'
                }`}
              >
                {t.categories[category as keyof typeof t.categories]}
              </motion.button>
            ))}
          </motion.div>

          {/* Carrousel des produits */}
          <div className="bg-[#1B1F27]/40 backdrop-blur-sm border border-[#9AAEFF]/20 rounded-3xl p-8 mb-16">
            <ProductCarousel
              products={filteredProducts}
              currentIndex={currentIndex}
              onProductSelect={handleProductSelect}
              onIndexChange={setCurrentIndex}
              language={language}
            />
          </div>

          {/* Détails du produit sélectionné */}
          {currentProduct && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid lg:grid-cols-2 gap-12 items-start mb-16"
            >
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-light text-white mb-4">
                    {currentProduct.name}
                  </h2>
                  <p className="text-[#98A2B3] font-light text-lg leading-relaxed">
                    {currentProduct.description[language]}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-light text-[#9AAEFF]">
                    {t.seeAllFeatures}
                  </h3>
                  <div className="grid gap-3">
                    {currentProduct.features[language].map((feature: string, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-6 h-6 bg-[#9AAEFF]/10 border border-[#9AAEFF]/20 rounded-lg flex items-center justify-center">
                          <FiCheck className="text-[#9AAEFF]" size={14} />
                        </div>
                        <span className="text-[#98A2B3] font-light">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <motion.button
                  onClick={() => handleProductSelect(currentProduct)}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group bg-[#9AAEFF] text-[#1E2430] px-8 py-4 rounded-lg font-light tracking-wide flex items-center gap-3 transition-all duration-300 text-lg"
                >
                  <FiDownload className="group-hover:scale-110 transition-transform" />
                  {language === 'fr' ? 'Télécharger maintenant' : 'Download now'}
                </motion.button>
              </div>

              {/* Carte statistiques */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                className="relative"
              >
                <div className="w-full bg-linear-to-br from-[#9AAEFF]/5 to-[#9AAEFF]/10 rounded-2xl border border-[#9AAEFF]/20 backdrop-blur-sm p-8">
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-linear-to-br from-[#9AAEFF] to-[#7B93FF] rounded-2xl flex items-center justify-center mx-auto shadow-lg mb-4">
                        <currentProduct.icon className="w-10 h-10 text-[#1E2430]" />
                      </div>
                      <h4 className="text-white font-light text-xl mb-2">
                        {currentProduct.name}
                      </h4>
                      <div className="flex items-center justify-center gap-4 text-sm text-[#98A2B3]">
                        <div className="flex items-center gap-1">
                          <FiStar className="text-yellow-400" />
                          <span>{currentProduct.rating}/5.0</span>
                        </div>
                        <span>•</span>
                        <span>{currentProduct.downloads}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-[#1E2430]/50 rounded-lg p-4">
                        <div className="text-[#9AAEFF] text-lg font-light mb-1">
                          {currentProduct.versions[0].version}
                        </div>
                        <div className="text-[#98A2B3] text-sm">
                          {language === 'fr' ? 'Dernière version' : 'Latest version'}
                        </div>
                      </div>
                      <div className="bg-[#1E2430]/50 rounded-lg p-4">
                        <div className="text-[#9AAEFF] text-lg font-light mb-1">
                          {currentProduct.versions[0].size}
                        </div>
                        <div className="text-[#98A2B3] text-sm">
                          {language === 'fr' ? 'Taille' : 'Size'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Section Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl font-light text-[#9AAEFF] mb-12">
              {t.features.title}
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {t.features.items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="bg-[#1E2430]/50 rounded-2xl border border-[#9AAEFF]/10 p-6 backdrop-blur-sm hover:border-[#9AAEFF]/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-[#9AAEFF]/10 border border-[#9AAEFF]/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <div className="w-2 h-2 bg-[#9AAEFF] rounded-full" />
                  </div>
                  <h4 className="text-white font-light text-lg mb-3">
                    {item.title}
                  </h4>
                  <p className="text-[#98A2B3] font-light text-sm">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.button
              onClick={() => onNavigate('contact')}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group border border-[#9AAEFF] text-[#9AAEFF] px-8 py-4 rounded-lg font-light tracking-wide flex items-center gap-3 bg-[#9AAEFF]/10 hover:bg-[#9AAEFF]/20 transition-all duration-300 text-lg mx-auto"
            >
              {language === 'fr' ? 'Demander une démo' : 'Request a demo'}
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Modal de téléchargement */}
      {selectedProduct && (
        <DownloadModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          language={language}
        />
      )}
    </section>
  );
};

export default StoreSection;