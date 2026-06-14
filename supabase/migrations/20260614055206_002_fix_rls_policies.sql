-- Create admin_users table to track which auth users are admins
CREATE TABLE admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Admins can see their own row; service role used for managing admin list
CREATE POLICY "admin_users_select" ON admin_users FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- Helper function: returns true if the current user is in admin_users
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM admin_users WHERE user_id = auth.uid()
  );
$$;

-- ── gallery_items ──────────────────────────────────────────────────────────────
DROP POLICY "admin_gallery" ON gallery_items;
CREATE POLICY "admin_gallery_insert" ON gallery_items FOR INSERT TO authenticated WITH CHECK (is_admin());
CREATE POLICY "admin_gallery_update" ON gallery_items FOR UPDATE TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "admin_gallery_delete" ON gallery_items FOR DELETE TO authenticated USING (is_admin());

-- ── holidays ───────────────────────────────────────────────────────────────────
DROP POLICY "admin_holidays" ON holidays;
CREATE POLICY "admin_holidays_insert" ON holidays FOR INSERT TO authenticated WITH CHECK (is_admin());
CREATE POLICY "admin_holidays_update" ON holidays FOR UPDATE TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "admin_holidays_delete" ON holidays FOR DELETE TO authenticated USING (is_admin());

-- ── notices ────────────────────────────────────────────────────────────────────
DROP POLICY "admin_notices" ON notices;
CREATE POLICY "admin_notices_insert" ON notices FOR INSERT TO authenticated WITH CHECK (is_admin());
CREATE POLICY "admin_notices_update" ON notices FOR UPDATE TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "admin_notices_delete" ON notices FOR DELETE TO authenticated USING (is_admin());

-- ── faqs ───────────────────────────────────────────────────────────────────────
DROP POLICY "admin_faqs" ON faqs;
CREATE POLICY "admin_faqs_insert" ON faqs FOR INSERT TO authenticated WITH CHECK (is_admin());
CREATE POLICY "admin_faqs_update" ON faqs FOR UPDATE TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "admin_faqs_delete" ON faqs FOR DELETE TO authenticated USING (is_admin());

-- ── events ─────────────────────────────────────────────────────────────────────
DROP POLICY "admin_events" ON events;
CREATE POLICY "admin_events_insert" ON events FOR INSERT TO authenticated WITH CHECK (is_admin());
CREATE POLICY "admin_events_update" ON events FOR UPDATE TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "admin_events_delete" ON events FOR DELETE TO authenticated USING (is_admin());

-- ── testimonials ───────────────────────────────────────────────────────────────
DROP POLICY "admin_testimonials" ON testimonials;
CREATE POLICY "admin_testimonials_insert" ON testimonials FOR INSERT TO authenticated WITH CHECK (is_admin());
CREATE POLICY "admin_testimonials_update" ON testimonials FOR UPDATE TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "admin_testimonials_delete" ON testimonials FOR DELETE TO authenticated USING (is_admin());

-- ── admissions ─────────────────────────────────────────────────────────────────
-- Public INSERT: restrict so submitters cannot set status themselves
DROP POLICY "insert_admissions" ON admissions;
CREATE POLICY "insert_admissions" ON admissions FOR INSERT TO anon, authenticated WITH CHECK (status = 'pending');

DROP POLICY "admin_admissions_update" ON admissions;
DROP POLICY "admin_admissions_delete" ON admissions;
CREATE POLICY "admin_admissions_update" ON admissions FOR UPDATE TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "admin_admissions_delete" ON admissions FOR DELETE TO authenticated USING (is_admin());

-- ── private_bookings ───────────────────────────────────────────────────────────
DROP POLICY "insert_bookings" ON private_bookings;
CREATE POLICY "insert_bookings" ON private_bookings FOR INSERT TO anon, authenticated WITH CHECK (status = 'pending');

DROP POLICY "admin_bookings_update" ON private_bookings;
DROP POLICY "admin_bookings_delete" ON private_bookings;
CREATE POLICY "admin_bookings_update" ON private_bookings FOR UPDATE TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "admin_bookings_delete" ON private_bookings FOR DELETE TO authenticated USING (is_admin());

-- ── payments ───────────────────────────────────────────────────────────────────
DROP POLICY "insert_payments" ON payments;
CREATE POLICY "insert_payments" ON payments FOR INSERT TO anon, authenticated WITH CHECK (status = 'pending');

DROP POLICY "admin_payments_update" ON payments;
CREATE POLICY "admin_payments_update" ON payments FOR UPDATE TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- ── contact_messages ───────────────────────────────────────────────────────────
-- Public INSERT: ensure submitters cannot mark message as read
DROP POLICY "insert_contact" ON contact_messages;
CREATE POLICY "insert_contact" ON contact_messages FOR INSERT TO anon, authenticated WITH CHECK (is_read = false);

DROP POLICY "admin_contact_update" ON contact_messages;
DROP POLICY "admin_contact_delete" ON contact_messages;
CREATE POLICY "admin_contact_update" ON contact_messages FOR UPDATE TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "admin_contact_delete" ON contact_messages FOR DELETE TO authenticated USING (is_admin());

-- ── newsletter_subscribers ─────────────────────────────────────────────────────
DROP POLICY "insert_newsletter" ON newsletter_subscribers;
CREATE POLICY "insert_newsletter" ON newsletter_subscribers FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY "admin_newsletter_delete" ON newsletter_subscribers;
CREATE POLICY "admin_newsletter_delete" ON newsletter_subscribers FOR DELETE TO authenticated USING (is_admin());
