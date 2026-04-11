-- Add migration script here
-- ============================================================================
-- MIGRATION: Site Web Nova - Tables pour le portail public
-- ============================================================================

-- 1. UTILISATEURS DU SITE (pour l'authentification)
-- ============================================================================
CREATE TABLE IF NOT EXISTS website_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    phone TEXT,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'banned')),
    email_verified BOOLEAN DEFAULT FALSE,
    verification_token TEXT,
    verification_token_expires_at TIMESTAMPTZ,
    reset_password_token TEXT,
    reset_password_expires_at TIMESTAMPTZ,
    last_login_at TIMESTAMPTZ,
    last_login_ip INET,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    synced INTEGER NOT NULL DEFAULT 0 CHECK (synced IN (0, 1)),
    sync_date TIMESTAMPTZ
);

CREATE INDEX idx_website_users_email ON website_users(email);
CREATE INDEX idx_website_users_status ON website_users(status);
CREATE INDEX idx_website_users_role ON website_users(role);
CREATE INDEX idx_website_users_verification_token ON website_users(verification_token);

-- 2. SESSIONS UTILISATEUR
-- ============================================================================
CREATE TABLE IF NOT EXISTS website_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES website_users(id) ON DELETE CASCADE,
    token TEXT NOT NULL UNIQUE,
    ip_address INET NOT NULL,
    user_agent TEXT,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_activity_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    revoked_at TIMESTAMPTZ,
    synced INTEGER NOT NULL DEFAULT 0 CHECK (synced IN (0, 1)),
    sync_date TIMESTAMPTZ
);

CREATE INDEX idx_website_sessions_user ON website_sessions(user_id);
CREATE INDEX idx_website_sessions_token ON website_sessions(token);
CREATE INDEX idx_website_sessions_expires ON website_sessions(expires_at);

-- 3. AVIS / TÉMOIGNAGES (Homepage)
-- ============================================================================
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES website_users(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    role_fr TEXT NOT NULL,
    role_en TEXT NOT NULL,
    comment_fr TEXT NOT NULL,
    comment_en TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 10),
    avatar_url TEXT,
    verified BOOLEAN DEFAULT FALSE,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'hidden', 'pending')),
    report_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    published_at TIMESTAMPTZ,
    synced INTEGER NOT NULL DEFAULT 0 CHECK (synced IN (0, 1)),
    sync_date TIMESTAMPTZ
);

CREATE INDEX idx_testimonials_status ON testimonials(status);
CREATE INDEX idx_testimonials_rating ON testimonials(rating);
CREATE INDEX idx_testimonials_created ON testimonials(created_at);
CREATE INDEX idx_testimonials_user ON testimonials(user_id);

-- 4. SIGNALEMENTS D'AVIS (modération)
-- ============================================================================
CREATE TABLE IF NOT EXISTS testimonial_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    testimonial_id UUID NOT NULL REFERENCES testimonials(id) ON DELETE CASCADE,
    reporter_id UUID REFERENCES website_users(id) ON DELETE SET NULL,
    reporter_name TEXT NOT NULL,
    reporter_email TEXT,
    reason TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'dismissed', 'action_taken')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    reviewed_at TIMESTAMPTZ,
    reviewed_by UUID REFERENCES website_users(id) ON DELETE SET NULL,
    action_taken TEXT,
    synced INTEGER NOT NULL DEFAULT 0 CHECK (synced IN (0, 1)),
    sync_date TIMESTAMPTZ
);

CREATE INDEX idx_testimonial_reports_testimonial ON testimonial_reports(testimonial_id);
CREATE INDEX idx_testimonial_reports_status ON testimonial_reports(status);

-- 5. LIKES SUR LES AVIS
-- ============================================================================
CREATE TABLE IF NOT EXISTS testimonial_likes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    testimonial_id UUID NOT NULL REFERENCES testimonials(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES website_users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    synced INTEGER NOT NULL DEFAULT 0 CHECK (synced IN (0, 1)),
    sync_date TIMESTAMPTZ,
    UNIQUE(testimonial_id, user_id)
);

CREATE INDEX idx_testimonial_likes_testimonial ON testimonial_likes(testimonial_id);
CREATE INDEX idx_testimonial_likes_user ON testimonial_likes(user_id);

-- 6. LICENCES (Portail Licence)
-- ============================================================================
CREATE TABLE IF NOT EXISTS licenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    license_key TEXT NOT NULL UNIQUE,
    institution_name TEXT NOT NULL,
    school_id TEXT NOT NULL UNIQUE,
    plan TEXT NOT NULL CHECK (plan IN ('BASIC', 'PRO', 'PREMIUM', 'ENTERPRISE')),
    status TEXT NOT NULL CHECK (status IN ('active', 'expired', 'pending', 'suspended', 'gracePeriod')),
    issued_date TIMESTAMPTZ NOT NULL,
    expiry_date TIMESTAMPTZ NOT NULL,
    max_version TEXT NOT NULL,
    current_version TEXT NOT NULL,
    installations INTEGER NOT NULL DEFAULT 0,
    max_installations INTEGER NOT NULL DEFAULT 10,
    last_activated_at TIMESTAMPTZ,
    features TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    synced INTEGER NOT NULL DEFAULT 0 CHECK (synced IN (0, 1)),
    sync_date TIMESTAMPTZ
);

CREATE INDEX idx_licenses_key ON licenses(license_key);
CREATE INDEX idx_licenses_school ON licenses(school_id);
CREATE INDEX idx_licenses_status ON licenses(status);
CREATE INDEX idx_licenses_expiry ON licenses(expiry_date);
CREATE INDEX idx_licenses_plan ON licenses(plan);

-- 7. HISTORIQUE DES LICENCES (événements)
-- ============================================================================
CREATE TABLE IF NOT EXISTS license_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    license_id UUID NOT NULL REFERENCES licenses(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL CHECK (event_type IN ('activation', 'suspension', 'reactivation', 'revocation', 'expiration', 'renewal', 'installation')),
    event_message_fr TEXT NOT NULL,
    event_message_en TEXT NOT NULL,
    dot_color TEXT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    synced INTEGER NOT NULL DEFAULT 0 CHECK (synced IN (0, 1)),
    sync_date TIMESTAMPTZ
);

CREATE INDEX idx_license_events_license ON license_events(license_id);
CREATE INDEX idx_license_events_created ON license_events(created_at);

-- 8. TÉLÉCHARGEMENTS DE LICENCE
-- ============================================================================
CREATE TABLE IF NOT EXISTS license_downloads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    license_id UUID NOT NULL REFERENCES licenses(id) ON DELETE CASCADE,
    user_id UUID REFERENCES website_users(id) ON DELETE SET NULL,
    format TEXT NOT NULL CHECK (format IN ('online', 'file', 'usb', 'manual')),
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    synced INTEGER NOT NULL DEFAULT 0 CHECK (synced IN (0, 1)),
    sync_date TIMESTAMPTZ
);

CREATE INDEX idx_license_downloads_license ON license_downloads(license_id);
CREATE INDEX idx_license_downloads_user ON license_downloads(user_id);
CREATE INDEX idx_license_downloads_created ON license_downloads(created_at);

-- 9. ACTIVITÉ GLOBALE DU SITE (pour le fil d'activité)
-- ============================================================================
CREATE TABLE IF NOT EXISTS website_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES website_users(id) ON DELETE SET NULL,
    user_name TEXT NOT NULL,
    action_type TEXT NOT NULL CHECK (action_type IN ('comment', 'like', 'report', 'login', 'register', 'review', 'license_download', 'license_activation')),
    action TEXT NOT NULL,
    target TEXT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    synced INTEGER NOT NULL DEFAULT 0 CHECK (synced IN (0, 1)),
    sync_date TIMESTAMPTZ
);

CREATE INDEX idx_website_activities_user ON website_activities(user_id);
CREATE INDEX idx_website_activities_created ON website_activities(created_at);
CREATE INDEX idx_website_activities_type ON website_activities(action_type);

-- 10. STATISTIQUES MENSUELLES DU SITE (dashboard)
-- ============================================================================
CREATE TABLE IF NOT EXISTS website_monthly_stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    month DATE NOT NULL UNIQUE,
    visitors INTEGER NOT NULL DEFAULT 0,
    new_users INTEGER NOT NULL DEFAULT 0,
    active_users INTEGER NOT NULL DEFAULT 0,
    testimonials_count INTEGER NOT NULL DEFAULT 0,
    license_downloads INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    synced INTEGER NOT NULL DEFAULT 0 CHECK (synced IN (0, 1)),
    sync_date TIMESTAMPTZ
);

CREATE INDEX idx_website_monthly_stats_month ON website_monthly_stats(month);

-- 11. CONTACTS (formulaire de contact)
-- ============================================================================
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied', 'archived')),
    replied_at TIMESTAMPTZ,
    replied_by UUID REFERENCES website_users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    synced INTEGER NOT NULL DEFAULT 0 CHECK (synced IN (0, 1)),
    sync_date TIMESTAMPTZ
);

CREATE INDEX idx_contact_messages_status ON contact_messages(status);
CREATE INDEX idx_contact_messages_created ON contact_messages(created_at);

-- 12. NEWSLETTER (inscriptions)
-- ============================================================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    name TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    subscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    unsubscribed_at TIMESTAMPTZ,
    synced INTEGER NOT NULL DEFAULT 0 CHECK (synced IN (0, 1)),
    sync_date TIMESTAMPTZ
);

CREATE INDEX idx_newsletter_subscribers_email ON newsletter_subscribers(email);
CREATE INDEX idx_newsletter_subscribers_active ON newsletter_subscribers(is_active);

-- ============================================================================
-- MISE À JOUR AUTOMATIQUE DU TIMESTAMP
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;



-- ============================================================================
-- MIGRATION: Site Web Nova - Modules complémentaires
-- ============================================================================

-- 1. SOLUTIONS (page SolutionsSection)
-- ============================================================================
CREATE TABLE IF NOT EXISTS solutions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    index_code TEXT NOT NULL UNIQUE,  -- '01', '02', '03'
    title_key TEXT NOT NULL,  -- 'etablissements', 'enseignants', 'parents'
    icon_name TEXT NOT NULL,  -- 'FiUsers', 'FiUser', 'FiSmartphone'
    headline_fr TEXT NOT NULL,
    headline_en TEXT NOT NULL,
    description_fr TEXT NOT NULL,
    description_en TEXT NOT NULL,
    features_fr TEXT[] NOT NULL,
    features_en TEXT[] NOT NULL,
    kpis JSONB NOT NULL,  -- [{val: '+40%', lbl_fr: 'Efficacité', lbl_en: 'Efficiency'}]
    accent_color TEXT NOT NULL,
    display_order INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    synced INTEGER NOT NULL DEFAULT 0 CHECK (synced IN (0, 1)),
    sync_date TIMESTAMPTZ
);

CREATE INDEX idx_solutions_display_order ON solutions(display_order);
CREATE INDEX idx_solutions_active ON solutions(is_active);

-- 2. OUTILS TECHNIQUES (tools dans SolutionsSection)
-- ============================================================================
CREATE TABLE IF NOT EXISTS technical_tools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_key TEXT NOT NULL UNIQUE,  -- 'algorithmes', 'templates', 'api', 'ressources'
    label_fr TEXT NOT NULL,
    label_en TEXT NOT NULL,
    subtitle_fr TEXT NOT NULL,
    subtitle_en TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    accent_color TEXT NOT NULL,
    action_type TEXT NOT NULL CHECK (action_type IN ('algorithms', 'templates', 'navigate', 'external')),
    action_target TEXT NOT NULL,  -- 'documentation', 'downloads', etc.
    display_order INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    synced INTEGER NOT NULL DEFAULT 0 CHECK (synced IN (0, 1)),
    sync_date TIMESTAMPTZ
);

CREATE INDEX idx_technical_tools_order ON technical_tools(display_order);

-- 3. FORCES (strengths dans SolutionsSection)
-- ============================================================================
CREATE TABLE IF NOT EXISTS strengths (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title_fr TEXT NOT NULL,
    title_en TEXT NOT NULL,
    body_fr TEXT NOT NULL,
    body_en TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    display_order INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    synced INTEGER NOT NULL DEFAULT 0 CHECK (synced IN (0, 1)),
    sync_date TIMESTAMPTZ
);

CREATE INDEX idx_strengths_order ON strengths(display_order);

-- 4. PRODUITS (StoreSection)
-- ============================================================================
CREATE TABLE IF NOT EXISTS store_products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_code TEXT NOT NULL UNIQUE,  -- 'ABFVision', 'ABFVision_Parent', etc.
    category TEXT NOT NULL CHECK (category IN ('software', 'mobile')),
    name_fr TEXT NOT NULL,
    name_en TEXT NOT NULL,
    badge_fr TEXT NOT NULL,
    badge_en TEXT NOT NULL,
    accent_color TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    platform TEXT NOT NULL,
    rating DECIMAL(3,2) NOT NULL CHECK (rating BETWEEN 0 AND 5),
    downloads TEXT NOT NULL,
    description_fr TEXT NOT NULL,
    description_en TEXT NOT NULL,
    features_fr TEXT[] NOT NULL,
    features_en TEXT[] NOT NULL,
    versions JSONB NOT NULL,  -- [{ver: 'v2.1.0', size: '45 MB', req: 'Windows 10+, 4 GB RAM'}]
    display_order INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    synced INTEGER NOT NULL DEFAULT 0 CHECK (synced IN (0, 1)),
    sync_date TIMESTAMPTZ
);

CREATE INDEX idx_store_products_category ON store_products(category);
CREATE INDEX idx_store_products_order ON store_products(display_order);

-- 5. TÉLÉCHARGEMENTS DE PRODUITS
-- ============================================================================
CREATE TABLE IF NOT EXISTS product_downloads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES store_products(id) ON DELETE CASCADE,
    user_id UUID REFERENCES website_users(id) ON DELETE SET NULL,
    version TEXT NOT NULL,
    platform TEXT NOT NULL,
    ip_address INET,
    user_agent TEXT,
    downloaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    synced INTEGER NOT NULL DEFAULT 0 CHECK (synced IN (0, 1)),
    sync_date TIMESTAMPTZ
);

CREATE INDEX idx_product_downloads_product ON product_downloads(product_id);
CREATE INDEX idx_product_downloads_user ON product_downloads(user_id);
CREATE INDEX idx_product_downloads_date ON product_downloads(downloaded_at);

-- 6. ALGORITHMES (AlgorithmsSection)
-- ============================================================================
CREATE TABLE IF NOT EXISTS algorithms_library (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    algo_id TEXT NOT NULL UNIQUE,  -- 'image', 'encryption'
    num TEXT NOT NULL,  -- '01', '02'
    accent_color TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    title_fr TEXT NOT NULL,
    title_en TEXT NOT NULL,
    subtitle_fr TEXT NOT NULL,
    subtitle_en TEXT NOT NULL,
    description_fr TEXT NOT NULL,
    description_en TEXT NOT NULL,
    features_fr TEXT[] NOT NULL,
    features_en TEXT[] NOT NULL,
    kpis JSONB NOT NULL,  -- [{val: '-90%', lbl_fr: 'Stockage', lbl_en: 'Storage'}]
    stack TEXT[] NOT NULL,  -- ['Rust', 'OpenCV', ...]
    display_order INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    synced INTEGER NOT NULL DEFAULT 0 CHECK (synced IN (0, 1)),
    sync_date TIMESTAMPTZ
);

CREATE INDEX idx_algorithms_library_order ON algorithms_library(display_order);

-- 7. IMPLÉMENTATIONS LANGAGES (pour algorithmes)
-- ============================================================================
CREATE TABLE IF NOT EXISTS algorithm_language_impl (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    algorithm_id UUID NOT NULL REFERENCES algorithms_library(id) ON DELETE CASCADE,
    language_code TEXT NOT NULL,  -- 'rust', 'python', 'javascript', 'java', 'cpp', 'go'
    language_label TEXT NOT NULL,
    language_color TEXT NOT NULL,
    version TEXT NOT NULL,
    size TEXT NOT NULL,
    stars INTEGER NOT NULL CHECK (stars BETWEEN 1 AND 5),
    note_fr TEXT NOT NULL,
    note_en TEXT NOT NULL,
    download_url TEXT,
    is_default BOOLEAN DEFAULT FALSE,
    display_order INTEGER NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(algorithm_id, language_code),
    synced INTEGER NOT NULL DEFAULT 0 CHECK (synced IN (0, 1)),
    sync_date TIMESTAMPTZ
);

CREATE INDEX idx_alg_lang_algorithm ON algorithm_language_impl(algorithm_id);
CREATE INDEX idx_alg_lang_default ON algorithm_language_impl(is_default);

-- 8. TÉLÉCHARGEMENTS D'ALGORITHMES
-- ============================================================================
CREATE TABLE IF NOT EXISTS algorithm_downloads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    algorithm_id UUID NOT NULL REFERENCES algorithms_library(id) ON DELETE CASCADE,
    language_id UUID NOT NULL REFERENCES algorithm_language_impl(id) ON DELETE CASCADE,
    user_id UUID REFERENCES website_users(id) ON DELETE SET NULL,
    ip_address INET,
    user_agent TEXT,
    downloaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    synced INTEGER NOT NULL DEFAULT 0 CHECK (synced IN (0, 1)),
    sync_date TIMESTAMPTZ
);

CREATE INDEX idx_alg_downloads_algorithm ON algorithm_downloads(algorithm_id);
CREATE INDEX idx_alg_downloads_user ON algorithm_downloads(user_id);
CREATE INDEX idx_alg_downloads_date ON algorithm_downloads(downloaded_at);

-- 9. DOCUMENTATION TECHNIQUE
-- ============================================================================
CREATE TABLE IF NOT EXISTS technical_docs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    doc_id TEXT NOT NULL UNIQUE,
    title_fr TEXT NOT NULL,
    title_en TEXT NOT NULL,
    subtitle_fr TEXT NOT NULL,
    subtitle_en TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    url TEXT NOT NULL,
    display_order INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    synced INTEGER NOT NULL DEFAULT 0 CHECK (synced IN (0, 1)),
    sync_date TIMESTAMPTZ
);

CREATE INDEX idx_technical_docs_order ON technical_docs(display_order);

-- 10. TEMPLATES (TemplatesSection)
-- ============================================================================
CREATE TABLE IF NOT EXISTS templates_library (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_id TEXT NOT NULL UNIQUE,  -- 't1', 't2', ...
    category TEXT NOT NULL CHECK (category IN ('admin', 'report', 'schedule', 'communication', 'pedagogy')),
    type TEXT NOT NULL CHECK (type IN ('pdf', 'xlsx', 'docx')),
    accent_color TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    name_fr TEXT NOT NULL,
    name_en TEXT NOT NULL,
    description_fr TEXT NOT NULL,
    description_en TEXT NOT NULL,
    downloads INTEGER NOT NULL DEFAULT 0,
    rating DECIMAL(3,2) NOT NULL CHECK (rating BETWEEN 0 AND 5),
    size TEXT NOT NULL,
    tags TEXT[] NOT NULL,
    featured BOOLEAN DEFAULT FALSE,
    file_url TEXT NOT NULL,
    preview_url TEXT,
    display_order INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    synced INTEGER NOT NULL DEFAULT 0 CHECK (synced IN (0, 1)),
    sync_date TIMESTAMPTZ
);

CREATE INDEX idx_templates_category ON templates_library(category);
CREATE INDEX idx_templates_featured ON templates_library(featured);
CREATE INDEX idx_templates_downloads ON templates_library(downloads DESC);

-- 11. TÉLÉCHARGEMENTS DE TEMPLATES
-- ============================================================================
CREATE TABLE IF NOT EXISTS template_downloads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_id UUID NOT NULL REFERENCES templates_library(id) ON DELETE CASCADE,
    user_id UUID REFERENCES website_users(id) ON DELETE SET NULL,
    ip_address INET,
    user_agent TEXT,
    downloaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    synced INTEGER NOT NULL DEFAULT 0 CHECK (synced IN (0, 1)),
    sync_date TIMESTAMPTZ
);

CREATE INDEX idx_template_downloads_template ON template_downloads(template_id);
CREATE INDEX idx_template_downloads_user ON template_downloads(user_id);
CREATE INDEX idx_template_downloads_date ON template_downloads(downloaded_at);

-- 12. TÉLÉCHARGEMENTS GROUPÉS DE TEMPLATES
-- ============================================================================
CREATE TABLE IF NOT EXISTS bulk_template_downloads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES website_users(id) ON DELETE SET NULL,
    template_ids UUID[] NOT NULL,
    ip_address INET,
    user_agent TEXT,
    downloaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    synced INTEGER NOT NULL DEFAULT 0 CHECK (synced IN (0, 1)),
    sync_date TIMESTAMPTZ
);

CREATE INDEX idx_bulk_downloads_user ON bulk_template_downloads(user_id);
CREATE INDEX idx_bulk_downloads_date ON bulk_template_downloads(downloaded_at);

-- 13. CATÉGORIES DE TEMPLATES
-- ============================================================================
CREATE TABLE IF NOT EXISTS template_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id TEXT NOT NULL UNIQUE,  -- 'admin', 'report', etc.
    label_fr TEXT NOT NULL,
    label_en TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    display_order INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    synced INTEGER NOT NULL DEFAULT 0 CHECK (synced IN (0, 1)),
    sync_date TIMESTAMPTZ
);

CREATE INDEX idx_template_categories_order ON template_categories(display_order);

-- 14. CONTACT MESSAGES (déjà dans le fichier précédent, mais complet)
-- ============================================================================
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied', 'archived')),
    replied_at TIMESTAMPTZ,
    replied_by UUID REFERENCES website_users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    synced INTEGER NOT NULL DEFAULT 0 CHECK (synced IN (0, 1)),
    sync_date TIMESTAMPTZ
);

CREATE INDEX idx_contact_messages_status ON contact_messages(status);
CREATE INDEX idx_contact_messages_created ON contact_messages(created_at);


-- ============================================================================
-- INSERTIONS DES DONNÉES INITIALES
-- ============================================================================

-- Solutions
INSERT INTO solutions (index_code, title_key, icon_name, headline_fr, headline_en, description_fr, description_en, features_fr, features_en, kpis, accent_color, display_order) VALUES
('01', 'etablissements', 'FiUsers', 
 'Pilotez tout depuis\nune seule plateforme', 'Manage everything\nfrom one platform',
 'Administration, pédagogie, communication — centralisés, synchronisés, intelligents.', 'Administration, pedagogy, communication — centralized, synchronized, intelligent.',
 ARRAY['Gestion administrative centralisée', 'Suivi pédagogique avancé', 'Communication unifiée', 'Rapports et analytics'],
 ARRAY['Centralized administrative management', 'Advanced pedagogical monitoring', 'Unified communication', 'Reports and analytics'],
 '[{"val": "+40%", "lbl_fr": "Efficacité", "lbl_en": "Efficiency"}, {"val": "-60%", "lbl_fr": "Admin", "lbl_en": "Admin Time"}]',
 '#9AAEFF', 1),
('02', 'enseignants', 'FiUser',
 'Reprenez du temps\npour ce qui compte', 'Reclaim time\nfor what matters',
 'Emplois du temps, notes, ressources pédagogiques — tout s''organise en quelques clics.', 'Schedules, grades, educational resources — everything organizes in a few clicks.',
 ARRAY['Gestion des emplois du temps', 'Saisie et analyse des notes', 'Communication avec les familles', 'Ressources pédagogiques'],
 ARRAY['Schedule management', 'Grade entry and analysis', 'Communication with families', 'Educational resources'],
 '[{"val": "+50%", "lbl_fr": "Productivité", "lbl_en": "Productivity"}, {"val": "-70%", "lbl_fr": "Répétitif", "lbl_en": "Repetitive"}]',
 '#34D399', 2),
('03', 'parents', 'FiSmartphone',
 'Restez au cœur\nde la scolarité', 'Stay at the heart\nof education',
 'Suivi en temps réel, notifications, agenda partagé — la transparence totale, mobile d''abord.', 'Real-time monitoring, notifications, shared calendar — total transparency, mobile-first.',
 ARRAY['Suivi en temps réel', 'Notifications instantanées', 'Communication directe', 'Agenda partagé'],
 ARRAY['Real-time monitoring', 'Instant notifications', 'Direct communication', 'Shared calendar'],
 '[{"val": "+90%", "lbl_fr": "Satisfaction", "lbl_en": "Satisfaction"}, {"val": "24/7", "lbl_fr": "Accès", "lbl_en": "Access"}]',
 '#F59E0B', 3);

-- Technical Tools
INSERT INTO technical_tools (name_key, label_fr, label_en, subtitle_fr, subtitle_en, icon_name, accent_color, action_type, action_target, display_order) VALUES
('algorithmes', 'Algorithmes', 'Algorithms', 'Moteurs d''optimisation brevetés', 'Patented optimization engines', 'FiCpu', '#9AAEFF', 'algorithms', 'algorithms', 1),
('templates', 'Templates', 'Templates', 'Bibliothèque de modèles administratifs', 'Administrative document library', 'FiLayers', '#34D399', 'templates', 'templates', 2),
('api', 'API', 'API', 'Connectez vos outils via notre API', 'Connect your tools via our API', 'FiCode', '#F59E0B', 'navigate', 'documentation', 3),
('ressources', 'Ressources', 'Resources', 'Documentation et téléchargements', 'Documentation and downloads', 'FiDownload', '#C084FC', 'navigate', 'downloads', 4);

-- Strengths
INSERT INTO strengths (title_fr, title_en, body_fr, body_en, icon_name, display_order) VALUES
('Sécurité', 'Security', 'Chiffrement de bout en bout, conformité RGPD, hébergement souverain.', 'End-to-end encryption, GDPR compliance, sovereign hosting.', 'FiShield', 1),
('Analytics', 'Analytics', 'Tableaux de bord temps réel, indicateurs personnalisés, alertes proactives.', 'Real-time dashboards, custom indicators, proactive alerts.', 'FiBarChart2', 2),
('Gain de temps', 'Time Saving', 'Automatisation des tâches répétitives pour se concentrer sur l''essentiel.', 'Automate repetitive tasks to focus on what matters.', 'FiClock', 3),
('Évolutivité', 'Scalability', 'De la petite école au grand campus, la plateforme s''adapte à votre rythme.', 'From small school to large campus, the platform adapts to your pace.', 'FiTrendingUp', 4);

-- Template Categories
INSERT INTO template_categories (category_id, label_fr, label_en, icon_name, display_order) VALUES
('admin', 'Administration', 'Administration', 'FiClipboard', 1),
('report', 'Bulletins', 'Report cards', 'FiBarChart2', 2),
('schedule', 'Emplois du temps', 'Schedules', 'FiCalendar', 3),
('communication', 'Communication', 'Communication', 'FiMail', 4),
('pedagogy', 'Pédagogie', 'Pedagogy', 'FiBook', 5);

-- Algorithms
INSERT INTO algorithms_library (algo_id, num, accent_color, icon_name, title_fr, title_en, subtitle_fr, subtitle_en, description_fr, description_en, features_fr, features_en, kpis, stack, display_order) VALUES
('image', '01', '#9AAEFF', 'FiFileText',
 'Image → Texte', 'Image → Text',
 'Extraction intelligente de texte', 'Intelligent text extraction',
 'Transforme les images en texte structuré pour optimiser le stockage et faciliter la recherche dans toute la base documentaire.',
 'Transforms images into structured text to optimize storage and enable search across the entire document base.',
 ARRAY['OCR haute précision (>99%)', 'Support multilingue', 'Traitement par lots', 'Formatage intelligent', 'Optimisation de stockage'],
 ARRAY['High precision OCR (>99%)', 'Multilingual support', 'Batch processing', 'Smart formatting', 'Storage optimization'],
 '[{"val": "-90%", "lbl_fr": "Stockage", "lbl_en": "Storage"}, {"val": "×10", "lbl_fr": "Vitesse", "lbl_en": "Speed"}, {"val": ">99%", "lbl_fr": "Précision", "lbl_en": "Accuracy"}]',
 ARRAY['Rust', 'OpenCV', 'Tesseract', 'TensorFlow', 'WASM'], 1),
('encryption', '02', '#34D399', 'FiShield',
 'Chiffrement Quantique', 'Quantum Encryption',
 'Protection absolue des données', 'Absolute data protection',
 'Algorithme de chiffrement asymétrique post-quantique qui défie même les intelligences artificielles les plus avancées.',
 'Post-quantum asymmetric encryption algorithm that challenges even the most advanced artificial intelligences.',
 ARRAY['Chiffrement post-quantique', 'Protection contre les IA', 'Vérification d''intégrité', 'Signature numérique', 'Chiffrement hybride'],
 ARRAY['Post-quantum encryption', 'AI protection', 'Integrity verification', 'Digital signature', 'Hybrid encryption'],
 '[{"val": "Militaire", "lbl_fr": "Niveau", "lbl_en": "Grade"}, {"val": "Instantané", "lbl_fr": "Vitesse", "lbl_en": "Speed"}, {"val": "Zéro", "lbl_fr": "Faille connue", "lbl_en": "Known flaw"}]',
 ARRAY['Rust', 'Ring', 'OpenSSL', 'libsodium', 'WASM'], 2);

-- Algorithm Language Implementations
INSERT INTO algorithm_language_impl (algorithm_id, language_code, language_label, language_color, version, size, stars, note_fr, note_en, is_default, display_order)
SELECT 
    a.id,
    lang.code,
    lang.label,
    lang.color,
    lang.version,
    lang.size,
    lang.stars,
    lang.note_fr,
    lang.note_en,
    lang.is_default,
    lang.display_order
FROM algorithms_library a
CROSS JOIN (VALUES 
    ('rust', 'Rust', '#F74C00', 'v2.4.1', '1.2 MB', 5, 'Version originale, performances optimales', 'Original version, optimal performance', true, 1),
    ('python', 'Python', '#3776AB', 'v2.3.0', '850 KB', 5, 'Facile à intégrer, large adoption', 'Easy to integrate, wide adoption', false, 2),
    ('javascript', 'JS / TS', '#F7DF1E', 'v2.2.0', '450 KB', 4, 'Pour applications web modernes', 'For modern web applications', false, 3),
    ('java', 'Java', '#007396', 'v2.1.0', '1.8 MB', 4, 'Entreprise, robuste et scalable', 'Enterprise, robust and scalable', false, 4),
    ('cpp', 'C++', '#00599C', 'v2.0.0', '2.1 MB', 3, 'Haute performance, contrôle total', 'High performance, total control', false, 5),
    ('go', 'Go', '#00ADD8', 'v2.2.0', '950 KB', 4, 'Concurrent, performances élevées', 'Concurrent, high performance', false, 6)
) AS lang(code, label, color, version, size, stars, note_fr, note_en, is_default, display_order)
WHERE a.algo_id = 'image';

-- Technical Documentation
INSERT INTO technical_docs (doc_id, title_fr, title_en, subtitle_fr, subtitle_en, icon_name, url, display_order) VALUES
('api_doc', 'Documentation API', 'API Documentation', 'Référence complète de l''API', 'Complete API reference', 'FiFileText', '/docs/api', 1),
('integration', 'Guide d''intégration', 'Integration Guide', 'Étape par étape', 'Step by step', 'FiBook', '/docs/integration', 2),
('examples', 'Exemples', 'Examples', 'Cas concrets d''utilisation', 'Practical usage cases', 'FiCode', '/docs/examples', 3),
('benchmarks', 'Benchmarks', 'Benchmarks', 'Comparaisons de performances', 'Performance comparisons', 'FiBarChart2', '/docs/benchmarks', 4),
('security_audit', 'Audit sécurité', 'Security Audit', 'Rapport de certification', 'Certification report', 'FiShield', '/docs/security', 5);

-- ============================================================================
-- FONCTIONS UTILITAIRES
-- ============================================================================

-- Fonction pour incrémenter les téléchargements de template
CREATE OR REPLACE FUNCTION increment_template_downloads(template_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE templates_library 
    SET downloads = downloads + 1,
        updated_at = NOW()
    WHERE id = template_id;
END;
$$ LANGUAGE plpgsql;

-- Fonction pour obtenir les templates populaires
CREATE OR REPLACE FUNCTION get_popular_templates(limit_count INTEGER DEFAULT 10)
RETURNS TABLE(
    id UUID,
    name_fr TEXT,
    name_en TEXT,
    downloads INTEGER,
    rating DECIMAL,
    category TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT t.id, t.name_fr, t.name_en, t.downloads, t.rating, t.category
    FROM templates_library t
    WHERE t.is_active = true
    ORDER BY t.downloads DESC
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;
