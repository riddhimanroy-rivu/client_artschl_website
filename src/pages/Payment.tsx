import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { CreditCard, Shield, CheckCircle, AlertCircle } from 'lucide-react';

export default function Payment() {
  const [form, setForm] = useState({
    student_name: '', email: '', phone: '', payment_type: 'admission_fee', amount: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.student_name || !form.amount) {
      setError('Please fill all required fields');
      return;
    }
    setLoading(true);

    const { error: dbError } = await supabase.from('payments').insert([{
      student_name: form.student_name,
      email: form.email || null,
      phone: form.phone || null,
      payment_type: form.payment_type,
      amount: parseFloat(form.amount),
      status: 'pending',
    }]);

    if (dbError) {
      setError('Something went wrong. Please try again.');
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <div className="pt-16 md:pt-20 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 max-w-md mx-auto">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h2 className="font-display text-3xl font-bold text-royal-800 mb-4">Payment Initiated!</h2>
          <p className="text-gray-600 mb-6">
            Your payment request has been recorded. For now, please complete the payment via UPI or contact the school directly. A receipt will be generated upon confirmation.
          </p>
          <div className="bg-white rounded-xl shadow-md p-6 text-left space-y-3">
            <h3 className="font-semibold text-royal-800">Payment Details</h3>
            <p className="text-sm text-gray-600"><strong>Name:</strong> {form.student_name}</p>
            <p className="text-sm text-gray-600"><strong>Type:</strong> {form.payment_type.replace('_', ' ')}</p>
            <p className="text-sm text-gray-600"><strong>Amount:</strong> Rs. {form.amount}</p>
            <div className="border-t pt-3 mt-3">
              <p className="text-sm text-gray-500">Transaction ID will be sent to your email/phone after confirmation.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 md:pt-20">
      <section className="bg-gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">Online Payment</h1>
          <p className="text-blue-100 text-xl">Pay your fees securely online</p>
        </div>
      </section>

      <section className="py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Payment Methods */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 mb-10">
          {['UPI', 'GPay', 'PhonePe', 'Paytm', 'Visa', 'Mastercard', 'RuPay', 'Net Banking'].map((method) => (
            <div key={method} className="bg-white rounded-lg shadow-sm p-2 flex items-center justify-center text-xs font-medium text-gray-600 border border-gray-100">
              {method}
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
          <div className="flex items-center gap-2 mb-2">
            <CreditCard className="w-5 h-5 text-royal-600" />
            <h2 className="font-display text-xl font-bold text-royal-800">Make a Payment</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="label-field">Student Name *</label>
              <input name="student_name" value={form.student_name} onChange={handleChange} className="input-field" required />
            </div>
            <div>
              <label className="label-field">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} className="input-field" />
            </div>
            <div>
              <label className="label-field">Phone Number</label>
              <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="input-field" />
            </div>
            <div>
              <label className="label-field">Payment Type *</label>
              <select name="payment_type" value={form.payment_type} onChange={handleChange} className="input-field">
                <option value="admission_fee">Admission Fee</option>
                <option value="monthly_fee">Monthly Fee</option>
                <option value="private_class_fee">Private Class Fee</option>
              </select>
            </div>
            <div>
              <label className="label-field">Amount (INR) *</label>
              <input type="number" name="amount" value={form.amount} onChange={handleChange} className="input-field" min="1" placeholder="Enter amount" required />
            </div>
          </div>

          <div className="bg-royal-50 rounded-lg p-4 flex items-start gap-2">
            <Shield className="w-5 h-5 text-royal-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-royal-800">
              <p className="font-medium">Secure Payment</p>
              <p className="text-royal-600 text-xs mt-1">Your payment information is encrypted and secure. We support UPI, Google Pay, PhonePe, Paytm, Credit/Debit Cards, and Net Banking.</p>
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full btn-primary text-lg flex items-center justify-center gap-2 disabled:opacity-50">
            {loading ? 'Processing...' : <>Pay Now <CreditCard className="w-5 h-5" /></>}
          </button>
        </form>

        {/* UPI Quick Pay */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6 text-center">
          <h3 className="font-display text-lg font-bold text-royal-800 mb-3">Quick UPI Payment</h3>
          <p className="text-gray-500 text-sm mb-4">Scan QR code or use UPI ID to pay directly</p>
          <div className="bg-gray-50 rounded-lg p-4 inline-block">
            <p className="text-royal-700 font-mono text-sm">Contact school for UPI details</p>
          </div>
          <p className="text-gray-400 text-xs mt-3">After payment, please send screenshot to +91 9051349496 on WhatsApp for confirmation</p>
        </div>
      </section>
    </div>
  );
}
