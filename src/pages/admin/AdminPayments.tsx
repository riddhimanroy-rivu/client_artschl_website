import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, CreditCard, Download } from 'lucide-react';

interface Payment {
  id: string;
  student_name: string;
  email: string;
  phone: string;
  payment_type: string;
  amount: number;
  status: string;
  created_at: string;
}

export default function AdminPayments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) navigate('/admin');
    });
    supabase.from('payments').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      if (data) setPayments(data);
    });
  }, [navigate]);

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    completed: 'bg-green-100 text-green-700',
    failed: 'bg-red-100 text-red-700',
  };

  const exportCSV = () => {
    const headers = ['Student', 'Type', 'Amount', 'Status', 'Date'];
    const rows = payments.map((p) => [p.student_name, p.payment_type, p.amount, p.status, p.created_at]);
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'payments.csv';
    a.click();
  };

  const totalAmount = payments.reduce((sum, p) => sum + (p.status === 'completed' ? p.amount : 0), 0);

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link to="/admin/dashboard" className="w-10 h-10 rounded-lg bg-white shadow flex items-center justify-center hover:shadow-md">
              <ArrowLeft className="w-5 h-5 text-royal-600" />
            </Link>
            <h1 className="font-display text-2xl font-bold text-royal-800">Payments</h1>
          </div>
          <button onClick={exportCSV} className="btn-outline text-sm flex items-center gap-2">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-4">
            <p className="text-sm text-gray-500">Total Payments</p>
            <p className="text-2xl font-bold text-royal-800">{payments.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4">
            <p className="text-sm text-gray-500">Completed Amount</p>
            <p className="text-2xl font-bold text-green-600">Rs. {totalAmount.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4">
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{payments.filter((p) => p.status === 'pending').length}</p>
          </div>
        </div>

        {payments.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <CreditCard className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>No payments yet</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Student</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Type</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Amount</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {payments.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-royal-800">{p.student_name}</td>
                      <td className="px-4 py-3 text-gray-600 capitalize">{p.payment_type.replace('_', ' ')}</td>
                      <td className="px-4 py-3 font-medium text-gray-800">Rs. {p.amount.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[p.status] || statusColors.pending}`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {new Date(p.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
