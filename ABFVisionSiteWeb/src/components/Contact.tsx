// components/ContactSection.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiSend, 
  FiUser, 
  FiMessageSquare,
  FiGlobe,
  FiClock,
  FiCheckCircle
} from 'react-icons/fi';

// Traductions pour la section Contact
const contactTranslations = {
  fr: {
    title: "Contactez-Nous",
    subtitle: "Discutons de votre projet éducatif",
    description: "Nous sommes là pour répondre à vos questions et vous accompagner dans la transformation numérique de votre établissement.",
    form: {
      name: "Votre nom complet",
      email: "Votre adresse email",
      subject: "Sujet du message",
      message: "Votre message",
      send: "Envoyer le message",
      sending: "Envoi en cours...",
      success: "Message envoyé avec succès !"
    },
    contactInfo: {
      title: "Nos Coordonnées",
      subtitle: "Plusieurs façons de nous contacter",
      email: "Email",
      phone: "Téléphone",
      address: "Adresse",
      website: "Site web",
      availability: "Disponibilité"
    },
    team: {
      title: "Notre Équipe",
      subtitle: "Contactez directement nos experts"
    }
  },
  en: {
    title: "Contact Us",
    subtitle: "Let's discuss your educational project",
    description: "We're here to answer your questions and support you in the digital transformation of your institution.",
    form: {
      name: "Your full name",
      email: "Your email address",
      subject: "Message subject",
      message: "Your message",
      send: "Send message",
      sending: "Sending...",
      success: "Message sent successfully!"
    },
    contactInfo: {
      title: "Our Contacts",
      subtitle: "Multiple ways to reach us",
      email: "Email",
      phone: "Phone",
      address: "Address",
      website: "Website",
      availability: "Availability"
    },
    team: {
      title: "Our Team",
      subtitle: "Contact our experts directly"
    }
  }
};

// Données de contact
const contactInfo = {
  email: "contact@abfvision.com",
  phone: "+33 1 23 45 67 89",
  address: {
    fr: "123 Avenue de l'Éducation, 75000 Paris, France",
    en: "123 Education Avenue, 75000 Paris, France"
  },
  website: "www.abfvision.com",
  availability: {
    fr: "Lun - Ven: 9h00 - 18h00",
    en: "Mon - Fri: 9:00 AM - 6:00 PM"
  }
};

// Données de l'équipe
const teamContacts = [
  {
    name: "Baptiste Ngapi",
    role: {
      fr: "Co-fondateur & Développeur Full-Stack",
      en: "Co-founder & Full-Stack Developer"
    },
    email: "baptiste@abfvision.com",
    phone: "+33 1 23 45 67 90",
    specialization: {
      fr: "Développement technique & Architecture",
      en: "Technical Development & Architecture"
    }
  },
  {
    name: "KONGA-NZINGA Fredman Mutch",
    role: {
      fr: "Co-fondateur & Expert Réseaux",
      en: "Co-founder & Network Expert"
    },
    email: "fred@abfvision.com",
    phone: "+33 1 23 45 67 91",
    specialization: {
      fr: "Infrastructure & Télécommunications",
      en: "Infrastructure & Telecommunications"
    }
  }
];

const ContactSection: React.FC<{ language: 'fr' | 'en'; onNavigate: (section: string) => void }> = ({ 
  language, 
  onNavigate 
}) => {
  const t = contactTranslations[language];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset du formulaire après succès
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="min-h-screen bg-linear-to-br from-[#1E2430] via-[#1A1F2E] to-[#1E2430] py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto"
        >
          {/* En-tête de section */}
          <motion.div
            variants={itemVariants}
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
                {language === 'fr' ? 'Parlons de votre projet' : "Let's talk about your project"}
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-4">
              {t.title}
            </h1>
            <p className="text-xl text-[#9AAEFF] font-light max-w-2xl mx-auto mb-6">
              {t.subtitle}
            </p>
            <p className="text-lg text-[#98A2B3] font-light max-w-3xl mx-auto">
              {t.description}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Colonne de gauche - Formulaire de contact */}
            <motion.div
              variants={itemVariants}
              className="space-y-8"
            >
              <div className="bg-[#1E2430]/50 rounded-2xl border border-[#9AAEFF]/20 p-8 backdrop-blur-sm">
                <h2 className="text-2xl font-light text-white mb-6">
                  {language === 'fr' ? 'Envoyez-nous un message' : 'Send us a message'}
                </h2>

                {/* Message de succès */}
                <AnimatePresence>
                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg"
                    >
                      <div className="flex items-center gap-3 text-green-400">
                        <FiCheckCircle size={20} />
                        <span className="font-light">{t.form.success}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Nom */}
                    <div className="space-y-2">
                      <label className="text-[#9AAEFF] font-light text-sm">
                        {t.form.name} *
                      </label>
                      <div className="relative">
                        <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9AAEFF]/50" size={18} />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-[#2A3040] border border-[#9AAEFF]/20 rounded-lg pl-10 pr-4 py-3 text-white font-light placeholder-[#98A2B3]/50 focus:border-[#9AAEFF] focus:outline-none transition-all duration-300"
                          placeholder={t.form.name}
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-[#9AAEFF] font-light text-sm">
                        {t.form.email} *
                      </label>
                      <div className="relative">
                        <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9AAEFF]/50" size={18} />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-[#2A3040] border border-[#9AAEFF]/20 rounded-lg pl-10 pr-4 py-3 text-white font-light placeholder-[#98A2B3]/50 focus:border-[#9AAEFF] focus:outline-none transition-all duration-300"
                          placeholder={t.form.email}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Sujet */}
                  <div className="space-y-2">
                    <label className="text-[#9AAEFF] font-light text-sm">
                      {t.form.subject} *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#2A3040] border border-[#9AAEFF]/20 rounded-lg px-4 py-3 text-white font-light placeholder-[#98A2B3]/50 focus:border-[#9AAEFF] focus:outline-none transition-all duration-300"
                      placeholder={t.form.subject}
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-[#9AAEFF] font-light text-sm">
                      {t.form.message} *
                    </label>
                    <div className="relative">
                      <FiMessageSquare className="absolute left-3 top-3 text-[#9AAEFF]/50" size={18} />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full bg-[#2A3040] border border-[#9AAEFF]/20 rounded-lg pl-10 pr-4 py-3 text-white font-light placeholder-[#98A2B3]/50 focus:border-[#9AAEFF] focus:outline-none transition-all duration-300 resize-none"
                        placeholder={t.form.message}
                      />
                    </div>
                  </div>

                  {/* Bouton d'envoi */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className="w-full bg-[#9AAEFF] text-[#1E2430] py-4 rounded-lg font-light flex items-center justify-center gap-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-[#1E2430] border-t-transparent rounded-full"
                        />
                        {t.form.sending}
                      </>
                    ) : (
                      <>
                        <FiSend size={18} />
                        {t.form.send}
                      </>
                    )}
                  </motion.button>
                </form>
              </div>

              {/* Section Équipe */}
              <div>
                <h3 className="text-2xl font-light text-white mb-6">
                  {t.team.title}
                </h3>
                <div className="space-y-4">
                  {teamContacts.map((member, index) => (
                    <motion.div
                      key={member.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="bg-[#1E2430]/50 rounded-xl border border-[#9AAEFF]/10 p-4 backdrop-blur-sm hover:border-[#9AAEFF]/30 transition-all duration-300"
                    >
                      <h4 className="text-white font-light text-lg mb-1">
                        {member.name}
                      </h4>
                      <p className="text-[#9AAEFF] text-sm font-light mb-2">
                        {member.role[language]}
                      </p>
                      <p className="text-[#98A2B3] text-xs font-light mb-3">
                        {member.specialization[language]}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <a href={`mailto:${member.email}`} className="text-[#9AAEFF] hover:text-white transition-colors flex items-center gap-2">
                          <FiMail size={14} />
                          {member.email}
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Colonne de droite - Informations de contact */}
            <motion.div
              variants={itemVariants}
              className="space-y-8"
            >
              {/* Carte principale des coordonnées */}
              <div className="bg-[#1E2430]/50 rounded-2xl border border-[#9AAEFF]/20 p-8 backdrop-blur-sm">
                <h2 className="text-2xl font-light text-white mb-2">
                  {t.contactInfo.title}
                </h2>
                <p className="text-[#9AAEFF] font-light mb-8">
                  {t.contactInfo.subtitle}
                </p>

                <div className="space-y-6">
                  {/* Email */}
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 group cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-[#9AAEFF]/10 border border-[#9AAEFF]/20 rounded-lg flex items-center justify-center group-hover:bg-[#9AAEFF]/20 transition-all duration-300">
                      <FiMail className="text-[#9AAEFF]" size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-light mb-1">
                        {t.contactInfo.email}
                      </h4>
                      <a href={`mailto:${contactInfo.email}`} className="text-[#98A2B3] font-light hover:text-[#9AAEFF] transition-colors">
                        {contactInfo.email}
                      </a>
                    </div>
                  </motion.div>

                  {/* Téléphone */}
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 group cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-[#9AAEFF]/10 border border-[#9AAEFF]/20 rounded-lg flex items-center justify-center group-hover:bg-[#9AAEFF]/20 transition-all duration-300">
                      <FiPhone className="text-[#9AAEFF]" size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-light mb-1">
                        {t.contactInfo.phone}
                      </h4>
                      <a href={`tel:${contactInfo.phone}`} className="text-[#98A2B3] font-light hover:text-[#9AAEFF] transition-colors">
                        {contactInfo.phone}
                      </a>
                    </div>
                  </motion.div>

                  {/* Adresse */}
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 bg-[#9AAEFF]/10 border border-[#9AAEFF]/20 rounded-lg flex items-center justify-center group-hover:bg-[#9AAEFF]/20 transition-all duration-300">
                      <FiMapPin className="text-[#9AAEFF]" size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-light mb-1">
                        {t.contactInfo.address}
                      </h4>
                      <p className="text-[#98A2B3] font-light">
                        {contactInfo.address[language]}
                      </p>
                    </div>
                  </motion.div>

                  {/* Site web */}
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 group cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-[#9AAEFF]/10 border border-[#9AAEFF]/20 rounded-lg flex items-center justify-center group-hover:bg-[#9AAEFF]/20 transition-all duration-300">
                      <FiGlobe className="text-[#9AAEFF]" size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-light mb-1">
                        {t.contactInfo.website}
                      </h4>
                      <a href={`https://${contactInfo.website}`} target="_blank" rel="noopener noreferrer" className="text-[#98A2B3] font-light hover:text-[#9AAEFF] transition-colors">
                        {contactInfo.website}
                      </a>
                    </div>
                  </motion.div>

                  {/* Disponibilité */}
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 bg-[#9AAEFF]/10 border border-[#9AAEFF]/20 rounded-lg flex items-center justify-center group-hover:bg-[#9AAEFF]/20 transition-all duration-300">
                      <FiClock className="text-[#9AAEFF]" size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-light mb-1">
                        {t.contactInfo.availability}
                      </h4>
                      <p className="text-[#98A2B3] font-light">
                        {contactInfo.availability[language]}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Carte de localisation stylisée */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-linear-to-br from-[#9AAEFF]/5 to-[#7B93FF]/5 rounded-2xl border border-[#9AAEFF]/20 p-8 backdrop-blur-sm"
              >
                <div className="text-center">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      ease: "easeInOut" 
                    }}
                    className="w-16 h-16 bg-linear-to-br from-[#9AAEFF] to-[#7B93FF] rounded-2xl flex items-center justify-center mx-auto shadow-lg mb-4"
                  >
                    <FiMapPin className="w-8 h-8 text-[#1E2430]" />
                  </motion.div>
                  <h3 className="text-white font-light text-xl mb-2">
                    {language === 'fr' ? 'Basés à Paris' : 'Based in Paris'}
                  </h3>
                  <p className="text-[#9AAEFF]/70 font-light text-sm">
                    {language === 'fr' 
                      ? 'Au cœur de l\'innovation éducative' 
                      : 'At the heart of educational innovation'
                    }
                  </p>
                </div>
                
                {/* Carte simplifiée */}
                <div className="mt-6 h-32 bg-[#1E2430]/50 rounded-lg border border-[#9AAEFF]/10 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-[#9AAEFF] rounded-full mx-auto mb-2 opacity-50" />
                    <p className="text-[#98A2B3] text-xs font-light">
                      {language === 'fr' ? 'Carte interactive' : 'Interactive map'}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Statistiques de contact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="bg-[#1E2430]/50 rounded-xl border border-[#9AAEFF]/10 p-4 text-center">
                  <div className="text-2xl font-light text-[#9AAEFF] mb-1">24h</div>
                  <div className="text-[#98A2B3] text-xs font-light">
                    {language === 'fr' ? 'Réponse moyenne' : 'Average response'}
                  </div>
                </div>
                <div className="bg-[#1E2430]/50 rounded-xl border border-[#9AAEFF]/10 p-4 text-center">
                  <div className="text-2xl font-light text-[#9AAEFF] mb-1">98%</div>
                  <div className="text-[#98A2B3] text-xs font-light">
                    {language === 'fr' ? 'Satisfaction client' : 'Client satisfaction'}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Composant AnimatePresence manquant
const AnimatePresence = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default ContactSection;