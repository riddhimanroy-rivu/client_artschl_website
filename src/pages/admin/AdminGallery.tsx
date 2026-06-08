import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, Plus, Trash2, Image } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image_url: string;
  description: string;
}

const categories = ['Annual Exhibition (Saraswati Puja)', 'Drawing Competition', 'Award Ceremony', 'Workshop', 'Student Artwork', 'Special Events'];

export default function AdminGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', category: 'Student Artwork', image_url: '', description: '' });
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) navigate('/admin');
    });
    fetchItems();
  }, [navigate]);

  const fetchItems = async () => {
    const { data } = await supabase.from('gallery_items').select('*').order('created_at', { ascending: false });
    if (data) setItems(data);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.image_url) return;
    await supabase.from('gallery_items').insert([form]);
    setForm({ title: '', category: 'Student Artwork', image_url: '', description: '' });
    setShowForm(false);
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    await supabase.from('gallery_items').delete().eq('id', id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link to="/admin/dashboard" className="w-10 h-10 rounded-lg bg-white shadow flex items-center justify-center hover:shadow-md">
              <ArrowLeft className="w-5 h-5 text-royal-600" />
            </Link>
            <h1 className="font-display text-2xl font-bold text-royal-800">Gallery Management</h1>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="btn-primary text-sm flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Image
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleAdd} className="bg-white rounded-xl shadow-md p-6 mb-8 space-y-4">
            <h2 className="font-semibold text-royal-800">Add Gallery Item</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label-field">Title *</label>
                <input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} className="input-field" required />
              </div>
              <div>
                <label className="label-field">Category</label>
                <select value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} className="input-field">
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="label-field">Image URL *</label>
                <input value={form.image_url} onChange={(e) => setForm((p) => ({ ...p, image_url: e.target.value }))} className="input-field" placeholder="https://..." required />
              </div>
              <div className="sm:col-span-2">
                <label className="label-field">Description</label>
                <input value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} className="input-field" />
              </div>
            </div>
            <div className="flex gap-3">
              <button type="submit" className="btn-primary text-sm">Save</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-outline text-sm">Cancel</button>
            </div>
          </form>
        )}

        {items.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <Image className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>No gallery items yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden group">
                <div className="aspect-square relative">
                  <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-royal-800 text-sm truncate">{item.title}</h3>
                  <p className="text-gray-400 text-xs">{item.category}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
