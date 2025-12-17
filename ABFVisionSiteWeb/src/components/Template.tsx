// components/TemplatesSection.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiFileText, FiCreditCard, FiDownload,
  FiSearch, FiFilter, FiEye, FiCopy, FiEdit3,
  FiCheck, FiStar, FiThumbsUp, FiShare2, FiGrid,
  FiList, FiChevronRight, FiPlus, FiCalendar,
  FiUser, FiDollarSign, FiTag,
  FiPrinter, FiMail, FiSave, FiLock
} from 'react-icons/fi';
import {
  FileText, CreditCard, Receipt, Download,
  Search, Filter, Eye, Copy, Edit3,Building,
  Check, Star, ThumbsUp, Share2, Grid,
  List, ChevronRight, Plus, Calendar,
  User, DollarSign, Tag,
  Printer, Mail, Save, Lock, QrCode,
  Image, Palette, Layers, Zap,
  BarChart, TrendingUp, Users, Shield,
} from 'lucide-react';

// Traductions
const translations = {
  fr: {
    title: "Bibliothèque de Templates ABFVision",
    subtitle: "Modèles professionnels pour tous vos documents administratifs",
    
    // Navigation
    categories: {
      all: "Tous les templates",
      invoices: "Factures",
      studentCards: "Cartes étudiantes",
      receipts: "Reçus de paiement",
      certificates: "Certificats",
      reports: "Rapports",
      letters: "Lettres officielles"
    },
    
    // Templates
    templates: {
      invoice: {
        title: "Facture professionnelle",
        description: "Template de facture avec calcul automatique des taxes et totaux",
        features: ["Calcul TVA", "Numérotation automatique", "Signature numérique", "QR Code"]
      },
      studentCard: {
        title: "Carte étudiante moderne",
        description: "Design sécurisé avec photo et informations personnalisables",
        features: ["Photo intégrée", "QR Code unique", "Design sécurisé", "Validité date"]
      },
      receipt: {
        title: "Reçu de paiement",
        description: "Reçu officiel avec détails de paiement et référence",
        features: ["Numéro unique", "Détails paiement", "Signature", "Archivage"]
      }
    },
    
    // Filtres
    filters: {
      sortBy: "Trier par",
      popularity: "Popularité",
      recent: "Récents",
      downloads: "Téléchargements",
      rating: "Note",
      free: "Gratuit",
      premium: "Premium",
      searchPlaceholder: "Rechercher un template..."
    },
    
    // Stats
    stats: {
      totalTemplates: "Templates disponibles",
      downloads: "Téléchargements",
      activeUsers: "Utilisateurs actifs",
      avgRating: "Note moyenne"
    },
    
    // Preview
    preview: {
      title: "Aperçu",
      download: "Télécharger",
      customize: "Personnaliser",
      useTemplate: "Utiliser ce template",
      compatibleWith: "Compatible avec"
    },
    
    // Customization
    customization: {
      title: "Personnalisation",
      colors: "Couleurs",
      fonts: "Polices",
      logo: "Logo",
      fields: "Champs",
      preview: "Aperçu en direct"
    },
    
    // CTA
    cta: {
      exploreAll: "Explorer tous les templates",
      createCustom: "Créer un template personnalisé",
      contactDesigner: "Contacter un designer",
      bulkDownload: "Télécharger en lot"
    }
  },
  en: {
    title: "ABFVision Templates Library",
    subtitle: "Professional templates for all your administrative documents",
    
    categories: {
      all: "All Templates",
      invoices: "Invoices",
      studentCards: "Student Cards",
      receipts: "Payment Receipts",
      certificates: "Certificates",
      reports: "Reports",
      letters: "Official Letters"
    },
    
    templates: {
      invoice: {
        title: "Professional Invoice",
        description: "Invoice template with automatic tax and total calculation",
        features: ["VAT calculation", "Auto numbering", "Digital signature", "QR Code"]
      },
      studentCard: {
        title: "Modern Student Card",
        description: "Secure design with photo and customizable information",
        features: ["Integrated photo", "Unique QR Code", "Secure design", "Validity date"]
      },
      receipt: {
        title: "Payment Receipt",
        description: "Official receipt with payment details and reference",
        features: ["Unique number", "Payment details", "Signature", "Archiving"]
      }
    },
    
    filters: {
      sortBy: "Sort by",
      popularity: "Popularity",
      recent: "Recent",
      downloads: "Downloads",
      rating: "Rating",
      free: "Free",
      premium: "Premium",
      searchPlaceholder: "Search template..."
    },
    
    stats: {
      totalTemplates: "Available Templates",
      downloads: "Downloads",
      activeUsers: "Active Users",
      avgRating: "Average Rating"
    },
    
    preview: {
      title: "Preview",
      download: "Download",
      customize: "Customize",
      useTemplate: "Use Template",
      compatibleWith: "Compatible with"
    },
    
    customization: {
      title: "Customization",
      colors: "Colors",
      fonts: "Fonts",
      logo: "Logo",
      fields: "Fields",
      preview: "Live Preview"
    },
    
    cta: {
      exploreAll: "Explore All Templates",
      createCustom: "Create Custom Template",
      contactDesigner: "Contact Designer",
      bulkDownload: "Bulk Download"
    }
  }
};

// Types
interface Template {
  id: string;
  name: string;
  description: string;
  category: 'invoice' | 'studentCard' | 'receipt' | 'certificate' | 'report' | 'letter';
  type: 'free' | 'premium';
  downloads: number;
  rating: number;
  featured: boolean;
  tags: string[];
  previewColor: string;
  icon: React.ComponentType;
  formats: string[];
  lastUpdated: string;
  size: string;
  author: string;
  compatibility: string[];
}

interface Category {
  id: string;
  name: string;
  icon: React.ComponentType;
  count: number;
  color: string;
}

// Composants
const CategoryCard: React.FC<{
  category: Category;
  isActive: boolean;
  onClick: () => void;
  language: 'fr' | 'en';
}> = ({ category, isActive, onClick, language }) => {
  const Icon = category.icon;

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative p-4 rounded-xl border transition-all duration-300 text-center ${
        isActive
          ? 'border-[#9AAEFF] bg-[#9AAEFF]/10'
          : 'border-[#9AAEFF]/20 hover:border-[#9AAEFF]/40 bg-[#1E2430]/60'
      }`}
    >
      {/* Badge de comptage */}
      <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#9AAEFF] text-[#1E2430] text-xs font-bold rounded-full flex items-center justify-center">
        {category.count}
      </div>

      {/* Icône */}
      <div 
        className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3"
        style={{ backgroundColor: `${category.color}20`, border: `1px solid ${category.color}30` }}
      >
        <Icon className="w-6 h-6" style={{ color: category.color }} />
      </div>

      {/* Nom */}
      <h3 className="text-white font-medium mb-1">{category.name}</h3>
      
      {/* Indicateur actif */}
      {isActive && (
        <div className="w-1.5 h-1.5 bg-[#9AAEFF] rounded-full mx-auto mt-2" />
      )}
    </motion.button>
  );
};

const TemplateCard: React.FC<{
  template: Template;
  onPreview: (template: Template) => void;
  onDownload: (template: Template) => void;
  language: 'fr' | 'en';
}> = ({ template, onPreview, onDownload, language }) => {
  const Icon = template.icon;
  const t = translations[language].templates[template.category];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group bg-[#1E2430]/80 backdrop-blur-sm border border-[#9AAEFF]/20 rounded-2xl overflow-hidden hover:border-[#9AAEFF]/40 transition-all duration-300"
    >
      {/* En-tête avec couleur */}
      <div 
        className="h-2 w-full"
        style={{ backgroundColor: template.previewColor }}
      />

      <div className="p-5">
        {/* En-tête */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${template.previewColor}20`, border: `1px solid ${template.previewColor}30` }}
            >
              <Icon className="w-5 h-5" style={{ color: template.previewColor }} />
            </div>
            <div>
              <h3 className="text-white font-medium">{template.name}</h3>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 text-xs rounded-full ${
                  template.type === 'premium'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-green-500/20 text-green-400 border border-green-500/30'
                }`}>
                  {template.type === 'premium' ? 'PREMIUM' : 'GRATUIT'}
                </span>
                {template.featured && (
                  <span className="px-2 py-0.5 bg-[#9AAEFF]/20 text-[#9AAEFF] text-xs rounded-full border border-[#9AAEFF]/30">
                    POPULAIRE
                  </span>
                )}
              </div>
            </div>
          </div>
          
          {/* Rating */}
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-white text-sm font-medium">{template.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-[#98A2B3] text-sm mb-4 line-clamp-2">
          {t.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {template.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-[#2A3040] text-[#98A2B3] rounded border border-[#9AAEFF]/10"
            >
              {tag}
            </span>
          ))}
          {template.tags.length > 3 && (
            <span className="px-2 py-1 text-xs bg-[#2A3040] text-[#98A2B3] rounded border border-[#9AAEFF]/10">
              +{template.tags.length - 3}
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-[#98A2B3] mb-4">
          <div className="flex items-center gap-1">
            <Download className="w-3 h-3" />
            <span>{template.downloads.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{new Date(template.lastUpdated).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')}</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            <span>{template.author}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPreview(template)}
            className="flex-1 py-2 border border-[#9AAEFF]/20 text-[#9AAEFF] rounded-lg text-sm font-medium hover:bg-[#9AAEFF]/10 transition-colors flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            {language === 'fr' ? 'Aperçu' : 'Preview'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDownload(template)}
            className="flex-1 py-2 bg-[#9AAEFF] text-[#1E2430] rounded-lg text-sm font-medium hover:bg-[#9AAEFF]/90 transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            {language === 'fr' ? 'Télécharger' : 'Download'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const TemplatePreviewModal: React.FC<{
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
  onDownload: (template: Template) => void;
  language: 'fr' | 'en';
}> = ({ template, isOpen, onClose, onDownload, language }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'customize' | 'info'>('preview');
  const [selectedFormat, setSelectedFormat] = useState<string>('PDF');

  if (!template) return null;

  const t = translations[language].templates[template.category];
  const previewT = translations[language].preview;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#1E2430] border border-[#9AAEFF]/20 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* En-tête */}
            <div className="flex items-center justify-between p-6 border-b border-[#9AAEFF]/20">
              <div>
                <h2 className="text-2xl font-light text-white">{template.name}</h2>
                <p className="text-[#9AAEFF] font-light">{t.title}</p>
              </div>
              <button
                onClick={onClose}
                className="text-[#98A2B3] hover:text-white transition-colors p-2"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation */}
            <div className="flex border-b border-[#9AAEFF]/20">
              {(['preview', 'customize', 'info'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 font-medium transition-colors ${
                    activeTab === tab
                      ? 'text-[#9AAEFF] border-b-2 border-[#9AAEFF]'
                      : 'text-[#98A2B3] hover:text-white'
                  }`}
                >
                  {tab === 'preview' ? previewT.title : 
                   tab === 'customize' ? translations[language].customization.title : 
                   language === 'fr' ? 'Informations' : 'Information'}
                </button>
              ))}
            </div>

            <div className="flex h-[60vh]">
              {/* Panneau gauche */}
              <div className="flex-1 p-6 overflow-y-auto">
                <AnimatePresence mode="wait">
                  {activeTab === 'preview' && (
                    <motion.div
                      key="preview"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      {/* Description */}
                      <div>
                        <h3 className="text-white font-medium mb-2">Description</h3>
                        <p className="text-[#98A2B3]">{t.description}</p>
                      </div>

                      {/* Fonctionnalités */}
                      <div>
                        <h3 className="text-white font-medium mb-3">Fonctionnalités</h3>
                        <ul className="space-y-2">
                          {t.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2 text-[#98A2B3]">
                              <Check className="w-4 h-4 text-green-400" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Formats */}
                      <div>
                        <h3 className="text-white font-medium mb-3">Formats disponibles</h3>
                        <div className="flex flex-wrap gap-2">
                          {template.formats.map((format) => (
                            <button
                              key={format}
                              onClick={() => setSelectedFormat(format)}
                              className={`px-3 py-2 rounded-lg border transition-colors ${
                                selectedFormat === format
                                  ? 'border-[#9AAEFF] bg-[#9AAEFF]/10 text-[#9AAEFF]'
                                  : 'border-[#9AAEFF]/20 text-[#98A2B3] hover:border-[#9AAEFF]/40'
                              }`}
                            >
                              {format}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Compatibilité */}
                      <div>
                        <h3 className="text-white font-medium mb-2">{previewT.compatibleWith}</h3>
                        <div className="flex flex-wrap gap-2">
                          {template.compatibility.map((app, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs bg-[#2A3040] text-[#98A2B3] rounded border border-[#9AAEFF]/10"
                            >
                              {app}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'customize' && (
                    <motion.div
                      key="customize"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      {/* Couleurs */}
                      <div>
                        <h3 className="text-white font-medium mb-3">{translations[language].customization.colors}</h3>
                        <div className="flex flex-wrap gap-3">
                          {['#9AAEFF', '#34D399', '#F59E0B', '#EF4444', '#8B5CF6'].map((color) => (
                            <button
                              key={color}
                              className="w-8 h-8 rounded-full border-2 border-white/20 hover:scale-110 transition-transform"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Polices */}
                      <div>
                        <h3 className="text-white font-medium mb-3">{translations[language].customization.fonts}</h3>
                        <div className="space-y-2">
                          {['Inter', 'Roboto', 'Montserrat', 'Open Sans', 'Poppins'].map((font) => (
                            <button
                              key={font}
                              className="w-full p-3 rounded-lg border border-[#9AAEFF]/20 text-left hover:border-[#9AAEFF]/40 transition-colors"
                            >
                              <span className="text-white" style={{ fontFamily: font }}>{font}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'info' && (
                    <motion.div
                      key="info"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      {/* Détails techniques */}
                      <div>
                        <h3 className="text-white font-medium mb-3">Détails techniques</h3>
                        <div className="space-y-3">
                          {[
                            { label: 'Taille', value: template.size },
                            { label: 'Dernière mise à jour', value: new Date(template.lastUpdated).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US') },
                            { label: 'Auteur', value: template.author },
                            { label: 'Version', value: '2.4.1' },
                            { label: 'Licence', value: template.type === 'premium' ? 'Propriétaire' : 'Creative Commons' }
                          ].map((item) => (
                            <div key={item.label} className="flex justify-between">
                              <span className="text-[#98A2B3]">{item.label}</span>
                              <span className="text-white">{item.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Panneau droit - Aperçu */}
              <div className="w-2/3 border-l border-[#9AAEFF]/20 p-6 overflow-auto bg-[#2A3040]/30">
                {/* Conteneur d'aperçu */}
                <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md mx-auto">
                  {/* Simuler le template selon la catégorie */}
                  {template.category === 'invoice' && (
                    <div className="text-gray-800">
                      <div className="flex justify-between items-start mb-8">
                        <div>
                          <div className="text-2xl font-bold text-[#9AAEFF]">FACTURE</div>
                          <div className="text-sm text-gray-500">N° INV-2025-00123</div>
                        </div>
                        <QrCode className="w-16 h-16 text-gray-400" />
                      </div>
                      
                      <div className="space-y-4 mb-8">
                        <div>
                          <div className="text-sm text-gray-500">Établissement</div>
                          <div className="font-medium">Lycée Descartes</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Client</div>
                          <div className="font-medium">Parent d'élève</div>
                        </div>
                      </div>

                      <table className="w-full mb-8">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Description</th>
                            <th className="text-right py-2">Montant</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="py-2">Frais de scolarité</td>
                            <td className="text-right py-2">€500,00</td>
                          </tr>
                          <tr className="border-t">
                            <td className="py-2 font-bold">TOTAL</td>
                            <td className="text-right py-2 font-bold">€500,00</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}

                  {template.category === 'studentCard' && (
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gray-300 rounded-full" />
                        <div>
                          <div className="text-lg font-bold text-gray-800">ÉTUDIANT</div>
                          <div className="text-sm text-gray-600">Lycée Descartes</div>
                        </div>
                      </div>
                      
                      <div className="space-y-3 mb-6">
                        <div>
                          <div className="text-xs text-gray-500">Nom complet</div>
                          <div className="font-medium">Jean Dupont</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">N° étudiant</div>
                          <div className="font-medium">ETU-2025-001</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Validité</div>
                          <div className="font-medium">2025-2026</div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="text-xs text-gray-500">ABFVision ID</div>
                        <QrCode className="w-12 h-12" />
                      </div>
                    </div>
                  )}

                  {template.category === 'receipt' && (
                    <div className="text-gray-800">
                      <div className="text-center mb-6">
                        <div className="text-xl font-bold text-green-600">REÇU DE PAIEMENT</div>
                        <div className="text-sm text-gray-500">N° REC-2025-04567</div>
                      </div>
                      
                      <div className="space-y-4 mb-6">
                        <div>
                          <div className="text-sm text-gray-500">Reçu de</div>
                          <div className="font-medium">Lycée Descartes</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Payé par</div>
                          <div className="font-medium">M. Martin</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Montant</div>
                          <div className="text-2xl font-bold text-green-600">€250,00</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Méthode de paiement</div>
                          <div className="font-medium">Carte bancaire</div>
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <div className="text-xs text-gray-500 text-center">
                          Date: {new Date().toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer avec actions */}
            <div className="flex items-center justify-between p-6 border-t border-[#9AAEFF]/20">
              <div className="text-sm text-[#98A2B3]">
                Format sélectionné: <span className="text-white font-medium">{selectedFormat}</span>
              </div>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="px-6 py-3 border border-[#9AAEFF]/20 text-[#9AAEFF] rounded-lg font-medium hover:bg-[#9AAEFF]/10 transition-colors"
                >
                  {language === 'fr' ? 'Annuler' : 'Cancel'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => template && onDownload(template)}
                  className="px-6 py-3 bg-[#9AAEFF] text-[#1E2430] rounded-lg font-medium hover:bg-[#9AAEFF]/90 transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  {previewT.download} ({selectedFormat})
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const BulkDownloadModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  selectedTemplates: Template[];
  onBulkDownload: (formats: string[]) => void;
  language: 'fr' | 'en';
}> = ({ isOpen, onClose, selectedTemplates, onBulkDownload, language }) => {
  const [selectedFormats, setSelectedFormats] = useState<string[]>(['PDF']);
  const [includeCustomization, setIncludeCustomization] = useState(false);

  const formats = ['PDF', 'DOCX', 'PNG', 'SVG', 'JSON'];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#1E2430] border border-[#9AAEFF]/20 rounded-2xl max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* En-tête */}
            <div className="p-6 border-b border-[#9AAEFF]/20">
              <h2 className="text-2xl font-light text-white mb-2">
                {language === 'fr' ? 'Téléchargement en lot' : 'Bulk Download'}
              </h2>
              <p className="text-[#98A2B3]">
                {selectedTemplates.length} {language === 'fr' ? 'templates sélectionnés' : 'templates selected'}
              </p>
            </div>

            {/* Contenu */}
            <div className="p-6 space-y-6">
              {/* Formats */}
              <div>
                <h3 className="text-white font-medium mb-3">
                  {language === 'fr' ? 'Formats à télécharger' : 'Download Formats'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {formats.map((format) => (
                    <button
                      key={format}
                      onClick={() => {
                        setSelectedFormats(prev =>
                          prev.includes(format)
                            ? prev.filter(f => f !== format)
                            : [...prev, format]
                        );
                      }}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
                        selectedFormats.includes(format)
                          ? 'border-[#9AAEFF] bg-[#9AAEFF]/10 text-[#9AAEFF]'
                          : 'border-[#9AAEFF]/20 text-[#98A2B3] hover:border-[#9AAEFF]/40'
                      }`}
                    >
                      {format}
                    </button>
                  ))}
                </div>
              </div>

              {/* Options */}
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeCustomization}
                    onChange={(e) => setIncludeCustomization(e.target.checked)}
                    className="w-4 h-4 text-[#9AAEFF] bg-[#2A3040] border-[#9AAEFF]/20 rounded"
                  />
                  <span className="text-white">
                    {language === 'fr' ? 'Inclure les paramètres de personnalisation' : 'Include customization settings'}
                  </span>
                </label>
              </div>

              {/* Liste des templates */}
              <div>
                <h3 className="text-white font-medium mb-3">
                  {language === 'fr' ? 'Templates inclus' : 'Included Templates'}
                </h3>
                <div className="max-h-48 overflow-y-auto space-y-2">
                  {selectedTemplates.map((template) => (
                    <div
                      key={template.id}
                      className="flex items-center justify-between p-3 bg-[#2A3040] rounded-lg"
                    >
                      <span className="text-white">{template.name}</span>
                      <span className="text-sm text-[#98A2B3]">{template.size}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between p-6 border-t border-[#9AAEFF]/20">
              <button
                onClick={onClose}
                className="text-[#98A2B3] hover:text-white transition-colors"
              >
                {language === 'fr' ? 'Annuler' : 'Cancel'}
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onBulkDownload(selectedFormats)}
                className="px-6 py-3 bg-[#9AAEFF] text-[#1E2430] rounded-lg font-medium hover:bg-[#9AAEFF]/90 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                {language === 'fr' ? 'Télécharger' : 'Download'} ({selectedTemplates.length} fichiers)
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Icône X
const FiX = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// Composant principal
const TemplatesSection: React.FC<{ language: 'fr' | 'en' }> = ({ language }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'popularity' | 'recent' | 'downloads' | 'rating'>('popularity');
  const [filterType, setFilterType] = useState<'all' | 'free' | 'premium'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isBulkDownloadOpen, setIsBulkDownloadOpen] = useState(false);
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);

  const t = translations[language];

  // Données des catégories
  const categories: Category[] = [
    { id: 'all', name: t.categories.all, icon: Grid, count: 48, color: '#9AAEFF' },
    { id: 'invoices', name: t.categories.invoices, icon: FileText, count: 12, color: '#34D399' },
    { id: 'studentCards', name: t.categories.studentCards, icon: CreditCard, count: 8, color: '#F59E0B' },
    { id: 'receipts', name: t.categories.receipts, icon: Receipt, count: 6, color: '#EF4444' },
    { id: 'certificates', name: t.categories.certificates, icon: FileText, count: 10, color: '#8B5CF6' },
    { id: 'reports', name: t.categories.reports, icon: BarChart, count: 7, color: '#06B6D4' },
    { id: 'letters', name: t.categories.letters, icon: Mail, count: 5, color: '#10B981' }
  ];

  // Données des templates
  const templates: Template[] = [
    // Factures
    {
      id: 'invoice-1',
      name: language === 'fr' ? 'Facture Moderne' : 'Modern Invoice',
      description: language === 'fr' ? 'Design épuré avec calcul automatique' : 'Clean design with automatic calculation',
      category: 'invoice',
      type: 'free',
      downloads: 12450,
      rating: 4.8,
      featured: true,
      tags: ['Moderne', 'Professionnel', 'TVA incluse', 'QR Code'],
      previewColor: '#9AAEFF',
      icon: FileText,
      formats: ['PDF', 'DOCX', 'HTML'],
      lastUpdated: '2025-01-15',
      size: '1.2 MB',
      author: 'ABFVision Design',
      compatibility: ['Word', 'Google Docs', 'LibreOffice']
    },
    {
      id: 'invoice-2',
      name: language === 'fr' ? 'Facture Classique' : 'Classic Invoice',
      description: language === 'fr' ? 'Style traditionnel pour entreprises' : 'Traditional style for businesses',
      category: 'invoice',
      type: 'premium',
      downloads: 8560,
      rating: 4.6,
      featured: false,
      tags: ['Classique', 'Entreprise', 'Détaillé', 'Multi-langue'],
      previewColor: '#34D399',
      icon: FileText,
      formats: ['PDF', 'DOCX', 'XLSX'],
      lastUpdated: '2025-02-01',
      size: '1.8 MB',
      author: 'ABFVision Pro',
      compatibility: ['Excel', 'Numbers', 'Office 365']
    },
    // Cartes étudiantes
    {
      id: 'studentcard-1',
      name: language === 'fr' ? 'Carte Étudiante Moderne' : 'Modern Student Card',
      description: language === 'fr' ? 'Design sécurisé avec code QR' : 'Secure design with QR code',
      category: 'studentCard',
      type: 'free',
      downloads: 9230,
      rating: 4.9,
      featured: true,
      tags: ['Sécurisé', 'Moderne', 'QR Code', 'Photo'],
      previewColor: '#F59E0B',
      icon: CreditCard,
      formats: ['PNG', 'PDF', 'SVG'],
      lastUpdated: '2025-01-20',
      size: '850 KB',
      author: 'ABFVision Design',
      compatibility: ['Photoshop', 'Figma', 'Canva']
    },
    {
      id: 'studentcard-2',
      name: language === 'fr' ? 'Carte Premium Universitaire' : 'Premium University Card',
      description: language === 'fr' ? 'Design élégant pour universités' : 'Elegant design for universities',
      category: 'studentCard',
      type: 'premium',
      downloads: 4560,
      rating: 4.7,
      featured: false,
      tags: ['Premium', 'Université', 'Élégant', 'Sécurité'],
      previewColor: '#8B5CF6',
      icon: CreditCard,
      formats: ['PNG', 'PDF', 'AI'],
      lastUpdated: '2025-02-10',
      size: '2.1 MB',
      author: 'ABFVision Pro',
      compatibility: ['Illustrator', 'InDesign', 'Sketch']
    },
    // Reçus
    {
      id: 'receipt-1',
      name: language === 'fr' ? 'Reçu Simple' : 'Simple Receipt',
      description: language === 'fr' ? 'Format minimaliste efficace' : 'Effective minimalist format',
      category: 'receipt',
      type: 'free',
      downloads: 7340,
      rating: 4.5,
      featured: false,
      tags: ['Simple', 'Efficace', 'Rapide', 'Numéroté'],
      previewColor: '#EF4444',
      icon: Receipt,
      formats: ['PDF', 'HTML'],
      lastUpdated: '2025-01-05',
      size: '650 KB',
      author: 'ABFVision Design',
      compatibility: ['Word', 'Google Docs']
    },
    {
      id: 'receipt-2',
      name: language === 'fr' ? 'Reçu Détaillé' : 'Detailed Receipt',
      description: language === 'fr' ? 'Avec toutes les informations nécessaires' : 'With all necessary information',
      category: 'receipt',
      type: 'premium',
      downloads: 3210,
      rating: 4.8,
      featured: true,
      tags: ['Détaillé', 'Complet', 'Archivage', 'Signature'],
      previewColor: '#06B6D4',
      icon: Receipt,
      formats: ['PDF', 'DOCX', 'JSON'],
      lastUpdated: '2025-02-15',
      size: '1.5 MB',
      author: 'ABFVision Pro',
      compatibility: ['Excel', 'Access', 'Database']
    }
  ];

  // Stats
  const stats = [
    { icon: FileText, value: '48', label: t.stats.totalTemplates },
    { icon: Download, value: '45K+', label: t.stats.downloads },
    { icon: Users, value: '2.3K', label: t.stats.activeUsers },
    { icon: Star, value: '4.7/5', label: t.stats.avgRating }
  ];

  // Filtrage des templates
  const filteredTemplates = templates
    .filter(template => {
      if (activeCategory !== 'all' && template.category !== activeCategory) return false;
      if (filterType !== 'all' && template.type !== filterType) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          template.name.toLowerCase().includes(query) ||
          template.description.toLowerCase().includes(query) ||
          template.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return b.downloads - a.downloads;
        case 'recent':
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        case 'downloads':
          return b.downloads - a.downloads;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const handlePreview = (template: Template) => {
    setSelectedTemplate(template);
    setIsPreviewOpen(true);
  };

  const handleDownload = async (template: Template) => {
    setIsDownloading(true);
    
    // Simuler le téléchargement
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Créer un fichier de démonstration
    const content = `ABFVision Template: ${template.name}\nDescription: ${template.description}\nCategory: ${template.category}\nDownloaded: ${new Date().toLocaleDateString()}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `abfvision-${template.category}-${template.id}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    setIsDownloading(false);
  };

  const handleBulkDownload = async (formats: string[]) => {
    setIsDownloading(true);
    setIsBulkDownloadOpen(false);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simuler le téléchargement en lot
    const content = `Bulk Download: ${selectedTemplates.length} templates\nFormats: ${formats.join(', ')}\nDate: ${new Date().toLocaleDateString()}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `abfvision-bulk-templates-${Date.now()}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    setIsDownloading(false);
    setSelectedTemplates([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E2430] via-[#1A1F2E] to-[#1E2430] pt-16">
      {/* Modals */}
      <TemplatePreviewModal
        template={selectedTemplate}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onDownload={handleDownload}
        language={language}
      />
      
      <BulkDownloadModal
        isOpen={isBulkDownloadOpen}
        onClose={() => setIsBulkDownloadOpen(false)}
        selectedTemplates={templates.filter(t => selectedTemplates.includes(t.id))}
        onBulkDownload={handleBulkDownload}
        language={language}
      />

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
            <Layers className="w-4 h-4 text-[#9AAEFF]" />
            <span className="text-[#9AAEFF] text-sm font-light uppercase tracking-widest">
              {t.title}
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-4">
            {language === 'fr' ? 'Bibliothèque de Templates' : 'Template Library'}
          </h1>
          <p className="text-xl text-[#98A2B3] font-light max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
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

        {/* Barre de recherche et filtres */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Barre de recherche */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#9AAEFF]" />
              <input
                type="text"
                placeholder={t.filters.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#2A3040] border border-[#9AAEFF]/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-[#98A2B3]/50 focus:border-[#9AAEFF] focus:outline-none transition-all"
              />
            </div>

            {/* Filtres */}
            <div className="flex flex-wrap gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#2A3040] border border-[#9AAEFF]/20 text-white rounded-xl px-4 py-3 focus:border-[#9AAEFF] focus:outline-none transition-all"
              >
                <option value="popularity">{t.filters.popularity}</option>
                <option value="recent">{t.filters.recent}</option>
                <option value="downloads">{t.filters.downloads}</option>
                <option value="rating">{t.filters.rating}</option>
              </select>

              <div className="flex border border-[#9AAEFF]/20 rounded-xl overflow-hidden">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-4 py-3 transition-colors ${
                    filterType === 'all'
                      ? 'bg-[#9AAEFF] text-[#1E2430]'
                      : 'bg-[#2A3040] text-white hover:bg-[#2A3040]/80'
                  }`}
                >
                  {t.filters.sortBy}
                </button>
                <button
                  onClick={() => setFilterType('free')}
                  className={`px-4 py-3 transition-colors ${
                    filterType === 'free'
                      ? 'bg-green-500/20 text-green-400 border-l border-green-500/30'
                      : 'bg-[#2A3040] text-white hover:bg-[#2A3040]/80 border-l border-[#9AAEFF]/20'
                  }`}
                >
                  {t.filters.free}
                </button>
                <button
                  onClick={() => setFilterType('premium')}
                  className={`px-4 py-3 transition-colors ${
                    filterType === 'premium'
                      ? 'bg-amber-500/20 text-amber-400 border-l border-amber-500/30'
                      : 'bg-[#2A3040] text-white hover:bg-[#2A3040]/80 border-l border-[#9AAEFF]/20'
                  }`}
                >
                  {t.filters.premium}
                </button>
              </div>

              {/* Vue */}
              <div className="flex border border-[#9AAEFF]/20 rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-[#9AAEFF]/10 text-[#9AAEFF]'
                      : 'bg-[#2A3040] text-white hover:bg-[#2A3040]/80'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 transition-colors ${
                    viewMode === 'list'
                      ? 'bg-[#9AAEFF]/10 text-[#9AAEFF]'
                      : 'bg-[#2A3040] text-white hover:bg-[#2A3040]/80 border-l border-[#9AAEFF]/20'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Catégories */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                isActive={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
                language={language}
              />
            ))}
          </div>
        </motion.div>

        {/* Templates Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-light text-white">
              {activeCategory === 'all' 
                ? t.categories.all 
                : categories.find(c => c.id === activeCategory)?.name}
              <span className="text-[#98A2B3] text-lg ml-2">({filteredTemplates.length})</span>
            </h2>
            
            {selectedTemplates.length > 0 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsBulkDownloadOpen(true)}
                className="bg-[#9AAEFF] text-[#1E2430] px-6 py-3 rounded-lg font-medium hover:bg-[#9AAEFF]/90 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                {language === 'fr' ? 'Télécharger la sélection' : 'Download Selection'} ({selectedTemplates.length})
              </motion.button>
            )}
          </div>

          {filteredTemplates.length === 0 ? (
            <div className="text-center py-16">
              <FileText className="w-16 h-16 text-[#9AAEFF]/50 mx-auto mb-4" />
              <h3 className="text-xl font-light text-white mb-2">
                {language === 'fr' ? 'Aucun template trouvé' : 'No templates found'}
              </h3>
              <p className="text-[#98A2B3]">
                {language === 'fr' 
                  ? 'Essayez de modifier vos filtres de recherche'
                  : 'Try adjusting your search filters'}
              </p>
            </div>
          ) : (
            <div className={`grid ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1'
            } gap-6`}>
              {filteredTemplates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <TemplateCard
                    template={template}
                    onPreview={handlePreview}
                    onDownload={handleDownload}
                    language={language}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center pt-8 border-t border-[#9AAEFF]/10"
        >
          <h3 className="text-2xl font-light text-white mb-4">
            {language === 'fr'
              ? 'Besoin d\'un template personnalisé ?'
              : 'Need a custom template?'}
          </h3>
          <p className="text-[#98A2B3] font-light mb-8 max-w-2xl mx-auto">
            {language === 'fr'
              ? 'Notre équipe de designers peut créer des templates sur mesure pour votre établissement'
              : 'Our design team can create custom templates for your institution'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#9AAEFF] text-[#1E2430] px-8 py-4 rounded-lg font-medium flex items-center gap-3"
            >
              <Plus className="w-5 h-5" />
              {t.cta.createCustom}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-[#9AAEFF] text-[#9AAEFF] px-8 py-4 rounded-lg font-medium flex items-center gap-3 bg-[#9AAEFF]/10 hover:bg-[#9AAEFF]/20 transition-all"
            >
              <Mail className="w-5 h-5" />
              {t.cta.contactDesigner}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TemplatesSection;