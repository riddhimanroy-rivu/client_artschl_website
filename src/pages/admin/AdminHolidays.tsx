import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, Plus, Trash2, Edit2, Check, X, Calendar } from 'lucide-react';

interface Holiday {
  id: string;
  date: string;
  name: string;
  description: string;
}

export default function AdminHolidays() {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ date: '', name: '', description: '' });
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) navigate('/admin');
    });
    fetchHolidays();
  }, [navigate]);

  const fetchHolidays = async () => {
    const { data } = await supabase.from('holidays').select('*').order('date', { ascending: true });
    if (data) setHolidays(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.date || !form.name) return;
    if (editingId) {
      await supabase.from('holidays').update(form).eq('id', editingId);
      setEditingId(null);
    } else {
      await supabase.from('holidays').insert([form]);
    }
    setForm({ date: '', name: '', description: '' });
    setShowForm(false);
    fetchHolidays();
  };

  const handleEdit = (holiday: Holiday) => {
    setForm({ date: holiday.date, name: holiday.name, description: holiday.description || '' });
    setEditingId(holiday.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    await supabase.from('holidays').delete().eq('id', id);
    setHolidays((prev) => prev.filter((h) => h.id !== id));
  };

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link to="/admin/dashboard" className="w-10 h-10 rounded-lg bg-white shadow flex items-center justify-center hover:shadow-md">
              <ArrowLeft className="w-5 h-5 text-royal-600" />
            </Link>
            <h1 className="font-display text-2xl font-bold text-royal-800">Holiday Management</h1>
          </div>
          <button onClick={() => { setShowForm(!showForm); setEditingId(null); setForm({ date: '', name: '', description: '' }); }} className="btn-primary text-sm flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Holiday
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 mb-8 space-y-4">
            <h2 className="font-semibold text-royal-800">{editingId ? 'Edit Holiday' : 'Add Holiday'}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label-field">Date *</label>
                <input type="date" value={form.date} onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))} className="input-field" required />
              </div>
              <div>
                <label className="label-field">Holiday Name *</label>
                <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} className="input-field" required />
              </div>
              <div className="sm:col-span-2">
                <label className="label-field">Description</label>
                <input value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} className="input-field" />
              </div>
            </div>
            <div className="flex gap-3">
              <button type="submit" className="btn-primary text-sm flex items-center gap-2"><Check className="w-4 h-4" /> Save</button>
              <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }} className="btn-outline text-sm flex items-center gap-2"><X className="w-4 h-4" /> Cancel</button>
            </div>
          </form>
        )}

        {holidays.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>No holidays yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {holidays.map((holiday) => (
              <div key={holiday.id} className="bg-white rounded-xl shadow-md p-4 flex items-center gap-4">
                <div className="w-14 h-14 bg-royal-600 rounded-lg flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-gold-300 text-[10px]">{new Date(holiday.date + 'T00:00:00').toLocaleDateString('en-IN', { month: 'short' })}</span>
                  <span className="text-white text-lg font-bold">{new Date(holiday.date + 'T00:00:00').getDate()}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-royal-800">{holiday.name}</h3>
                  <p className="text-gray-500 text-sm">{new Date(holiday.date + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric' })}</p>
                  {holiday.description && <p className="text-gray-400 text-xs mt-1">{holiday.description}</p>}
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => handleEdit(holiday)} className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center hover:bg-gray-100">
                    <Edit2 className="w-4 h-4 text-gray-500" />
                  </button>
                  <button onClick={() => handleDelete(holiday.id)} className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center hover:bg-red-100">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
