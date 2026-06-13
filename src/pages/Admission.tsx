import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function Admission() {
  const [form, setForm] = useState({
    student_name: '', date_of_birth: '', age: '', gender: '', school_name: '',
    class_grade: '', parent_guardian_name: '', father_name: '', mother_name: '',
    address: '', mobile_number: '', whatsapp_number: '', email: '',
    preferred_timing: '', preferred_day: '', previous_art_experience: '',
    medical_info: '', agreed_terms: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.agreed_terms) {
      setError('You must agree to the terms and conditions');
      return;
    }
    if (!form.student_name || !form.mobile_number) {
      setError('Student name and mobile number are required');
      return;
    }

    setLoading(true);
    const { error: dbError } = await supabase.from('admissions').insert([{
      student_name: form.student_name,
      date_of_birth: form.date_of_birth || null,
      age: form.age ? parseInt(form.age) : null,
      gender: form.gender || null,
      school_name: form.school_name || null,
      class_grade: form.class_grade || null,
      parent_guardian_name: form.parent_guardian_name || null,
      father_name: form.father_name || null,
      mother_name: form.mother_name || null,
      address: form.address || null,
      mobile_number: form.mobile_number,
      whatsapp_number: form.whatsapp_number || null,
      email: form.email || null,
      preferred_timing: form.preferred_timing || null,
      preferred_day: form.preferred_day || null,
      previous_art_experience: form.previous_art_experience || null,
      medical_info: form.medical_info || null,
      agreed_terms: form.agreed_terms,
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
          <h2 className="font-display text-3xl font-bold text-royal-800 mb-4">Application Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for applying to ART-LINE. We have received your admission form. Our team will contact you shortly to confirm your enrollment.
          </p>
          <p className="text-sm text-gray-400">You will receive a confirmation on your provided contact number.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 md:pt-20">
      <section className="bg-gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">Online Admission</h1>
          <p className="text-blue-100 text-xl">Fill the form below to apply for admission at ART-LINE</p>
        </div>
      </section>

      <section className="py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Student Information */}
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            <h2 className="font-display text-xl font-bold text-royal-800 mb-6 pb-3 border-b border-gray-100">Student Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="label-field">Student Name *</label>
                <input name="student_name" value={form.student_name} onChange={handleChange} className="input-field" required />
              </div>
              <div>
                <label className="label-field">Date of Birth</label>
                <input type="date" name="date_of_birth" value={form.date_of_birth} onChange={handleChange} className="input-field" />
              </div>
              <div>
                <label className="label-field">Age</label>
                <input type="number" name="age" value={form.age} onChange={handleChange} className="input-field" min="3" max="100" />
              </div>
              <div>
                <label className="label-field">Gender</label>
                <select name="gender" value={form.gender} onChange={handleChange} className="input-field">
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="label-field">School Name</label>
                <input name="school_name" value={form.school_name} onChange={handleChange} className="input-field" />
              </div>
              <div>
                <label className="label-field">Class/Grade</label>
                <input name="class_grade" value={form.class_grade} onChange={handleChange} className="input-field" placeholder="e.g., Class 5" />
              </div>
            </div>
          </div>

          {/* Parent Information */}
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            <h2 className="font-display text-xl font-bold text-royal-800 mb-6 pb-3 border-b border-gray-100">Parent/Guardian Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="label-field">Parent/Guardian Name</label>
                <input name="parent_guardian_name" value={form.parent_guardian_name} onChange={handleChange} className="input-field" />
              </div>
              <div>
                <label className="label-field">Father's Name</label>
                <input name="father_name" value={form.father_name} onChange={handleChange} className="input-field" />
              </div>
              <div>
                <label className="label-field">Mother's Name</label>
                <input name="mother_name" value={form.mother_name} onChange={handleChange} className="input-field" />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            <h2 className="font-display text-xl font-bold text-royal-800 mb-6 pb-3 border-b border-gray-100">Contact Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="label-field">Address</label>
                <textarea name="address" value={form.address} onChange={handleChange} className="input-field" rows={2} />
              </div>
              <div>
                <label className="label-field">Mobile Number *</label>
                <input type="tel" name="mobile_number" value={form.mobile_number} onChange={handleChange} className="input-field" placeholder="+91" required />
              </div>
              <div>
                <label className="label-field">WhatsApp Number</label>
                <input type="tel" name="whatsapp_number" value={form.whatsapp_number} onChange={handleChange} className="input-field" placeholder="+91" />
              </div>
              <div className="sm:col-span-2">
                <label className="label-field">Email Address</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} className="input-field" />
              </div>
            </div>
          </div>

          {/* Class Preference */}
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            <h2 className="font-display text-xl font-bold text-royal-800 mb-6 pb-3 border-b border-gray-100">Class Preference</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label-field">Preferred Day</label>
                <select name="preferred_day" value={form.preferred_day} onChange={handleChange} className="input-field">
                  <option value="">Select Day</option>
                  <option>Saturday</option>
                  <option>Sunday</option>
                </select>
              </div>
              <div>
                <label className="label-field">Preferred Class Timing</label>
                <select name="preferred_timing" value={form.preferred_timing} onChange={handleChange} className="input-field">
                  <option value="">Select Timing</option>
                  <option>Saturday 9:00 AM – 10:00 AM</option>
                  <option>Saturday 10:00 AM – 11:00 AM</option>
                  <option>Saturday 10:30 AM – 11:30 AM</option>
                  <option>Sunday 8:00 AM – 9:00 AM</option>
                  <option>Sunday 9:00 AM – 10:00 AM</option>
                  <option>Sunday 10:00 AM – 11:00 AM</option>
                  <option>Sunday 11:00 AM – 12:00 PM</option>
                  <option>Sunday 12:00 PM – 1:00 PM</option>
                  <option>Sunday 4:00 PM – 5:00 PM</option>
                  <option>Sunday 5:00 PM – 6:00 PM</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="label-field">Previous Art Experience</label>
                <textarea name="previous_art_experience" value={form.previous_art_experience} onChange={handleChange} className="input-field" rows={2} placeholder="Describe any prior art training or experience" />
              </div>
              <div className="sm:col-span-2">
                <label className="label-field">Medical Information <span className="text-gray-400">(Optional)</span></label>
                <textarea name="medical_info" value={form.medical_info} onChange={handleChange} className="input-field" rows={2} placeholder="Any medical conditions we should be aware of" />
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="agreed_terms"
                checked={form.agreed_terms}
                onChange={handleChange}
                className="mt-1 w-4 h-4 rounded border-gray-300 text-royal-600 focus:ring-royal-500"
              />
              <span className="text-sm text-gray-600">
                I agree to the school terms and conditions. I understand that admission is subject to availability and confirmation by the school administration.
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting...' : <>Submit Application <Send className="w-5 h-5" /></>}
          </button>
        </form>
      </section>
    </div>
  );
}
