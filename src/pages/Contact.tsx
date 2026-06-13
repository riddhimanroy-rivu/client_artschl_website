import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.message) {
      setError('Name, email, and message are required');
      return;
    }
    setLoading(true);
    const { error: dbError } = await supabase.from('contact_messages').insert([{
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      subject: form.subject || null,
      message: form.message,
    }]);
    if (dbError) {
      setError('Something went wrong. Please try again.');
      setLoading(false);
      return;
    }
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="pt-16 md:pt-20">
      <section className="bg-gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-blue-100 text-xl">We would love to hear from you</p>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="section-title mb-8">Get in Touch</h2>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-royal-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-royal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-royal-800">Address</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    P16/A, 2 No. Bacharpara Road<br />
                    Thakurpukur<br />
                    Kolkata – 700063<br />
                    West Bengal, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-royal-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-royal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-royal-800">Phone</h3>
                  <div className="space-y-1 mt-1">
                    <a href="tel:+919831090796" className="block text-gray-600 text-sm hover:text-royal-600 transition-colors">
                      Amit Roy: +91 9831090796
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-royal-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-royal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-royal-800">Email</h3>
                  <a href="mailto:amitroynu@gmail.com" className="text-gray-600 text-sm hover:text-royal-600 transition-colors mt-1 block">
                    amitroynu@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-royal-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-royal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-royal-800">Class Hours</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Saturday: 9:00 AM – 11:30 AM<br />
                    Sunday: 8:00 AM – 1:00 PM, 4:00 PM – 6:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href="https://wa.me/919831090796?text=Hello%20Sir%2C%20I%20would%20like%20to%20inquire%20about%20ART-LINE%20classes."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-lg font-semibold transition-all flex items-center gap-2 text-sm"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
              <a href="tel:+919831090796" className="btn-outline text-sm flex items-center gap-2">
                <Phone className="w-4 h-4" /> Call Now
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            {submitted ? (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="font-display text-2xl font-bold text-royal-800 mb-2">Message Sent!</h3>
                <p className="text-gray-600">Thank you for contacting us. We will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 md:p-8 space-y-4">
                <h2 className="font-display text-xl font-bold text-royal-800 mb-2">Send us a Message</h2>
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label-field">Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} className="input-field" required />
                  </div>
                  <div>
                    <label className="label-field">Email *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} className="input-field" required />
                  </div>
                  <div>
                    <label className="label-field">Phone</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="input-field" />
                  </div>
                  <div>
                    <label className="label-field">Subject</label>
                    <input name="subject" value={form.subject} onChange={handleChange} className="input-field" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label-field">Message *</label>
                    <textarea name="message" value={form.message} onChange={handleChange} className="input-field" rows={4} required />
                  </div>
                </div>
                <button type="submit" disabled={loading} className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50">
                  {loading ? 'Sending...' : <>Send Message <Send className="w-5 h-5" /></>}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Map */}
        <div className="mt-12 rounded-xl overflow-hidden shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.5!2d88.3!3d22.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sThakurpukur%2C%20Kolkata!5e0!3m2!1sen!2sin!4v1"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="ART-LINE Location"
            className="w-full"
          />
        </div>
      </section>
    </div>
  );
}
