import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Bell, Pin, Clock } from 'lucide-react';

interface Notice {
  id: string;
  title: string;
  content: string;
  is_pinned: boolean;
  created_at: string;
}

export default function Notices() {
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    supabase.from('notices').select('*').order('is_pinned', { ascending: false }).order('created_at', { ascending: false }).then(({ data }) => {
      if (data) setNotices(data);
    });
  }, []);

  const pinned = notices.filter((n) => n.is_pinned);
  const regular = notices.filter((n) => !n.is_pinned);

  return (
    <div className="pt-16 md:pt-20">
      <section className="bg-gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">Notice Board</h1>
          <p className="text-blue-100 text-xl">Stay updated with the latest announcements</p>
        </div>
      </section>

      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {pinned.length > 0 && (
          <div className="mb-10">
            <h2 className="font-display text-xl font-bold text-royal-800 mb-4 flex items-center gap-2">
              <Pin className="w-5 h-5 text-gold-500" /> Important Notices
            </h2>
            <div className="space-y-4">
              {pinned.map((notice) => (
                <div key={notice.id} className="bg-gold-50 border-l-4 border-gold-500 rounded-r-xl p-6 shadow-md">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Pin className="w-4 h-4 text-gold-600" />
                        <h3 className="font-display text-lg font-semibold text-royal-800">{notice.title}</h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{notice.content}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-3 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    {new Date(notice.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {regular.length > 0 && (
          <div>
            <h2 className="font-display text-xl font-bold text-royal-800 mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5" /> Recent Notices
            </h2>
            <div className="space-y-4">
              {regular.map((notice) => (
                <div key={notice.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h3 className="font-display text-lg font-semibold text-royal-800 mb-2">{notice.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{notice.content}</p>
                  <div className="flex items-center gap-1 mt-3 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    {new Date(notice.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {notices.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <Bell className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No notices yet</p>
          </div>
        )}
      </section>
    </div>
  );
}
