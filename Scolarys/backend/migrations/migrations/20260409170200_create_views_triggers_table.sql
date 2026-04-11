-- Add migration script here
CREATE TRIGGER trigger_website_users_updated_at
    BEFORE UPDATE ON website_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_testimonials_updated_at
    BEFORE UPDATE ON testimonials
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_licenses_updated_at
    BEFORE UPDATE ON licenses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_website_monthly_stats_updated_at
    BEFORE UPDATE ON website_monthly_stats
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- VUES UTILITAIRES
-- ============================================================================

-- Vue des témoignages publiés avec likes
CREATE VIEW v_published_testimonials AS
SELECT 
    t.id,
    t.name,
    t.role_fr,
    t.role_en,
    t.comment_fr,
    t.comment_en,
    t.rating,
    t.avatar_url,
    t.verified,
    t.created_at,
    COUNT(tl.id) AS likes_count,
    EXISTS (SELECT 1 FROM testimonial_likes WHERE testimonial_id = t.id AND user_id = current_user_id()) AS user_has_liked
FROM testimonials t
LEFT JOIN testimonial_likes tl ON t.id = tl.testimonial_id
WHERE t.status = 'published'
GROUP BY t.id;

-- Vue des statistiques du portail licence
CREATE VIEW v_license_portal_stats AS
SELECT 
    COUNT(*) AS total_licenses,
    COUNT(CASE WHEN status = 'active' AND expiry_date > NOW() THEN 1 END) AS active_licenses,
    COUNT(CASE WHEN status = 'expired' OR expiry_date <= NOW() THEN 1 END) AS expired_licenses,
    COUNT(CASE WHEN plan = 'ENTERPRISE' THEN 1 END) AS enterprise_count,
    COUNT(CASE WHEN plan = 'PREMIUM' THEN 1 END) AS premium_count,
    COUNT(CASE WHEN plan = 'PRO' THEN 1 END) AS pro_count,
    COUNT(CASE WHEN plan = 'BASIC' THEN 1 END) AS basic_count,
    SUM(installations) AS total_installations,
    AVG(EXTRACT(DAY FROM (expiry_date - NOW()))) AS avg_days_remaining
FROM licenses;

-- 15. STATISTIQUES DES PRODUITS (vue matérialisée)
-- ============================================================================
CREATE MATERIALIZED VIEW IF NOT EXISTS mv_product_stats AS
SELECT 
    sp.category,
    COUNT(*) AS total_products,
    SUM(sp.downloads::INTEGER) AS total_downloads,
    AVG(sp.rating) AS avg_rating,
    COUNT(DISTINCT pd.user_id) AS unique_downloaders
FROM store_products sp
LEFT JOIN product_downloads pd ON sp.id = pd.product_id
WHERE sp.is_active = true
GROUP BY sp.category;

REFRESH MATERIALIZED VIEW CONCURRENTLY mv_product_stats;

-- 16. STATISTIQUES DES TEMPLATES (vue matérialisée)
-- ============================================================================
CREATE MATERIALIZED VIEW IF NOT EXISTS mv_template_stats AS
SELECT 
    category,
    COUNT(*) AS total_templates,
    SUM(downloads) AS total_downloads,
    AVG(rating) AS avg_rating
FROM templates_library
WHERE is_active = true
GROUP BY category;

REFRESH MATERIALIZED VIEW CONCURRENTLY mv_template_stats;

-- ============================================================================
-- TRIGGERS DE MISE À JOUR
-- ============================================================================

-- Mise à jour du compteur de téléchargements pour les templates
CREATE OR REPLACE FUNCTION update_template_download_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE templates_library 
    SET downloads = downloads + 1,
        updated_at = NOW()
    WHERE id = NEW.template_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_template_download_count
    AFTER INSERT ON template_downloads
    FOR EACH ROW
    EXECUTE FUNCTION update_template_download_count();

-- Mise à jour du compteur de téléchargements pour les produits
CREATE OR REPLACE FUNCTION update_product_download_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE store_products 
    SET downloads = (downloads::INTEGER + 1)::TEXT,
        updated_at = NOW()
    WHERE id = NEW.product_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_product_download_count
    AFTER INSERT ON product_downloads
    FOR EACH ROW
    EXECUTE FUNCTION update_product_download_count();
