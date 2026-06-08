import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, Plus, Trash2, Pin, PinOff, Edit2, Check, X } from 'lucide-react';

interface Notice {
  id: string;
  title: string;
  content: string;
  is_pinned: boolean;
  created_at: string;
}

export default function AdminNotices() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: '', content: '', is_pinned: false });
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) navigate('/admin');
    });
    fetchNotices();
  }, [navigate]);

  const fetchNotices = async () => {
    const { data } = await supabase.from('notices').select('*').order('is_pinned', { ascending: false }).order('created_at', { ascending: false });
    if (data) setNotices(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.content) return;
    if (editingId) {
      await supabase.from('notices').update(form).eq('id', editingId);
      setEditingId(null);
    } else {
      await supabase.from('notices').insert([form]);
    }
    setForm({ title: '', content: '', is_pinned: false });
    setShowForm(false);
    fetchNotices();
  };

  const handleEdit = (notice: Notice) => {
    setForm({ title: notice.title, content: notice.content, is_pinned: notice.is_pinned });
    setEditingId(notice.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    await supabase.from('notices').delete().eq('id', id);
    setNotices((prev) => prev.filter((n) => n.id !== id));
  };

  const togglePin = async (id: string, isPinned: boolean) => {
    await supabase.from('notices').update({ is_pinned: !isPinned }).eq('id', id);
    fetchNotices();
  };

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link to="/admin/dashboard" className="w-10 h-10 rounded-lg bg-white shadow flex items-center justify-center hover:shadow-md">
              <ArrowLeft className="w-5 h-5 text-royal-600" />
            </Link>
            <h1 className="font-display text-2xl font-bold text-royal-800">Notice Management</h1>
          </div>
          <button onClick={() => { setShowForm(!showForm); setEditingId(null); setForm({ title: '', content: '', is_pinned: false }); }} className="btn-primary text-sm flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Notice
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 mb-8 space-y-4">
            <h2 className="font-semibold text-royal-800">{editingId ? 'Edit Notice' : 'Add Notice'}</h2>
            <div>
              <label className="label-field">Title *</label>
              <input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} className="input-field" required />
            </div>
            <div>
              <label className="label-field">Content *</label>
              <textarea value={form.content} onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))} className="input-field" rows={4} required />
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.is_pinned} onChange={(e) => setForm((p) => ({ ...p, is_pinned: e.target.checked }))} className="rounded border-gray-300 text-royal-600" />
              <span className="text-sm text-gray-700">Pin this notice</span>
            </label>
            <div className="flex gap-3">
              <button type="submit" className="btn-primary text-sm flex items-center gap-2"><Check className="w-4 h-4" /> Save</button>
              <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }} className="btn-outline text-sm flex items-center gap-2"><X className="w-4 h-4" /> Cancel</button>
            </div>
          </form>
        )}

        <div className="space-y-4">
          {notices.map((notice) => (
            <div key={notice.id} className={`bg-white rounded-xl shadow-md p-6 ${notice.is_pinned ? 'border-l-4 border-gold-500' : ''}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {notice.is_pinned && <Pin className="w-4 h-4 text-gold-500" />}
                    <h3 className="font-semibold text-royal-800">{notice.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{notice.content}</p>
                  <p className="text-gray-400 text-xs mt-2">
                    {new Date(notice.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => togglePin(notice.id, notice.is_pinned)} className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center hover:bg-gray-100" title={notice.is_pinned ? 'Unpin' : 'Pin'}>
                    {notice.is_pinned ? <PinOff className="w-4 h-4 text-gray-500" /> : <Pin className="w-4 h-4 text-gray-500" />}
                  </button>
                  <button onClick={() => handleEdit(notice)} className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center hover:bg-gray-100">
                    <Edit2 className="w-4 h-4 text-gray-500" />
                  </button>
                  <button onClick={() => handleDelete(notice.id)} className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center hover:bg-red-100">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
