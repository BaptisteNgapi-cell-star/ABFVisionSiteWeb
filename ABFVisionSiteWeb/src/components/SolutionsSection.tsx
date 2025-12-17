// components/SolutionsSection.tsx
import React, { useState } from 'react';
import { motion , AnimatePresence } from 'framer-motion';
import { 
  FiUsers, 
  FiUser, 
  FiSmartphone, 
  FiCheckCircle,
  FiArrowRight,
  FiBook,
  FiBarChart2,
  FiShield,
  FiClock,
  FiTrendingUp,
  FiCpu,
  FiCode,
  FiLayers,
  FiDownload,
  FiGlobe
} from 'react-icons/fi';
import AlgorithmsSection from './Algorithme';
import TemplatesSection from './Template';

interface SolutionsSectionProps {
  language: 'fr' | 'en';
  onNavigate: (section: string) => void;
}

// Sous-composant pour la section principale
const MainSolutionsContent: React.FC<{
  language: 'fr' | 'en';
  onNavigate: (section: string) => void;
  onShowAlgorithms: () => void;
  onShowTemplates: () => void;
}> = ({ language, onNavigate, onShowAlgorithms, onShowTemplates }) => {
  const solutions = [
    {
      icon: FiUsers,
      title: language === 'fr' ? 'Pour les Établissements' : 'For Institutions',
      description: language === 'fr' 
        ? 'Gestion complète de votre établissement avec des outils dédiés à l\'administration, la pédagogie et la communication.'
        : 'Complete management of your institution with dedicated tools for administration, pedagogy and communication.',
      features: [
        language === 'fr' ? 'Gestion administrative centralisée' : 'Centralized administrative management',
        language === 'fr' ? 'Suivi pédagogique avancé' : 'Advanced pedagogical monitoring',
        language === 'fr' ? 'Communication unifiée' : 'Unified communication',
        language === 'fr' ? 'Rapports et analytics' : 'Reports and analytics'
      ],
      color: '#9AAEFF',
      gradient: 'from-[#9AAEFF] to-[#7B93FF]',
      stats: [
        { value: '+40%', label: language === 'fr' ? 'Efficacité' : 'Efficiency' },
        { value: '-60%', label: language === 'fr' ? 'Temps administratif' : 'Admin Time' }
      ]
    },
    {
      icon: FiUser,
      title: language === 'fr' ? 'Pour les Enseignants' : 'For Teachers',
      description: language === 'fr' 
        ? 'Optimisez votre temps avec des outils de gestion de classe, de notation et de communication avec les parents.'
        : 'Optimize your time with classroom management, grading and parent communication tools.',
      features: [
        language === 'fr' ? 'Gestion des emplois du temps' : 'Schedule management',
        language === 'fr' ? 'Saisie et analyse des notes' : 'Grade entry and analysis',
        language === 'fr' ? 'Communication avec les familles' : 'Communication with families',
        language === 'fr' ? 'Ressources pédagogiques' : 'Educational resources'
      ],
      color: '#34D399',
      gradient: 'from-[#34D399] to-[#10B981]',
      stats: [
        { value: '+50%', label: language === 'fr' ? 'Productivité' : 'Productivity' },
        { value: '-70%', label: language === 'fr' ? 'Tâches répétitives' : 'Repetitive Tasks' }
      ]
    },
    {
      icon: FiSmartphone,
      title: language === 'fr' ? 'Pour les Parents' : 'For Parents',
      description: language === 'fr' 
        ? 'Restez connecté avec la scolarité de vos enfants grâce à notre application mobile dédiée.'
        : 'Stay connected with your children\'s schooling through our dedicated mobile app.',
      features: [
        language === 'fr' ? 'Suivi en temps réel' : 'Real-time monitoring',
        language === 'fr' ? 'Notifications instantanées' : 'Instant notifications',
        language === 'fr' ? 'Communication directe' : 'Direct communication',
        language === 'fr' ? 'Agenda partagé' : 'Shared calendar'
      ],
      color: '#F59E0B',
      gradient: 'from-[#F59E0B] to-[#D97706]',
      stats: [
        { value: '+90%', label: language === 'fr' ? 'Satisfaction' : 'Satisfaction' },
        { value: '24/7', label: language === 'fr' ? 'Accessibilité' : 'Accessibility' }
      ]
    }
  ];

  const features = [
    {
      icon: FiShield,
      title: language === 'fr' ? 'Sécurité Maximale' : 'Maximum Security',
      description: language === 'fr' 
        ? 'Vos données sont protégées avec les standards les plus élevés de chiffrement et de confidentialité.'
        : 'Your data is protected with the highest standards of encryption and confidentiality.'
    },
    {
      icon: FiBarChart2,
      title: language === 'fr' ? 'Analyses Avancées' : 'Advanced Analytics',
      description: language === 'fr' 
        ? 'Des tableaux de bord complets pour prendre des décisions éclairées basées sur les données.'
        : 'Comprehensive dashboards to make informed decisions based on data.'
    },
    {
      icon: FiClock,
      title: language === 'fr' ? 'Gain de Temps' : 'Time Saving',
      description: language === 'fr' 
        ? 'Automatisez les tâches répétitives et concentrez-vous sur l\'essentiel.'
        : 'Automate repetitive tasks and focus on what matters.'
    },
    {
      icon: FiTrendingUp,
      title: language === 'fr' ? 'Évolutivité' : 'Scalability',
      description: language === 'fr' 
        ? 'Une solution qui grandit avec vous, de la petite école au grand campus.'
        : 'A solution that grows with you, from small school to large campus.'
    }
  ];

  const technicalFeatures = [
    {
      icon: FiCpu,
      title: language === 'fr' ? 'Algorithms Avancés' : 'Advanced Algorithms',
      description: language === 'fr' 
        ? 'Nos moteurs de traitement optimisent chaque aspect de la gestion scolaire.'
        : 'Our processing engines optimize every aspect of school management.',
      action: onShowAlgorithms,
      color: '#9AAEFF'
    },
    {
      icon: FiLayers,
      title: language === 'fr' ? 'Templates Professionnels' : 'Professional Templates',
      description: language === 'fr' 
        ? 'Bibliothèque complète de modèles pour tous vos documents administratifs.'
        : 'Complete library of templates for all your administrative documents.',
      action: onShowTemplates,
      color: '#34D399'
    },
    {
      icon: FiCode,
      title: language === 'fr' ? 'API & Intégrations' : 'API & Integrations',
      description: language === 'fr' 
        ? 'Connectez ABFVision à vos outils existants via notre API robuste.'
        : 'Connect ABFVision to your existing tools via our robust API.',
      action: () => onNavigate('documentation'),
      color: '#F59E0B'
    },
    {
      icon: FiDownload,
      title: language === 'fr' ? 'Téléchargements' : 'Downloads',
      description: language === 'fr' 
        ? 'Accédez à toutes nos ressources techniques et documentations.'
        : 'Access all our technical resources and documentation.',
      action: () => onNavigate('downloads'),
      color: '#8B5CF6'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E2430] via-[#1A1F2E] to-[#1E2430] pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#9AAEFF]/10 border border-[#9AAEFF]/20 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-1.5 h-1.5 bg-[#9AAEFF] rounded-full" />
            <span className="text-[#9AAEFF] text-sm font-light uppercase tracking-widest">
              {language === 'fr' ? 'Nos Solutions' : 'Our Solutions'}
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-4">
            {language === 'fr' ? 'Solutions Complètes' : 'Complete Solutions'}
          </h1>
          <p className="text-xl text-[#98A2B3] font-light max-w-3xl mx-auto">
            {language === 'fr' 
              ? 'Une plateforme intégrée avec des outils avancés pour chaque aspect de la gestion scolaire'
              : 'An integrated platform with advanced tools for every aspect of school management'}
          </p>
        </motion.div>

        {/* Section Technique */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-4">
              {language === 'fr' ? 'Outils Techniques Avancés' : 'Advanced Technical Tools'}
            </h2>
            <p className="text-lg text-[#98A2B3] font-light max-w-2xl mx-auto">
              {language === 'fr' 
                ? 'Découvrez nos technologies brevetées et ressources téléchargeables'
                : 'Discover our patented technologies and downloadable resources'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {technicalFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-[#1B1F27]/60 rounded-2xl border border-[#9AAEFF]/10 p-6 backdrop-blur-sm hover:border-[#9AAEFF]/20 transition-all duration-300 cursor-pointer"
                  onClick={feature.action}
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: `${feature.color}20`, border: `1px solid ${feature.color}30` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: feature.color }} />
                  </div>
                  <h3 className="text-lg font-light text-white mb-3 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-[#98A2B3] font-light text-sm leading-relaxed text-center">
                    {feature.description}
                  </p>
                  <div className="flex justify-center mt-4">
                    <div className="w-8 h-0.5 rounded-full" style={{ backgroundColor: feature.color }} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Grille des solutions principales */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className="group relative bg-[#1B1F27]/80 rounded-2xl border border-[#9AAEFF]/20 p-8 backdrop-blur-sm hover:border-[#9AAEFF]/40 transition-all duration-500 overflow-hidden"
              >
                {/* Effet de fond animé */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                  style={{ background: `linear-gradient(45deg, ${solution.color}20, transparent)` }}
                />
                
                {/* Icône */}
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10"
                  style={{ 
                    backgroundColor: `${solution.color}20`, 
                    border: `1px solid ${solution.color}30` 
                  }}
                >
                  <Icon className="w-8 h-8" style={{ color: solution.color }} />
                </div>

                {/* Titre */}
                <h3 className="text-2xl font-light text-white mb-4 relative z-10">
                  {solution.title}
                </h3>

                {/* Description */}
                <p className="text-[#98A2B3] font-light leading-relaxed mb-6 relative z-10">
                  {solution.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-6 relative z-10">
                  {solution.features.map((feature, featureIndex) => (
                    <motion.li 
                      key={feature} 
                      className="flex items-center gap-3 text-[#98A2B3] font-light"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 + featureIndex * 0.1 }}
                    >
                      <FiCheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: solution.color }} />
                      <span className="text-sm">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Statistiques */}
                <div className="flex gap-4 mb-6 relative z-10">
                  {solution.stats.map((stat, statIndex) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.2 + statIndex * 0.2 }}
                      className="text-center"
                    >
                      <div 
                        className="text-lg font-light mb-1"
                        style={{ color: solution.color }}
                      >
                        {stat.value}
                      </div>
                      <div className="text-xs text-[#98A2B3] font-light">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Bouton d'action */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate('logiciels')}
                  className="w-full py-3 rounded-lg font-light transition-all duration-300 border flex items-center justify-center gap-2 relative z-10"
                  style={{ 
                    backgroundColor: `${solution.color}10`,
                    borderColor: `${solution.color}30`,
                    color: solution.color
                  }}
                >
                  {language === 'fr' ? 'Découvrir' : 'Discover'}
                  <FiArrowRight size={16} />
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        {/* Section Fonctionnalités principales */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-6xl mx-auto mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-4">
              {language === 'fr' ? 'Pourquoi Choisir ABFVision ?' : 'Why Choose ABFVision?'}
            </h2>
            <p className="text-lg text-[#98A2B3] font-light max-w-2xl mx-auto">
              {language === 'fr' 
                ? 'Une plateforme complète qui répond à tous vos besoins en gestion scolaire'
                : 'A complete platform that meets all your school management needs'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-[#1B1F27]/60 rounded-2xl border border-[#9AAEFF]/10 p-6 text-center backdrop-blur-sm hover:border-[#9AAEFF]/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-[#9AAEFF]/10 border border-[#9AAEFF]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-[#9AAEFF]" />
                  </div>
                  <h3 className="text-lg font-light text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-[#98A2B3] font-light text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Stats Globales */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-20"
        >
          <div className="bg-[#1B1F27]/60 border border-[#9AAEFF]/20 rounded-2xl p-8 backdrop-blur-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: FiGlobe, value: '150+', label: language === 'fr' ? 'Établissements' : 'Institutions' },
                { icon: FiUsers, value: '50K+', label: language === 'fr' ? 'Utilisateurs' : 'Users' },
                { icon: FiDownload, value: '10K+', label: language === 'fr' ? 'Téléchargements' : 'Downloads' },
                { icon: FiCheckCircle, value: '98%', label: language === 'fr' ? 'Satisfaction' : 'Satisfaction' }
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-12 h-12 bg-[#9AAEFF]/10 border border-[#9AAEFF]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-[#9AAEFF]" />
                    </div>
                    <div className="text-3xl font-light text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-[#98A2B3] font-light">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center"
        >
          <h3 className="text-2xl sm:text-3xl font-light text-white mb-4">
            {language === 'fr' 
              ? 'Prêt à transformer votre établissement ?' 
              : 'Ready to transform your institution?'}
          </h3>
          <p className="text-[#98A2B3] font-light mb-8 max-w-2xl mx-auto">
            {language === 'fr'
              ? 'Rejoignez les centaines d\'établissements qui font déjà confiance à ABFVision'
              : 'Join the hundreds of institutions that already trust ABFVision'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('logiciels')}
              className="bg-[#9AAEFF] text-[#1E2430] px-8 py-4 rounded-lg font-light flex items-center gap-3 text-lg"
            >
              <FiBook size={20} />
              {language === 'fr' ? 'Découvrir nos solutions' : 'Discover our solutions'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('contact')}
              className="border border-[#9AAEFF] text-[#9AAEFF] px-8 py-4 rounded-lg font-light flex items-center gap-3 text-lg bg-[#9AAEFF]/10 hover:bg-[#9AAEFF]/20 transition-all duration-300"
            >
              <FiUsers size={20} />
              {language === 'fr' ? 'Demander une démo' : 'Request a demo'}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Composant principal SolutionsSection
const SolutionsSection: React.FC<SolutionsSectionProps> = ({ 
  language, 
  onNavigate 
}) => {
  const [activeView, setActiveView] = useState<'main' | 'algorithms' | 'templates'>('main');

  // Retour à la vue principale
  const handleBackToMain = () => {
    setActiveView('main');
  };

  // Afficher la section algorithmes
  const handleShowAlgorithms = () => {
    setActiveView('algorithms');
  };

  // Afficher la section templates
  const handleShowTemplates = () => {
    setActiveView('templates');
  };

  // Navigation avec gestion de l'historique
  const handleNavigate = (section: string) => {
    if (activeView !== 'main') {
      setActiveView('main');
      // Petit délai pour laisser l'animation se terminer
      setTimeout(() => {
        onNavigate(section);
      }, 300);
    } else {
      onNavigate(section);
    }
  };

  // Barre de navigation pour les sous-sections
  const NavigationBar = () => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-16 z-40 bg-[#1E2430]/90 backdrop-blur-lg border-b border-[#9AAEFF]/20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={handleBackToMain}
            className="flex items-center gap-2 text-[#9AAEFF] hover:text-[#9AAEFF]/80 transition-colors"
          >
            <FiArrowRight className="w-4 h-4 rotate-180" />
            <span className="font-light">
              {language === 'fr' ? 'Retour aux solutions' : 'Back to solutions'}
            </span>
          </button>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveView('algorithms')}
              className={`px-4 py-2 rounded-lg font-light transition-all ${
                activeView === 'algorithms'
                  ? 'bg-[#9AAEFF] text-[#1E2430]'
                  : 'text-[#98A2B3] hover:text-white hover:bg-white/5'
              }`}
            >
              {language === 'fr' ? 'Algorithms' : 'Algorithms'}
            </button>
            <button
              onClick={() => setActiveView('templates')}
              className={`px-4 py-2 rounded-lg font-light transition-all ${
                activeView === 'templates'
                  ? 'bg-[#9AAEFF] text-[#1E2430]'
                  : 'text-[#98A2B3] hover:text-white hover:bg-white/5'
              }`}
            >
              {language === 'fr' ? 'Templates' : 'Templates'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <>
      {activeView !== 'main' && <NavigationBar />}
      
      <AnimatePresence mode="wait">
        {activeView === 'main' && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <MainSolutionsContent
              language={language}
              onNavigate={handleNavigate}
              onShowAlgorithms={handleShowAlgorithms}
              onShowTemplates={handleShowTemplates}
            />
          </motion.div>
        )}

        {activeView === 'algorithms' && (
          <motion.div
            key="algorithms"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AlgorithmsSection language={language} />
          </motion.div>
        )}

        {activeView === 'templates' && (
          <motion.div
            key="templates"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TemplatesSection language={language} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};


export default SolutionsSection;