import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Send, CheckCircle, AlertCircle, Clock } from 'lucide-react';

export default function PrivateBooking() {
  const [form, setForm] = useState({
    student_name: '', contact_number: '', whatsapp_number: '', email: '',
    preferred_date: '', preferred_time_slot: '', purpose: '', additional_notes: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.student_name || !form.contact_number) {
      setError('Student name and contact number are required');
      return;
    }
    setLoading(true);
    const { error: dbError } = await supabase.from('private_bookings').insert([{
      student_name: form.student_name,
      contact_number: form.contact_number,
      whatsapp_number: form.whatsapp_number || null,
      email: form.email || null,
      preferred_date: form.preferred_date || null,
      preferred_time_slot: form.preferred_time_slot || null,
      purpose: form.purpose || null,
      additional_notes: form.additional_notes || null,
    }]);
    if (dbError) {
      setError('Something went wrong. Please try again.');
      setLoading(false);
      return;
    }
    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="pt-16 md:pt-20 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 max-w-md mx-auto">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h2 className="font-display text-3xl font-bold text-royal-800 mb-4">Booking Request Sent!</h2>
          <p className="text-gray-600 mb-6">
            Your private class booking request has been submitted. Amit Sir will review your request and confirm the availability shortly.
          </p>
          <p className="text-sm text-gray-400">You will receive a confirmation on your contact number.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 md:pt-20">
      <section className="bg-gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">Private Class Booking</h1>
          <p className="text-blue-100 text-xl">Request a one-on-one session with personalized attention</p>
        </div>
      </section>

      <section className="py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Benefits */}
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {[
            { icon: Clock, title: 'Flexible Timing', desc: 'Choose your preferred date and time' },
            { icon: CheckCircle, title: 'Personal Attention', desc: 'One-on-one guidance from Amit Sir' },
            { icon: Send, title: 'Quick Confirmation', desc: 'Get booking confirmed within 24 hours' },
          ].map((item, i) => (
            <div key={i} className="bg-royal-50 rounded-xl p-4 text-center">
              <item.icon className="w-6 h-6 text-royal-600 mx-auto mb-2" />
              <h3 className="font-semibold text-royal-800 text-sm">{item.title}</h3>
              <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
            </div>
          ))}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 md:p-8 space-y-4">
          <h2 className="font-display text-xl font-bold text-royal-800 mb-2">Book a Private Class</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label-field">Student Name *</label>
              <input name="student_name" value={form.student_name} onChange={handleChange} className="input-field" required />
            </div>
            <div>
              <label className="label-field">Contact Number *</label>
              <input type="tel" name="contact_number" value={form.contact_number} onChange={handleChange} className="input-field" placeholder="+91" required />
            </div>
            <div>
              <label className="label-field">WhatsApp Number</label>
              <input type="tel" name="whatsapp_number" value={form.whatsapp_number} onChange={handleChange} className="input-field" />
            </div>
            <div>
              <label className="label-field">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} className="input-field" />
            </div>
            <div>
              <label className="label-field">Preferred Date</label>
              <input type="date" name="preferred_date" value={form.preferred_date} onChange={handleChange} className="input-field" min={new Date().toISOString().split('T')[0]} />
            </div>
            <div>
              <label className="label-field">Preferred Time Slot</label>
              <select name="preferred_time_slot" value={form.preferred_time_slot} onChange={handleChange} className="input-field">
                <option value="">Select Time</option>
                <option>8:00 AM – 9:00 AM</option>
                <option>9:00 AM – 10:00 AM</option>
                <option>10:00 AM – 11:00 AM</option>
                <option>11:00 AM – 12:00 PM</option>
                <option>12:00 PM – 1:00 PM</option>
                <option>4:00 PM – 5:00 PM</option>
                <option>5:00 PM – 6:00 PM</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="label-field">Purpose of Private Class</label>
              <textarea name="purpose" value={form.purpose} onChange={handleChange} className="input-field" rows={2} placeholder="e.g., Exam preparation, Portfolio building, Skill improvement" />
            </div>
            <div className="sm:col-span-2">
              <label className="label-field">Additional Notes</label>
              <textarea name="additional_notes" value={form.additional_notes} onChange={handleChange} className="input-field" rows={2} />
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full btn-primary text-lg flex items-center justify-center gap-2 disabled:opacity-50">
            {loading ? 'Submitting...' : <>Submit Booking Request <Send className="w-5 h-5" /></>}
          </button>
        </form>
      </section>
    </div>
  );
}
