import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Users, Image, Bell, Calendar, CreditCard, BookOpen, MessageSquare, LogOut, LayoutDashboard } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ admissions: 0, bookings: 0, payments: 0, messages: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) navigate('/admin');
    });

    const fetchStats = async () => {
      const [admissions, bookings, payments, messages] = await Promise.all([
        supabase.from('admissions').select('id', { count: 'exact', head: true }),
        supabase.from('private_bookings').select('id', { count: 'exact', head: true }),
        supabase.from('payments').select('id', { count: 'exact', head: true }),
        supabase.from('contact_messages').select('id', { count: 'exact', head: true }),
      ]);
      setStats({
        admissions: admissions.count || 0,
        bookings: bookings.count || 0,
        payments: payments.count || 0,
        messages: messages.count || 0,
      });
    };
    fetchStats();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  const navItems = [
    { path: '/admin/admissions', label: 'Admissions', icon: Users, count: stats.admissions, color: 'royal' },
    { path: '/admin/gallery', label: 'Gallery', icon: Image, count: null, color: 'gold' },
    { path: '/admin/notices', label: 'Notices', icon: Bell, count: null, color: 'royal' },
    { path: '/admin/holidays', label: 'Holidays', icon: Calendar, count: null, color: 'gold' },
    { path: '/admin/bookings', label: 'Private Bookings', icon: BookOpen, count: stats.bookings, color: 'royal' },
    { path: '/admin/payments', label: 'Payments', icon: CreditCard, count: stats.payments, color: 'gold' },
    { path: '/admin/messages', label: 'Messages', icon: MessageSquare, count: stats.messages, color: 'royal' },
  ];

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-8 h-8 text-royal-600" />
            <div>
              <h1 className="font-display text-2xl font-bold text-royal-800">Admin Dashboard</h1>
              <p className="text-gray-500 text-sm">Manage your school</p>
            </div>
          </div>
          <button onClick={handleLogout} className="btn-outline text-sm flex items-center gap-2">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Admissions', value: stats.admissions, icon: Users, color: 'royal' },
            { label: 'Bookings', value: stats.bookings, icon: BookOpen, color: 'gold' },
            { label: 'Payments', value: stats.payments, icon: CreditCard, color: 'royal' },
            { label: 'Messages', value: stats.messages, icon: MessageSquare, color: 'gold' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md p-6">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                stat.color === 'royal' ? 'bg-royal-50' : 'bg-gold-50'
              }`}>
                <stat.icon className={`w-5 h-5 ${stat.color === 'royal' ? 'text-royal-600' : 'text-gold-600'}`} />
              </div>
              <p className="text-2xl font-bold text-royal-800">{stat.value}</p>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Management Links */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {navItems.map((item, i) => (
            <Link key={i} to={item.path} className="card p-6 group hover:-translate-y-1">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  item.color === 'royal' ? 'bg-royal-50' : 'bg-gold-50'
                } group-hover:scale-110 transition-transform`}>
                  <item.icon className={`w-5 h-5 ${item.color === 'royal' ? 'text-royal-600' : 'text-gold-600'}`} />
                </div>
                {item.count !== null && (
                  <span className="bg-royal-100 text-royal-700 text-xs font-semibold px-2 py-1 rounded-full">
                    {item.count}
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-royal-800">{item.label}</h3>
              <p className="text-gray-400 text-sm mt-1">Manage {item.label.toLowerCase()}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
