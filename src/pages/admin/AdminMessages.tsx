import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, MessageSquare, Eye, Trash2 } from 'lucide-react';

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) navigate('/admin');
    });
    fetchMessages();
  }, [navigate]);

  const fetchMessages = async () => {
    const { data } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
    if (data) setMessages(data);
  };

  const markRead = async (id: string, isRead: boolean) => {
    await supabase.from('contact_messages').update({ is_read: !isRead }).eq('id', id);
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, is_read: !isRead } : m)));
  };

  const handleDelete = async (id: string) => {
    await supabase.from('contact_messages').delete().eq('id', id);
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Link to="/admin/dashboard" className="w-10 h-10 rounded-lg bg-white shadow flex items-center justify-center hover:shadow-md">
            <ArrowLeft className="w-5 h-5 text-royal-600" />
          </Link>
          <h1 className="font-display text-2xl font-bold text-royal-800">Contact Messages</h1>
        </div>

        {messages.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>No messages yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((m) => (
              <div key={m.id} className={`bg-white rounded-xl shadow-md p-6 ${!m.is_read ? 'border-l-4 border-royal-600' : ''}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-royal-800">{m.name}</h3>
                      {!m.is_read && <span className="w-2 h-2 rounded-full bg-royal-600" />}
                    </div>
                    <p className="text-gray-500 text-sm">{m.email} {m.phone && `| ${m.phone}`}</p>
                    {m.subject && <p className="text-royal-600 font-medium text-sm mt-2">{m.subject}</p>}
                    <p className="text-gray-600 text-sm mt-2">{m.message}</p>
                    <p className="text-gray-400 text-xs mt-2">
                      {new Date(m.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => markRead(m.id, m.is_read)} className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center hover:bg-gray-100" title={m.is_read ? 'Mark unread' : 'Mark read'}>
                      <Eye className="w-4 h-4 text-gray-500" />
                    </button>
                    <button onClick={() => handleDelete(m.id)} className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center hover:bg-red-100">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
