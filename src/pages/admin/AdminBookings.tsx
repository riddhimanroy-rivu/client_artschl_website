import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, Check, X, BookOpen } from 'lucide-react';

interface Booking {
  id: string;
  student_name: string;
  contact_number: string;
  email: string;
  preferred_date: string;
  preferred_time_slot: string;
  purpose: string;
  additional_notes: string;
  status: string;
  created_at: string;
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) navigate('/admin');
    });
    supabase.from('private_bookings').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      if (data) setBookings(data);
    });
  }, [navigate]);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('private_bookings').update({ status }).eq('id', id);
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  };

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    confirmed: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  };

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Link to="/admin/dashboard" className="w-10 h-10 rounded-lg bg-white shadow flex items-center justify-center hover:shadow-md">
            <ArrowLeft className="w-5 h-5 text-royal-600" />
          </Link>
          <h1 className="font-display text-2xl font-bold text-royal-800">Private Bookings</h1>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>No bookings yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => (
              <div key={b.id} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-royal-800">{b.student_name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[b.status] || statusColors.pending}`}>
                        {b.status}
                      </span>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-2 text-sm text-gray-600">
                      <p>Contact: {b.contact_number}</p>
                      <p>Email: {b.email || '-'}</p>
                      <p>Date: {b.preferred_date || '-'}</p>
                      <p>Time: {b.preferred_time_slot || '-'}</p>
                    </div>
                    {b.purpose && <p className="text-gray-500 text-sm mt-2"><strong>Purpose:</strong> {b.purpose}</p>}
                    {b.additional_notes && <p className="text-gray-400 text-sm mt-1"><strong>Notes:</strong> {b.additional_notes}</p>}
                  </div>
                  {b.status === 'pending' && (
                    <div className="flex items-center gap-1">
                      <button onClick={() => updateStatus(b.id, 'confirmed')} className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100">
                        <Check className="w-4 h-4" />
                      </button>
                      <button onClick={() => updateStatus(b.id, 'cancelled')} className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
