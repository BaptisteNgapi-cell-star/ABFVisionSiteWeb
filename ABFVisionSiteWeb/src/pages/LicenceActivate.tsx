// pages/LicensePortal.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiKey, FiInfo
} from 'react-icons/fi';
import { 
  Key, Download, Copy, CheckCircle2, AlertCircle,
  Calendar, Users, Globe, Shield, RefreshCw,
  Lock, Unlock, ChevronRight, ExternalLink,
  FileText, Mail, Clock, HardDrive, Database,
  Building2, Hash, Cpu, Bell, Zap
} from 'lucide-react';

// Traductions
const translations = {
  fr: {
    title: "Portail de Licence ABFVision",
    subtitle: "Récupérez et gérez votre licence d'établissement",
    welcome: "Votre licence ABFVision",
    
    // Navigation
    nav: {
      overview: "Vue d'ensemble",
      licenseDetails: "Détails de la licence",
      download: "Récupérer la licence",
      support: "Support technique",
      history: "Historique"
    },
    
    // Dashboard
    dashboard: {
      status: "Statut",
      plan: "Forfait",
      schoolId: "ID Établissement",
      issuedDate: "Émise le",
      expiryDate: "Expire le",
      maxVersion: "Version maximale",
      installations: "Installations",
      maxInstallations: "Maximum d'installations",
      lastActivation: "Dernière activation",
      daysRemaining: "Jours restants"
    },
    
    // License
    license: {
      status: {
        active: "Active",
        expired: "Expirée",
        pending: "En attente",
        suspended: "Suspendue",
        gracePeriod: "Période de grâce"
      },
      actions: {
        download: "Récupérer la licence",
        copyKey: "Copier la clé",
        activate: "Activer",
        renew: "Renouveler",
        viewDetails: "Voir les détails"
      }
    },
    
    // Download options
    download: {
      title: "Récupérer votre licence",
      subtitle: "Choisissez le format d'activation adapté à votre établissement",
      formats: {
        online: "Activation en ligne",
        file: "Fichier de licence",
        usb: "Clé USB sécurisée",
        manual: "Documentation"
      },
      description: {
        online: "Activation instantanée via notre serveur sécurisé",
        file: "Fichier .licpkg chiffré pour une installation hors ligne",
        usb: "Générez une clé USB d'activation sécurisée",
        manual: "Guide complet d'installation et d'activation"
      },
      security: "Sécurisé avec chiffrement Ed25519 et AES-256-GCM"
    },
    
    // Status
    status: {
      loading: "Chargement de votre licence...",
      noLicense: "Aucune licence attribuée à votre établissement",
      error: "Erreur lors du chargement",
      success: "Licence récupérée avec succès"
    },
    
    // Notifications
    notifications: {
      copied: "Clé de licence copiée",
      downloaded: "Licence téléchargée",
      activated: "Licence activée",
      error: "Une erreur est survenue",
      renewSoon: "Votre licence expire bientôt"
    },
    
    // Support
    support: {
      title: "Support technique",
      contact: "Contacter le support",
      documentation: "Documentation",
      phone: "Support téléphonique",
      email: "support@abfvision.com",
      hours: "Lun-Ven: 9h-18h"
    },
    
    // Alerts
    alerts: {
      expiryWarning: "Votre licence expire dans {days} jours",
      installationLimit: "{used}/{max} installations utilisées",
      updateAvailable: "Mise à jour disponible"
    }
  },
  en: {
    title: "ABFVision License Portal",
    subtitle: "Retrieve and manage your institution license",
    welcome: "Your ABFVision License",
    
    nav: {
      overview: "Overview",
      licenseDetails: "License Details",
      download: "Retrieve License",
      support: "Technical Support",
      history: "History"
    },
    
    dashboard: {
      status: "Status",
      plan: "Plan",
      schoolId: "Institution ID",
      issuedDate: "Issued",
      expiryDate: "Expires",
      maxVersion: "Max Version",
      installations: "Installations",
      maxInstallations: "Max Installations",
      lastActivation: "Last Activation",
      daysRemaining: "Days Remaining"
    },
    
    license: {
      status: {
        active: "Active",
        expired: "Expired",
        pending: "Pending",
        suspended: "Suspended",
        gracePeriod: "Grace Period"
      },
      actions: {
        download: "Retrieve License",
        copyKey: "Copy License Key",
        activate: "Activate",
        renew: "Renew",
        viewDetails: "View Details"
      }
    },
    
    download: {
      title: "Retrieve Your License",
      subtitle: "Choose the activation format suitable for your institution",
      formats: {
        online: "Online Activation",
        file: "License File",
        usb: "Secure USB Key",
        manual: "Documentation"
      },
      description: {
        online: "Instant activation via our secure server",
        file: "Encrypted .licpkg file for offline installation",
        usb: "Generate a secure USB activation key",
        manual: "Complete installation and activation guide"
      },
      security: "Secured with Ed25519 encryption and AES-256-GCM"
    },
    
    status: {
      loading: "Loading your license...",
      noLicense: "No license assigned to your institution",
      error: "Error loading license",
      success: "License retrieved successfully"
    },
    
    notifications: {
      copied: "License key copied",
      downloaded: "License downloaded",
      activated: "License activated",
      error: "An error occurred",
      renewSoon: "Your license expires soon"
    },
    
    support: {
      title: "Technical Support",
      contact: "Contact Support",
      documentation: "Documentation",
      phone: "Phone Support",
      email: "support@abfvision.com",
      hours: "Mon-Fri: 9am-6pm"
    },
    
    alerts: {
      expiryWarning: "Your license expires in {days} days",
      installationLimit: "{used}/{max} installations used",
      updateAvailable: "Update available"
    }
  }
};

// Types
interface License {
  id: string;
  licenseKey: string;
  institutionName: string;
  institutionType: 'school' | 'college' | 'university' | 'other';
  plan: 'BASIC' | 'PRO' | 'ENTERPRISE' | 'PREMIUM';
  status: 'active' | 'expired' | 'pending' | 'suspended' | 'gracePeriod';
  schoolId: string;
  issuedDate: string;
  expiryDate: string;
  maxVersion: string;
  currentVersion: string;
  installations: number;
  maxInstallations: number;
  lastActivated: string;
  gracePeriodEnd?: string;
  features: string[];
}

interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  timestamp: string;
}

interface Alert {
  id: string;
  type: 'warning' | 'info' | 'success' | 'danger';
  message: string;
  icon: React.ComponentType;
}

// Composants
const LoadingSpinner: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex items-center justify-center py-20"
  >
    <div className="text-center space-y-4">
      <div className="relative mx-auto">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-2 border-[#9AAEFF]/20 border-t-[#9AAEFF] rounded-full"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Key className="w-6 h-6 text-[#9AAEFF] animate-pulse" />
        </div>
      </div>
      <p className="text-[#9AAEFF]/80 text-sm font-light">
        {translations.fr.status.loading}
      </p>
    </div>
  </motion.div>
);

const StatusBadge: React.FC<{ status: License['status']; language: 'fr' | 'en' }> = ({ status, language }) => {
  const t = translations[language].license.status;
  const colors = {
    active: 'bg-green-500/20 text-green-400 border-green-500/30',
    expired: 'bg-red-500/20 text-red-400 border-red-500/30',
    pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    suspended: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    gracePeriod: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${colors[status]} flex items-center gap-1`}>
      {status === 'active' && <CheckCircle2 className="w-3 h-3" />}
      {status === 'gracePeriod' && <Clock className="w-3 h-3" />}
      {t[status]}
    </span>
  );
};

const AlertBanner: React.FC<{ alert: Alert }> = ({ alert }) => {
  const colors = {
    warning: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    info: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
    success: 'bg-green-500/10 border-green-500/20 text-green-400',
    danger: 'bg-red-500/10 border-red-500/20 text-red-400'
  };

  const Icon = alert.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${colors[alert.type]} border rounded-xl p-4 flex items-center gap-3 backdrop-blur-sm`}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <p className="text-sm font-light">{alert.message}</p>
    </motion.div>
  );
};

const LicenseDashboard: React.FC<{ license: License; language: 'fr' | 'en' }> = ({ license, language }) => {
  const t = translations[language].dashboard;
  
  const calculateDaysRemaining = () => {
    const expiry = new Date(license.expiryDate);
    const now = new Date();
    const diffTime = expiry.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysRemaining = calculateDaysRemaining();
  const isExpiringSoon = daysRemaining <= 30 && daysRemaining > 0;
  const isExpired = daysRemaining < 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* En-tête avec statut */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-light text-white mb-2">
            {license.institutionName}
          </h1>
          <div className="flex items-center gap-2">
            <StatusBadge status={license.status} language={language} />
            {isExpiringSoon && !isExpired && (
              <span className="text-amber-400 text-sm font-light">
                {language === 'fr' 
                  ? `Expire dans ${daysRemaining} jours`
                  : `Expires in ${daysRemaining} days`}
              </span>
            )}
          </div>
        </div>
        
        {/* Plan */}
        <div className="bg-gradient-to-r from-[#9AAEFF]/10 to-[#9AAEFF]/5 border border-[#9AAEFF]/20 rounded-xl px-4 py-2">
          <span className="text-[#9AAEFF] font-light text-lg">{license.plan}</span>
        </div>
      </div>

      {/* Grille d'informations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <InfoCard 
          icon={Hash}
          label={t.schoolId}
          value={license.schoolId}
          accent="blue"
        />
        
        <InfoCard 
          icon={Calendar}
          label={t.issuedDate}
          value={new Date(license.issuedDate).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')}
          accent="purple"
        />
        
        <InfoCard 
          icon={Calendar}
          label={t.expiryDate}
          value={new Date(license.expiryDate).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')}
          accent={isExpiringSoon ? "amber" : "green"}
        />
        
        <InfoCard 
          icon={Cpu}
          label={t.maxVersion}
          value={license.maxVersion}
          accent="cyan"
        />
        
        <InfoCard 
          icon={Zap}
          label={t.installations}
          value={`${license.installations} / ${license.maxInstallations}`}
          accent="green"
        />
        
        <InfoCard 
          icon={Clock}
          label={t.lastActivation}
          value={new Date(license.lastActivated).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')}
          accent="blue"
        />
      </div>

      {/* Barre de progression des installations */}
      <div className="bg-[#1E2430]/60 border border-[#9AAEFF]/20 rounded-xl p-4">
        <div className="flex justify-between text-sm text-[#98A2B3] mb-2">
          <span>{t.installations}</span>
          <span>{license.installations} / {license.maxInstallations}</span>
        </div>
        <div className="h-2 bg-[#2A3040] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(license.installations / license.maxInstallations) * 100}%` }}
            transition={{ duration: 1 }}
            className="h-full bg-gradient-to-r from-[#9AAEFF] to-[#7B93FF]"
          />
        </div>
      </div>
    </motion.div>
  );
};

const InfoCard: React.FC<{
  icon: React.ComponentType;
  label: string;
  value: string;
  accent: string;
}> = ({ icon: Icon, label, value, accent }) => {
  const accentColors = {
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    green: 'text-green-400 bg-green-500/10 border-green-500/20',
    amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20'
  };

  return (
    <div className={`${accentColors[accent as keyof typeof accentColors]} border rounded-xl p-4`}>
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg bg-current/10">
          <Icon className="w-4 h-4" />
        </div>
        <span className="text-xs font-light">{label}</span>
      </div>
      <p className="text-white font-light text-sm">{value}</p>
    </div>
  );
};

const DownloadModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  license: License;
  language: 'fr' | 'en';
  onDownload: (license: License, format: 'online' | 'file' | 'usb') => void;
}> = ({ isOpen, onClose, license, language, onDownload }) => {
  const t = translations[language].download;

  const downloadOptions = [
    {
      id: 'online',
      title: t.formats.online,
      description: t.description.online,
      icon: Globe,
      color: 'from-green-500/20 to-green-600/20',
      border: 'border-green-500/30',
      recommended: true
    },
    {
      id: 'file',
      title: t.formats.file,
      description: t.description.file,
      icon: FileText,
      color: 'from-blue-500/20 to-blue-600/20',
      border: 'border-blue-500/30'
    },
    {
      id: 'usb',
      title: t.formats.usb,
      description: t.description.usb,
      icon: HardDrive,
      color: 'from-purple-500/20 to-purple-600/20',
      border: 'border-purple-500/30'
    },
    {
      id: 'manual',
      title: t.formats.manual,
      description: t.description.manual,
      icon: Database,
      color: 'from-amber-500/20 to-amber-600/20',
      border: 'border-amber-500/30'
    }
  ];

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
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#1E2430] border border-[#9AAEFF]/20 rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* En-tête */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-light text-white">{t.title}</h3>
                <p className="text-[#9AAEFF] text-sm font-light mt-1">{t.subtitle}</p>
              </div>
              <button
                onClick={onClose}
                className="text-[#98A2B3] hover:text-white transition-colors p-1"
              >
                <AlertCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Info institution */}
            <div className="bg-[#2A3040] rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <Building2 className="w-5 h-5 text-[#9AAEFF]" />
                <div>
                  <p className="text-white font-light">{license.institutionName}</p>
                  <p className="text-[#9AAEFF] text-sm font-light">{license.schoolId}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <StatusBadge status={license.status} language={language} />
                <span className="text-sm text-[#9AAEFF]">{license.plan}</span>
              </div>
            </div>

            {/* Options de téléchargement */}
            <div className="space-y-3">
              {downloadOptions.map((option) => (
                <motion.button
                  key={option.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => {
                    if (option.id !== 'manual') {
                      onDownload(license, option.id as 'online' | 'file' | 'usb');
                    }
                    onClose();
                  }}
                  className={`w-full text-left bg-gradient-to-r ${option.color} border ${option.border} rounded-xl p-4 transition-all hover:border-[#9AAEFF]/50`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg bg-current/10`}>
                      <option.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-white font-light">{option.title}</h4>
                        {option.recommended && (
                          <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">
                            {language === 'fr' ? 'Recommandé' : 'Recommended'}
                          </span>
                        )}
                      </div>
                      <p className="text-[#98A2B3] text-sm font-light mt-1">
                        {option.description}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#9AAEFF]" />
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Info sécurité */}
            <div className="mt-6 pt-6 border-t border-[#9AAEFF]/10">
              <div className="flex items-center gap-2 text-sm text-[#98A2B3]">
                <Shield className="w-4 h-4" />
                <span>{t.security}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const NotificationToast: React.FC<{
  notification: Notification | null;
  onClose: () => void;
  language: 'fr' | 'en';
}> = ({ notification, onClose, language }) => {
  if (!notification) return null;

  const colors = {
    success: 'bg-green-500/20 border-green-500/30 text-green-400',
    error: 'bg-red-500/20 border-red-500/30 text-red-400',
    info: 'bg-blue-500/20 border-blue-500/30 text-blue-400',
    warning: 'bg-amber-500/20 border-amber-500/30 text-amber-400'
  };

  const icons = {
    success: CheckCircle2,
    error: AlertCircle,
    info: FiInfo,
    warning: AlertCircle
  };

  const Icon = icons[notification.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`fixed top-4 right-4 border rounded-xl p-4 ${colors[notification.type]} backdrop-blur-sm z-50 min-w-[300px] max-w-[400px]`}
    >
      <div className="flex items-start gap-3">
        <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm font-light">{notification.message}</p>
          <p className="text-xs opacity-70 mt-1">
            {new Date(notification.timestamp).toLocaleTimeString(language === 'fr' ? 'fr-FR' : 'en-US')}
          </p>
        </div>
        <button
          onClick={onClose}
          className="opacity-50 hover:opacity-100 transition-opacity"
        >
          <AlertCircle className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

const SupportSection: React.FC<{ language: 'fr' | 'en' }> = ({ language }) => {
  const t = translations[language].support;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <h2 className="text-2xl font-light text-white">{t.title}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Documentation */}
        <div className="bg-[#1E2430]/80 border border-[#9AAEFF]/20 rounded-xl p-6">
          <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-lg font-light text-white mb-3">{t.documentation}</h3>
          <p className="text-sm text-[#98A2B3] font-light mb-4">
            {language === 'fr' 
              ? 'Accédez à la documentation complète, guides d\'installation et FAQ'
              : 'Access complete documentation, installation guides and FAQ'}
          </p>
          <button className="text-[#9AAEFF] hover:text-[#9AAEFF]/80 transition-colors text-sm flex items-center gap-2">
            <span>{language === 'fr' ? 'Accéder à la documentation' : 'Access documentation'}</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        {/* Contact */}
        <div className="bg-[#1E2430]/80 border border-[#9AAEFF]/20 rounded-xl p-6">
          <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 text-green-400" />
          </div>
          <h3 className="text-lg font-light text-white mb-3">{t.contact}</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#9AAEFF]" />
              <a 
                href={`mailto:${t.email}`}
                className="text-sm text-[#98A2B3] hover:text-white transition-colors"
              >
                {t.email}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-[#9AAEFF]" />
              <span className="text-sm text-[#98A2B3]">
                {t.hours}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Composant principal
const LicensePortal: React.FC = () => {
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'download' | 'support' | 'history'>('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [license, setLicense] = useState<License | null>(null);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [notification, setNotification] = useState<Notification | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  // Données mockées pour une seule licence
  const mockLicense: License = {
    id: '1',
    licenseKey: 'ABFV-LIC-2025-00123-XYZ',
    institutionName: 'Lycée Descartes',
    institutionType: 'school',
    plan: 'ENTERPRISE',
    status: 'active',
    schoolId: 'LYC-00123',
    issuedDate: '2025-01-15T00:00:00Z',
    expiryDate: '2026-01-15T00:00:00Z',
    maxVersion: '2.4.1',
    currentVersion: '2.4.0',
    installations: 3,
    maxInstallations: 10,
    lastActivated: '2025-10-10T14:30:00Z',
    features: ['Gestion complète', 'Support premium', 'Formation incluse', 'Mises à jour automatiques']
  };

  useEffect(() => {
    // Simuler le chargement de la licence
    setTimeout(() => {
      setLicense(mockLicense);
      setIsLoading(false);
      
      // Générer des alertes basées sur la licence
      const expiry = new Date(mockLicense.expiryDate);
      const now = new Date();
      const diffDays = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      
      const newAlerts: Alert[] = [];
      
      if (diffDays <= 30 && diffDays > 0) {
        newAlerts.push({
          id: 'expiry-warning',
          type: 'warning',
          message: language === 'fr' 
            ? `Votre licence expire dans ${diffDays} jours`
            : `Your license expires in ${diffDays} days`,
          icon: Bell
        });
      }
      
      if (mockLicense.installations >= mockLicense.maxInstallations) {
        newAlerts.push({
          id: 'installation-limit',
          type: 'danger',
          message: language === 'fr'
            ? 'Limite d\'installations atteinte'
            : 'Installation limit reached',
          icon: AlertCircle
        });
      }
      
      setAlerts(newAlerts);
    }, 1500);
  }, [language]);

  const handleDownload = async (license: License, format: 'online' | 'file' | 'usb') => {
    setIsDownloadModalOpen(false);
    
    // Simuler le téléchargement
    setNotification({
      id: Date.now().toString(),
      message: `${translations[language].notifications.downloaded} (${format})`,
      type: 'success',
      timestamp: new Date().toISOString()
    });

    // Logique de téléchargement réelle
    setTimeout(() => {
      const blob = new Blob([
        JSON.stringify({
          licenseKey: license.licenseKey,
          institution: license.institutionName,
          schoolId: license.schoolId,
          plan: license.plan,
          expiryDate: license.expiryDate
        }, null, 2)
      ], { type: 'application/json' });
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ABFVision_License_${license.schoolId}_${format === 'online' ? 'online' : 'offline'}.json`;
      a.click();
      window.URL.revokeObjectURL(url);
    }, 500);
  };

  const handleCopyKey = () => {
    if (!license) return;
    
    navigator.clipboard.writeText(license.licenseKey);
    setNotification({
      id: Date.now().toString(),
      message: translations[language].notifications.copied,
      type: 'success',
      timestamp: new Date().toISOString()
    });
  };

  const t = translations[language];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1E2430] via-[#1A1F2E] to-[#1E2430] text-white">
        <LoadingSpinner />
      </div>
    );
  }

  if (!license) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1E2430] via-[#1A1F2E] to-[#1E2430] text-white flex items-center justify-center">
        <div className="text-center p-8">
          <Key className="w-16 h-16 text-[#9AAEFF]/50 mx-auto mb-4" />
          <h2 className="text-xl font-light text-white mb-2">
            {t.status.noLicense}
          </h2>
          <p className="text-[#98A2B3]">
            {language === 'fr' 
              ? 'Contactez le support pour obtenir une licence'
              : 'Contact support to get a license'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E2430] via-[#1A1F2E] to-[#1E2430] text-white">
      {/* Notifications */}
      <NotificationToast 
        notification={notification}
        onClose={() => setNotification(null)}
        language={language}
      />

      {/* Modal de téléchargement */}
      {license && (
        <DownloadModal
          isOpen={isDownloadModalOpen}
          onClose={() => setIsDownloadModalOpen(false)}
          license={license}
          language={language}
          onDownload={handleDownload}
        />
      )}

      {/* En-tête */}
      <header className="border-b border-[#9AAEFF]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-light text-white mb-2">
                {t.title}
              </h1>
              <p className="text-[#9AAEFF] font-light">
                {t.subtitle}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Sélecteur de langue */}
              <button
                onClick={() => setLanguage(lang => lang === 'fr' ? 'en' : 'fr')}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#9AAEFF]/20 bg-[#9AAEFF]/10 text-[#9AAEFF] hover:bg-[#9AAEFF]/20 transition-all text-sm"
              >
                <Globe className="w-4 h-4" />
                <span className="uppercase">{language === 'fr' ? 'EN' : 'FR'}</span>
              </button>
              
              {/* Bouton actualiser */}
              <button
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => setIsLoading(false), 1000);
                }}
                className="p-2 rounded-lg border border-[#9AAEFF]/20 bg-[#9AAEFF]/10 text-[#9AAEFF] hover:bg-[#9AAEFF]/20 transition-all"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-[#9AAEFF]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto py-3">
            {Object.entries(t.nav).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as any)}
                className={`relative px-4 py-2 rounded-lg transition-all text-sm font-light ${
                  activeTab === key
                    ? 'text-[#9AAEFF] bg-[#9AAEFF]/10'
                    : 'text-[#98A2B3] hover:text-white hover:bg-white/5'
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alertes */}
        {alerts.length > 0 && (
          <div className="mb-6 space-y-3">
            {alerts.map(alert => (
              <AlertBanner key={alert.id} alert={alert} />
            ))}
          </div>
        )}

        {/* Actions rapides */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsDownloadModalOpen(true)}
              className="bg-[#9AAEFF] text-[#1E2430] px-6 py-3 rounded-lg font-light flex items-center gap-2 hover:bg-[#9AAEFF]/90 transition-all"
            >
              <Download className="w-4 h-4" />
              {t.license.actions.download}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCopyKey}
              className="border border-[#9AAEFF]/20 text-[#9AAEFF] px-6 py-3 rounded-lg font-light flex items-center gap-2 hover:bg-[#9AAEFF]/10 transition-all"
            >
              <Copy className="w-4 h-4" />
              {t.license.actions.copyKey}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab('support')}
              className="border border-[#9AAEFF]/20 text-[#9AAEFF] px-6 py-3 rounded-lg font-light flex items-center gap-2 hover:bg-[#9AAEFF]/10 transition-all"
            >
              <Mail className="w-4 h-4" />
              {t.support.contact}
            </motion.button>
          </div>
        </div>

        {/* Contenu principal */}
        {activeTab === 'overview' && license && (
          <LicenseDashboard license={license} language={language} />
        )}

        {activeTab === 'details' && license && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-light text-white">
              {t.nav.licenseDetails}
            </h2>
            
            <div className="bg-[#1E2430]/80 border border-[#9AAEFF]/20 rounded-2xl p-6">
              <div className="space-y-6">
                {/* Clé de licence */}
                <div>
                  <h3 className="text-sm text-[#9AAEFF] font-light mb-2">
                    {language === 'fr' ? 'Clé de licence' : 'License Key'}
                  </h3>
                  <div className="bg-[#2A3040] border border-[#9AAEFF]/10 rounded-lg p-4">
                    <code className="text-white font-mono text-sm break-all">
                      {license.licenseKey}
                    </code>
                  </div>
                </div>
                
                {/* Fonctionnalités */}
                <div>
                  <h3 className="text-sm text-[#9AAEFF] font-light mb-3">
                    {language === 'fr' ? 'Fonctionnalités incluses' : 'Included Features'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {license.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-[#98A2B3] text-sm"
                      >
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'download' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-light text-white">
              {t.nav.download}
            </h2>
            
            <div className="bg-[#1E2430]/80 border border-[#9AAEFF]/20 rounded-2xl p-6">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[#9AAEFF] to-[#7B93FF] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Key className="w-8 h-8 text-[#1E2430]" />
                </div>
                <h3 className="text-xl font-light text-white mb-2">
                  {t.download.title}
                </h3>
                <p className="text-[#98A2B3] font-light">
                  {t.download.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {([
                  { format: 'online' as const, icon: Globe, color: 'green' },
                  { format: 'file' as const, icon: FileText, color: 'blue' },
                  { format: 'usb' as const, icon: HardDrive, color: 'purple' },
                  { format: 'manual' as const, icon: Database, color: 'amber' }
                ]).map((option) => (
                  <motion.button
                    key={option.format}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (option.format !== 'manual') {
                        setIsDownloadModalOpen(true);
                      }
                    }}
                    className="bg-[#2A3040] border border-[#9AAEFF]/20 rounded-xl p-6 text-left hover:border-[#9AAEFF]/40 transition-all group"
                  >
                    <div className={`w-12 h-12 bg-${option.color}-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-${option.color}-500/30 transition-colors`}>
                      <option.icon className={`w-6 h-6 text-${option.color}-400`} />
                    </div>
                    <h3 className="text-lg font-light text-white mb-2">
                      {t.download.formats[option.format]}
                    </h3>
                    <p className="text-sm text-[#98A2B3] font-light">
                      {t.download.description[option.format]}
                    </p>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'support' && (
          <SupportSection language={language} />
        )}

        {activeTab === 'history' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-light text-white">
              {t.nav.history}
            </h2>
            
            <div className="bg-[#1E2430]/80 border border-[#9AAEFF]/20 rounded-2xl p-6">
              <div className="text-center py-12">
                <Clock className="w-12 h-12 text-[#9AAEFF]/50 mx-auto mb-4" />
                <p className="text-[#98A2B3] font-light">
                  {language === 'fr' 
                    ? 'Aucun historique disponible'
                    : 'No history available'}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Footer info */}
        <div className="mt-12 pt-8 border-t border-[#9AAEFF]/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#98A2B3]">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>{t.download.security}</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>{language === 'fr' ? 'Une licence par établissement' : 'One license per institution'}</span>
              </div>
            </div>
            <div className="text-xs">
              ABFVision License Portal v{license.currentVersion} • © 2025
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LicensePortal;