-- Admissions table
CREATE TABLE admissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name TEXT NOT NULL,
  date_of_birth DATE,
  age INTEGER,
  gender TEXT,
  school_name TEXT,
  class_grade TEXT,
  parent_guardian_name TEXT,
  father_name TEXT,
  mother_name TEXT,
  address TEXT,
  mobile_number TEXT NOT NULL,
  whatsapp_number TEXT,
  email TEXT,
  preferred_timing TEXT,
  preferred_day TEXT,
  previous_art_experience TEXT,
  medical_info TEXT,
  photo_url TEXT,
  agreed_terms BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Private class bookings
CREATE TABLE private_bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name TEXT NOT NULL,
  contact_number TEXT NOT NULL,
  whatsapp_number TEXT,
  email TEXT,
  preferred_date DATE,
  preferred_time_slot TEXT,
  purpose TEXT,
  additional_notes TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Gallery items
CREATE TABLE gallery_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  description TEXT,
  is_video BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Holidays
CREATE TABLE holidays (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Notices
CREATE TABLE notices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  is_pinned BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Payments
CREATE TABLE payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  payment_type TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  transaction_id TEXT,
  payment_method TEXT,
  status TEXT DEFAULT 'pending',
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Testimonials
CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Newsletter subscribers
CREATE TABLE newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Contact messages
CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- FAQ
CREATE TABLE faqs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Events
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  time TEXT,
  location TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE admissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE private_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE holidays ENABLE ROW LEVEL SECURITY;
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- RLS policies: public read for gallery, holidays, notices, faqs, events, approved testimonials
CREATE POLICY "read_gallery" ON gallery_items FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admin_gallery" ON gallery_items FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "read_holidays" ON holidays FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admin_holidays" ON holidays FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "read_notices" ON notices FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admin_notices" ON notices FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "read_faqs" ON faqs FOR SELECT TO anon, authenticated USING (is_active = true);
CREATE POLICY "admin_faqs" ON faqs FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "read_events" ON events FOR SELECT TO anon, authenticated USING (is_active = true);
CREATE POLICY "admin_events" ON events FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "read_testimonials" ON testimonials FOR SELECT TO anon, authenticated USING (is_approved = true);
CREATE POLICY "admin_testimonials" ON testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- RLS policies: insert for public on admissions, bookings, payments, contact, newsletter
CREATE POLICY "insert_admissions" ON admissions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "admin_admissions" ON admissions FOR SELECT TO authenticated USING (true);
CREATE POLICY "admin_admissions_update" ON admissions FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "admin_admissions_delete" ON admissions FOR DELETE TO authenticated USING (true);

CREATE POLICY "insert_bookings" ON private_bookings FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "admin_bookings" ON private_bookings FOR SELECT TO authenticated USING (true);
CREATE POLICY "admin_bookings_update" ON private_bookings FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "admin_bookings_delete" ON private_bookings FOR DELETE TO authenticated USING (true);

CREATE POLICY "insert_payments" ON payments FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "admin_payments" ON payments FOR SELECT TO authenticated USING (true);
CREATE POLICY "admin_payments_update" ON payments FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "insert_contact" ON contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "admin_contact" ON contact_messages FOR SELECT TO authenticated USING (true);
CREATE POLICY "admin_contact_update" ON contact_messages FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "admin_contact_delete" ON contact_messages FOR DELETE TO authenticated USING (true);

CREATE POLICY "insert_newsletter" ON newsletter_subscribers FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "admin_newsletter" ON newsletter_subscribers FOR SELECT TO authenticated USING (true);
CREATE POLICY "admin_newsletter_delete" ON newsletter_subscribers FOR DELETE TO authenticated USING (true);

-- Insert sample data
INSERT INTO holidays (date, name, description) VALUES
  ('2026-01-26', 'Republic Day', 'National Holiday'),
  ('2026-03-14', 'Holi', 'Festival of Colors'),
  ('2026-04-02', 'Ram Navami', 'Religious Holiday'),
  ('2026-04-14', 'Ambedkar Jayanti', 'National Holiday'),
  ('2026-05-01', 'May Day', 'Labour Day'),
  ('2026-08-15', 'Independence Day', 'National Holiday'),
  ('2026-10-02', 'Gandhi Jayanti', 'National Holiday'),
  ('2026-10-20', 'Durga Puja', 'Biggest Festival of Bengal'),
  ('2026-11-01', 'Kali Puja', 'Religious Holiday'),
  ('2026-12-25', 'Christmas', 'National Holiday');

INSERT INTO notices (title, content, is_pinned) VALUES
  ('Welcome to ARTLINE 2026', 'We are excited to welcome all new and returning students to ARTLINE Fine Arts & Drawing School. Classes begin from the first week of January. Please check the class schedule for your assigned timings.', true),
  ('Annual Exhibition 2026', 'Our annual art exhibition will be held in March 2026. All students are encouraged to participate and showcase their best artwork. Registration details will be shared soon.', true),
  ('New Batch Starting Soon', 'A new batch for beginners is starting from next month. Interested students can apply through the admission form on our website or contact us directly.', false),
  ('Holiday Schedule Update', 'Please check the updated holiday list for 2026. Classes will remain closed on all listed holidays. Make-up classes will be arranged where possible.', false);

INSERT INTO faqs (question, answer, sort_order) VALUES
  ('What age groups do you teach?', 'We accept students from age 5 and above. Our classes are designed for different age groups with age-appropriate teaching methods.', 1),
  ('What art materials do I need?', 'Basic materials like pencils, erasers, and drawing paper are required initially. As you progress, you may need watercolors, acrylics, brushes, and canvas. A detailed list will be provided upon admission.', 2),
  ('Can I join mid-session?', 'Yes, we accept new students throughout the year. Our flexible curriculum allows new students to integrate smoothly into ongoing classes.', 3),
  ('Do you offer private classes?', 'Yes, private one-on-one classes are available on request. You can book a private class through our website or by contacting the teacher directly.', 4),
  ('What is the fee structure?', 'Please contact us directly for the current fee structure. We offer affordable pricing and flexible payment options including monthly and quarterly plans.', 5),
  ('Is there a trial class available?', 'Yes, we offer a free trial class for new students. This allows you to experience our teaching methodology before enrolling.', 6);

INSERT INTO testimonials (student_name, content, rating, is_approved) VALUES
  ('Priya Sharma', 'ARTLINE has completely transformed my artistic abilities. Amit Sir''s teaching method is unique and very effective. I have improved so much in just a few months!', 5, true),
  ('Rahul Mukherjee', 'The best art school in Kolkata! The environment here is so creative and encouraging. I look forward to every class.', 5, true),
  ('Ananya Das', 'I started as a complete beginner and now I can create beautiful artwork. Thank you ARTLINE for nurturing my creativity!', 5, true),
  ('Vikram Sen', 'My daughter loves coming to ARTLINE. The teacher is patient and skilled. Highly recommended for children who love art.', 5, true),
  ('Sneha Banerjee', 'The private classes are excellent for focused learning. Amit Sir gives personal attention to every detail.', 5, true);
