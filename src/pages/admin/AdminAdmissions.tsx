import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, Check, X, Download } from 'lucide-react';

interface Admission {
  id: string;
  student_name: string;
  mobile_number: string;
  email: string;
  preferred_day: string;
  preferred_timing: string;
  status: string;
  created_at: string;
}

export default function AdminAdmissions() {
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) navigate('/admin');
    });
    fetchAdmissions();
  }, [navigate]);

  const fetchAdmissions = async () => {
    const { data } = await supabase.from('admissions').select('*').order('created_at', { ascending: false });
    if (data) setAdmissions(data);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('admissions').update({ status }).eq('id', id);
    setAdmissions((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  const exportCSV = () => {
    const headers = ['Name', 'Mobile', 'Email', 'Preferred Day', 'Preferred Timing', 'Status', 'Date'];
    const rows = admissions.map((a) => [a.student_name, a.mobile_number, a.email, a.preferred_day, a.preferred_timing, a.status, a.created_at]);
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'admissions.csv';
    a.click();
  };

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    approved: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
  };

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link to="/admin/dashboard" className="w-10 h-10 rounded-lg bg-white shadow flex items-center justify-center hover:shadow-md transition-shadow">
              <ArrowLeft className="w-5 h-5 text-royal-600" />
            </Link>
            <h1 className="font-display text-2xl font-bold text-royal-800">Admissions</h1>
          </div>
          <button onClick={exportCSV} className="btn-outline text-sm flex items-center gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading...</div>
        ) : admissions.length === 0 ? (
          <div className="text-center py-12 text-gray-400">No admissions yet</div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Student</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Contact</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Day/Time</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {admissions.map((a) => (
                    <tr key={a.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-royal-800">{a.student_name}</td>
                      <td className="px-4 py-3 text-gray-600">
                        <div>{a.mobile_number}</div>
                        <div className="text-xs text-gray-400">{a.email}</div>
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        <div>{a.preferred_day || '-'}</div>
                        <div className="text-xs text-gray-400">{a.preferred_timing || '-'}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[a.status] || statusColors.pending}`}>
                          {a.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {a.status === 'pending' && (
                            <>
                              <button onClick={() => updateStatus(a.id, 'approved')} className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100">
                                <Check className="w-4 h-4" />
                              </button>
                              <button onClick={() => updateStatus(a.id, 'rejected')} className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100">
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
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
