// components/AlgorithmsSection.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiCpu, FiCode, FiDownload, FiShield,FiFileText, 
  FiGlobe, FiTerminal, FiZap, FiUsers , FiBook,
  FiCloud, FiBarChart2
} from 'react-icons/fi';
import {
  Code, Download,
  FileText,  Star, CheckCircle2,
  Globe, Terminal, Zap,
  Github, Sparkles, Binary, Lock, 
} from 'lucide-react';

// Traductions
const translations = {
  fr: {
    title: "Algorithms ABFVision",
    subtitle: "Moteurs de traitement avancés pour une gestion scolaire optimale",
    
    // Sections
    sections: {
      imageProcessor: "Processeur d'Images",
      encryptionEngine: "Moteur de Chiffrement",
      allAlgorithms: "Bibliothèque d'Algorithms"
    },
    
    // Algorithmes
    algorithms: {
      imageProcessor: {
        title: "Image → Texte",
        subtitle: "Extraction intelligente de texte",
        description: "Transforme les images en texte structuré pour optimiser le stockage et faciliter la recherche",
        features: [
          "OCR haute précision (>99%)",
          "Support multilingue",
          "Traitement par lots",
          "Formatage intelligent",
          "Optimisation de stockage"
        ],
        benefits: {
          storage: "-90% d'espace utilisé",
          speed: "Traitement 10x plus rapide",
          accuracy: "Précision maximale"
        }
      },
      encryptionEngine: {
        title: "Chiffrement Quantique",
        subtitle: "Protection absolue des données",
        description: "Algorithme de chiffrement asymétrique qui défie même les intelligences artificielles les plus avancées",
        features: [
          "Chiffrement post-quantique",
          "Protection contre les IA",
          "Vérification d'intégrité",
          "Signature numérique",
          "Chiffrement hybride"
        ],
        benefits: {
          security: "Niveau militaire",
          speed: "Chiffrement instantané",
          reliability: "Zéro faille connue"
        }
    }
    },
    
    // Téléchargements
    downloads: {
      title: "Téléchargements",
      subtitle: "Implémentations dans plusieurs langages",
      languages: {
        rust: "Rust (Version originale)",
        python: "Python",
        javascript: "JavaScript/TypeScript",
        java: "Java",
        cpp: "C++",
        go: "Go"
      },
      sizes: {
        rust: "1.2 MB",
        python: "850 KB",
        javascript: "450 KB",
        java: "1.8 MB",
        cpp: "2.1 MB",
        go: "950 KB"
      },
      versions: {
        rust: "v2.4.1",
        python: "v2.3.0",
        javascript: "v2.2.0",
        java: "v2.1.0",
        cpp: "v2.0.0",
        go: "v2.2.0"
      }
    },
    
    // Documentation
    documentation: {
      title: "Documentation",
      apiDocs: "Documentation API",
      integrationGuide: "Guide d'intégration",
      examples: "Exemples d'utilisation",
      benchmarks: "Benchmarks de performance",
      securityAudit: "Audit de sécurité"
    },
    
    // Stats
    stats: {
      linesOfCode: "45K lignes",
      contributors: "12 contributeurs",
      downloads: "10K+ téléchargements",
      uptime: "99.99% disponibilité",
      securityScore: "A+ Score"
    },
    
    // CTA
    cta: {
      getStarted: "Commencer avec l'API",
      viewSource: "Voir le code source",
      tryDemo: "Essayer la démo",
      contact: "Contacter l'équipe"
    }
  },
  en: {
    title: "ABFVision Algorithms",
    subtitle: "Advanced processing engines for optimal school management",
    
    sections: {
      imageProcessor: "Image Processor",
      encryptionEngine: "Encryption Engine",
      allAlgorithms: "Algorithms Library"
    },
    
    algorithms: {
      imageProcessor: {
        title: "Image → Text",
        subtitle: "Intelligent text extraction",
        description: "Transforms images into structured text to optimize storage and facilitate search",
        features: [
          "High precision OCR (>99%)",
          "Multilingual support",
          "Batch processing",
          "Smart formatting",
          "Storage optimization"
        ],
        benefits: {
          storage: "-90% storage used",
          speed: "10x faster processing",
          accuracy: "Maximum accuracy"
        }
      },
      encryptionEngine: {
        title: "Quantum Encryption",
        subtitle: "Absolute data protection",
        description: "Asymmetric encryption algorithm that challenges even the most advanced artificial intelligences",
        features: [
          "Post-quantum encryption",
          "AI protection",
          "Integrity verification",
          "Digital signature",
          "Hybrid encryption"
        ],
        benefits: {
          security: "Military grade",
          speed: "Instant encryption",
          reliability: "Zero known flaws"
        }
      }
    },
    
    downloads: {
      title: "Downloads",
      subtitle: "Implementations in multiple languages",
      languages: {
        rust: "Rust (Original version)",
        python: "Python",
        javascript: "JavaScript/TypeScript",
        java: "Java",
        cpp: "C++",
        go: "Go"
      },
      sizes: {
        rust: "1.2 MB",
        python: "850 KB",
        javascript: "450 KB",
        java: "1.8 MB",
        cpp: "2.1 MB",
        go: "950 KB"
      },
      versions: {
        rust: "v2.4.1",
        python: "v2.3.0",
        javascript: "v2.2.0",
        java: "v2.1.0",
        cpp: "v2.0.0",
        go: "v2.2.0"
      }
    },
    
    documentation: {
      title: "Documentation",
      apiDocs: "API Documentation",
      integrationGuide: "Integration Guide",
      examples: "Usage Examples",
      benchmarks: "Performance Benchmarks",
      securityAudit: "Security Audit"
    },
    
    stats: {
      linesOfCode: "45K lines",
      contributors: "12 contributors",
      downloads: "10K+ downloads",
      uptime: "99.99% uptime",
      securityScore: "A+ Score"
    },
    
    cta: {
      getStarted: "Get Started with API",
      viewSource: "View Source Code",
      tryDemo: "Try Demo",
      contact: "Contact Team"
    }
  }
};

// Types
interface Language {
  id: 'rust' | 'python' | 'javascript' | 'java' | 'cpp' | 'go';
  name: string;
  icon: React.ComponentType;
  color: string;
  version: string;
  size: string;
  popularity: number; // 1-5 stars
  description: string;
}

interface Algorithm {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType;
  color: string;
  features: string[];
  benefits: Record<string, string>;
  techStack: string[];
}

// Composants
const LanguageCard: React.FC<{
  language: Language;
  isSelected: boolean;
  onClick: () => void;
}> = ({ language, isSelected, onClick }) => {
  const Icon = language.icon;

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative p-4 rounded-xl border transition-all duration-300 text-left ${
        isSelected
          ? 'border-[#9AAEFF] bg-[#9AAEFF]/10'
          : 'border-[#9AAEFF]/20 hover:border-[#9AAEFF]/40 bg-[#1E2430]/60'
      }`}
    >
      {/* Indicateur de sélection */}
      {isSelected && (
        <motion.div
          layoutId="selected-language"
          className="absolute -top-2 -right-2 w-6 h-6 bg-[#9AAEFF] rounded-full flex items-center justify-center"
        >
          <CheckCircle2 className="w-4 h-4 text-[#1E2430]" />
        </motion.div>
      )}

      {/* En-tête */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${language.color}20`, border: `1px solid ${language.color}30` }}
          >
            <Icon className="w-5 h-5" style={{ color: language.color }} />
          </div>
          <div>
            <h4 className="font-medium text-white">{language.name}</h4>
            <p className="text-xs text-[#98A2B3]">{language.version}</p>
          </div>
        </div>
      </div>

      {/* Popularité */}
      <div className="flex items-center gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${
              i < language.popularity
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-[#98A2B3]/30'
            }`}
          />
        ))}
      </div>

      {/* Info */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#98A2B3]">Taille</span>
          <span className="text-white font-medium">{language.size}</span>
        </div>
        <p className="text-xs text-[#98A2B3] leading-relaxed">{language.description}</p>
      </div>
    </motion.button>
  );
};

const DownloadButton: React.FC<{
  language: Language;
  algorithmId: string;
  onDownload: (language: Language, algorithmId: string) => void;
  isDownloading: boolean;
}> = ({ language, algorithmId, onDownload, isDownloading }) => {
  const Icon = language.icon;

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onDownload(language, algorithmId)}
      disabled={isDownloading}
      className="w-full py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      style={{
        backgroundColor: `${language.color}10`,
        border: `1px solid ${language.color}30`,
        color: language.color
      }}
    >
      {isDownloading ? (
        <>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
          />
          <span className="text-sm">Téléchargement...</span>
        </>
      ) : (
        <>
          <Download className="w-4 h-4" />
          <span className="text-sm">Télécharger {language.name}</span>
        </>
      )}
    </motion.button>
  );
};

const AlgorithmCard: React.FC<{
  algorithm: Algorithm;
  isExpanded: boolean;
  onToggle: () => void;
  selectedLanguage: Language | null;
  onSelectLanguage: (langId: string) => void;
  languages: Language[];
  onDownload: (language: Language, algorithmId: string) => void;
  isDownloading: boolean;
  language: 'fr' | 'en';
}> = ({
  algorithm,
  isExpanded,
  onToggle,
  selectedLanguage,
  onSelectLanguage,
  languages,
  onDownload,
  isDownloading,
  language
}) => {
  const Icon = algorithm.icon;

  return (
    <motion.div
      layout
      className={`bg-[#1E2430]/80 backdrop-blur-sm border ${
        isExpanded ? 'border-[#9AAEFF]/40' : 'border-[#9AAEFF]/20'
      } rounded-2xl overflow-hidden transition-all duration-300`}
    >
      {/* En-tête réductible */}
      <motion.button
        layout
        onClick={onToggle}
        className="w-full p-6 text-left"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${algorithm.color}20`, border: `1px solid ${algorithm.color}30` }}
            >
              <Icon className="w-6 h-6" style={{ color: algorithm.color }} />
            </div>
            <div>
              <h3 className="text-xl font-light text-white mb-1">{algorithm.title}</h3>
              <p className="text-[#9AAEFF] font-light text-sm">{algorithm.subtitle}</p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="text-[#9AAEFF] p-2"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </div>
      </motion.button>

      {/* Contenu déplié */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6 pb-6"
          >
            {/* Description */}
            <p className="text-[#98A2B3] font-light mb-6">
              {algorithm.description}
            </p>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Colonne gauche - Features et Benefits */}
              <div className="space-y-6">
                {/* Features */}
                <div>
                  <h4 className="text-white font-light mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    {language === 'fr' ? 'Fonctionnalités' : 'Features'}
                  </h4>
                  <ul className="space-y-2">
                    {algorithm.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-2 text-sm text-[#98A2B3]"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#9AAEFF]" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div>
                  <h4 className="text-white font-light mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    {language === 'fr' ? 'Avantages' : 'Benefits'}
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(algorithm.benefits).map(([key, value], index) => (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="bg-[#2A3040] border border-[#9AAEFF]/10 rounded-lg p-3 text-center"
                      >
                        <div className="text-lg font-light text-white mb-1">{value}</div>
                        <div className="text-xs text-[#98A2B3] capitalize">{key}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Colonne droite - Téléchargement */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-light mb-4 flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    {language === 'fr' ? 'Implémentations disponibles' : 'Available implementations'}
                  </h4>
                  
                  {/* Sélection de langage */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                    {languages.map((lang) => (
                      <LanguageCard
                        key={lang.id}
                        language={lang}
                        isSelected={selectedLanguage?.id === lang.id}
                        onClick={() => onSelectLanguage(lang.id)}
                      />
                    ))}
                  </div>

                  {/* Bouton de téléchargement */}
                  {selectedLanguage && (
                    <DownloadButton
                      language={selectedLanguage}
                      algorithmId={algorithm.id}
                      onDownload={onDownload}
                      isDownloading={isDownloading}
                    />
                  )}

                  {/* Tech Stack */}
                  <div className="mt-6">
                    <h5 className="text-white font-light text-sm mb-2 flex items-center gap-2">
                      <Code className="w-3 h-3" />
                      {language === 'fr' ? 'Technologies utilisées' : 'Technologies used'}
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {algorithm.techStack.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-[#2A3040] text-[#98A2B3] rounded border border-[#9AAEFF]/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Composant principal
const AlgorithmsSection: React.FC<{ language: 'fr' | 'en' }> = ({ language }) => {
  const [activeSection, setActiveSection] = useState<'imageProcessor' | 'encryptionEngine' | 'all'>('imageProcessor');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>('imageProcessor');
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [expandedAlgorithm, setExpandedAlgorithm] = useState<string | null>('imageProcessor');

  const t = translations[language];

  // Données des langages
  const languages: Language[] = [
    {
      id: 'rust',
      name: t.downloads.languages.rust,
      icon: FiCpu,
      color: '#F74C00',
      version: t.downloads.versions.rust,
      size: t.downloads.sizes.rust,
      popularity: 5,
      description: language === 'fr' ? 'Version originale, performances optimales' : 'Original version, optimal performance'
    },
    {
      id: 'python',
      name: t.downloads.languages.python,
      icon: FiCode,
      color: '#3776AB',
      version: t.downloads.versions.python,
      size: t.downloads.sizes.python,
      popularity: 5,
      description: language === 'fr' ? 'Facile à intégrer, large adoption' : 'Easy to integrate, wide adoption'
    },
    {
      id: 'javascript',
      name: t.downloads.languages.javascript,
      icon: FiGlobe,
      color: '#F7DF1E',
      version: t.downloads.versions.javascript,
      size: t.downloads.sizes.javascript,
      popularity: 4,
      description: language === 'fr' ? 'Pour applications web modernes' : 'For modern web applications'
    },
    {
      id: 'java',
      name: t.downloads.languages.java,
      icon: FiCoffee,
      color: '#007396',
      version: t.downloads.versions.java,
      size: t.downloads.sizes.java,
      popularity: 4,
      description: language === 'fr' ? 'Entreprise, robuste et scalable' : 'Enterprise, robust and scalable'
    },
    {
      id: 'cpp',
      name: t.downloads.languages.cpp,
      icon: FiTerminal,
      color: '#00599C',
      version: t.downloads.versions.cpp,
      size: t.downloads.sizes.cpp,
      popularity: 3,
      description: language === 'fr' ? 'Haute performance, contrôle total' : 'High performance, total control'
    },
    {
      id: 'go',
      name: t.downloads.languages.go,
      icon: FiZap,
      color: '#00ADD8',
      version: t.downloads.versions.go,
      size: t.downloads.sizes.go,
      popularity: 4,
      description: language === 'fr' ? 'Concurrent, performances élevées' : 'Concurrent, high performance'
    }
  ];

  // Données des algorithmes
  const algorithms: Algorithm[] = [
    {
      id: 'imageProcessor',
      title: t.algorithms.imageProcessor.title,
      subtitle: t.algorithms.imageProcessor.subtitle,
      description: t.algorithms.imageProcessor.description,
      icon: FileText,
      color: '#9AAEFF',
      features: t.algorithms.imageProcessor.features,
      benefits: t.algorithms.imageProcessor.benefits,
      techStack: ['Rust', 'OpenCV', 'Tesseract', 'TensorFlow', 'WASM']
    },
    {
      id: 'encryptionEngine',
      title: t.algorithms.encryptionEngine.title,
      subtitle: t.algorithms.encryptionEngine.subtitle,
      description: t.algorithms.encryptionEngine.description,
      icon: Lock,
      color: '#34D399',
      features: t.algorithms.encryptionEngine.features,
      benefits: t.algorithms.encryptionEngine.benefits,
      techStack: ['Rust', 'Ring', 'OpenSSL', 'libsodium', 'WASM']
    }
  ];

  // Stats
  const stats = [
    { icon: FiCode, value: t.stats.linesOfCode, label: language === 'fr' ? 'Lignes de code' : 'Lines of Code' },
    { icon: FiUsers, value: t.stats.contributors, label: language === 'fr' ? 'Contributeurs' : 'Contributors' },
    { icon: FiDownload, value: t.stats.downloads, label: language === 'fr' ? 'Téléchargements' : 'Downloads' },
    { icon: FiCloud, value: t.stats.uptime, label: language === 'fr' ? 'Disponibilité' : 'Uptime' },
    { icon: FiShield, value: t.stats.securityScore, label: language === 'fr' ? 'Sécurité' : 'Security' }
  ];

  // Documentation
  const documentation = [
    { icon: FiFileText, title: t.documentation.apiDocs, description: language === 'fr' ? 'Documentation API complète' : 'Complete API documentation' },
    { icon: FiBook, title: t.documentation.integrationGuide, description: language === 'fr' ? 'Guide d\'intégration étape par étape' : 'Step-by-step integration guide' },
    { icon: FiCode, title: t.documentation.examples, description: language === 'fr' ? 'Exemples concrets d\'utilisation' : 'Practical usage examples' },
    { icon: FiBarChart2, title: t.documentation.benchmarks, description: language === 'fr' ? 'Comparaisons de performances' : 'Performance comparisons' },
    { icon: FiShield, title: t.documentation.securityAudit, description: language === 'fr' ? 'Rapport d\'audit de sécurité' : 'Security audit report' }
  ];

  const handleDownload = async (language: Language, algorithmId: string) => {
    setIsDownloading(true);
    
    // Simuler le téléchargement
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Logique de téléchargement
    const content = `// ABFVision ${algorithmId} - ${language.name} ${language.version}\n// Téléchargé le ${new Date().toLocaleDateString()}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `abfvision-${algorithmId}-${language.id}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    setIsDownloading(false);
  };

  const handleSelectLanguage = (langId: string) => {
    const lang = languages.find(l => l.id === langId);
    if (lang) setSelectedLanguage(lang);
  };

  const handleToggleAlgorithm = (algorithmId: string) => {
    setExpandedAlgorithm(expandedAlgorithm === algorithmId ? null : algorithmId);
    setSelectedAlgorithm(algorithmId);
    // Sélectionner Rust par défaut quand on ouvre un algorithme
    if (expandedAlgorithm !== algorithmId) {
      setSelectedLanguage(languages.find(l => l.id === 'rust') || null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E2430] via-[#1A1F2E] to-[#1E2430] pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#9AAEFF]/10 border border-[#9AAEFF]/20 rounded-full mb-6"
          >
            <Binary className="w-4 h-4 text-[#9AAEFF]" />
            <span className="text-[#9AAEFF] text-sm font-light uppercase tracking-widest">
              {t.title}
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-4">
            {language === 'fr' ? 'Moteurs Intelligents' : 'Intelligent Engines'}
          </h1>
          <p className="text-xl text-[#98A2B3] font-light max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 justify-center mb-8"
        >
          {Object.entries(t.sections).map(([key, value]) => (
            <motion.button
              key={key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveSection(key as any)}
              className={`px-6 py-3 rounded-lg font-light transition-all ${
                activeSection === key
                  ? 'bg-[#9AAEFF] text-[#1E2430]'
                  : 'border border-[#9AAEFF]/20 text-[#9AAEFF] hover:bg-[#9AAEFF]/10'
              }`}
            >
              {value}
            </motion.button>
          ))}
        </motion.div>

        {/* Statistiques */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-[#1E2430]/60 border border-[#9AAEFF]/20 rounded-xl p-4 text-center backdrop-blur-sm"
              >
                <div className="w-8 h-8 bg-[#9AAEFF]/10 border border-[#9AAEFF]/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Icon className="w-4 h-4 text-[#9AAEFF]" />
                </div>
                <div className="text-2xl font-light text-white mb-1">{stat.value}</div>
                <div className="text-xs text-[#98A2B3] font-light">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Algorithmes */}
        <div className="max-w-6xl mx-auto mb-12">
          {algorithms.map((algorithm, index) => (
            <motion.div
              key={algorithm.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.2 }}
              className="mb-6"
            >
              <AlgorithmCard
                algorithm={algorithm}
                isExpanded={expandedAlgorithm === algorithm.id}
                onToggle={() => handleToggleAlgorithm(algorithm.id)}
                selectedLanguage={selectedLanguage}
                onSelectLanguage={handleSelectLanguage}
                languages={languages}
                onDownload={handleDownload}
                isDownloading={isDownloading}
                language={language}
              />
            </motion.div>
          ))}
        </div>

        {/* Documentation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-light text-white mb-3">{t.documentation.title}</h2>
            <p className="text-[#98A2B3] font-light">
              {language === 'fr'
                ? 'Toutes les ressources pour intégrer nos algorithmes'
                : 'All resources to integrate our algorithms'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {documentation.map((doc, index) => {
              const Icon = doc.icon;
              return (
                <motion.a
                  key={doc.title}
                  href="#"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-[#1E2430]/60 border border-[#9AAEFF]/20 rounded-xl p-4 text-center backdrop-blur-sm hover:border-[#9AAEFF]/40 transition-all group"
                >
                  <div className="w-10 h-10 bg-[#9AAEFF]/10 border border-[#9AAEFF]/20 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-[#9AAEFF]/20 transition-colors">
                    <Icon className="w-5 h-5 text-[#9AAEFF]" />
                  </div>
                  <h3 className="text-white font-light mb-2">{doc.title}</h3>
                  <p className="text-sm text-[#98A2B3] font-light">{doc.description}</p>
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center pt-8 border-t border-[#9AAEFF]/10"
        >
          <h3 className="text-2xl font-light text-white mb-4">
            {language === 'fr'
              ? 'Prêt à intégrer nos algorithmes ?'
              : 'Ready to integrate our algorithms?'}
          </h3>
          <p className="text-[#98A2B3] font-light mb-8 max-w-2xl mx-auto">
            {language === 'fr'
              ? 'Rejoignez des centaines de développeurs qui utilisent déjà nos moteurs de traitement'
              : 'Join hundreds of developers already using our processing engines'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#9AAEFF] text-[#1E2430] px-8 py-4 rounded-lg font-light flex items-center gap-3"
            >
              <Github className="w-5 h-5" />
              {t.cta.viewSource}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-[#9AAEFF] text-[#9AAEFF] px-8 py-4 rounded-lg font-light flex items-center gap-3 bg-[#9AAEFF]/10 hover:bg-[#9AAEFF]/20 transition-all"
            >
              <Terminal className="w-5 h-5" />
              {t.cta.tryDemo}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Icône Coffee pour Java
const FiCoffee = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 6h-2v2h2v2h-2v2h2v2h-2v2h2v2h-2v2h2v2h-6v2h10v-12c0-2.21-1.79-4-4-4h-2v2h2c1.1 0 2 .9 2 2v2zm-2 2h-2v2h2v-2zm0 4h-2v2h2v-2zm0 4h-2v2h2v-2z" />
    <path d="M2 6h2v12h12v2h-12c-1.1 0-2-.9-2-2v-12zm2 2v8h8v-8h-8z" />
  </svg>
);

// Icône ChevronDown
const ChevronDown = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

export default AlgorithmsSection;