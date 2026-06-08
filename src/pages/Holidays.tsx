import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Calendar, Info } from 'lucide-react';

interface Holiday {
  id: string;
  date: string;
  name: string;
  description: string;
}

export default function Holidays() {
  const [holidays, setHolidays] = useState<Holiday[]>([]);

  useEffect(() => {
    supabase.from('holidays').select('*').order('date', { ascending: true }).then(({ data }) => {
      if (data) setHolidays(data);
    });
  }, []);

  const today = new Date();
  const upcomingHolidays = holidays.filter((h) => new Date(h.date) >= today);
  const pastHolidays = holidays.filter((h) => new Date(h.date) < today);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  const getDayDiff = (dateStr: string) => {
    const diff = Math.ceil((new Date(dateStr + 'T00:00:00').getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Tomorrow';
    return `In ${diff} days`;
  };

  return (
    <div className="pt-16 md:pt-20">
      <section className="bg-gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">Holiday List</h1>
          <p className="text-blue-100 text-xl">Stay updated with our holiday schedule</p>
        </div>
      </section>

      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-royal-50 rounded-xl p-6 mb-10 flex items-start gap-3">
          <Info className="w-5 h-5 text-royal-600 mt-0.5 flex-shrink-0" />
          <p className="text-royal-800 text-sm">
            Classes will remain closed on all listed holidays. Make-up classes will be arranged where possible. Please plan accordingly.
          </p>
        </div>

        {upcomingHolidays.length > 0 && (
          <div className="mb-10">
            <h2 className="font-display text-2xl font-bold text-royal-800 mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6" /> Upcoming Holidays
            </h2>
            <div className="space-y-4">
              {upcomingHolidays.map((holiday) => (
                <div key={holiday.id} className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4 hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-royal-600 rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-gold-300 text-xs font-medium">
                      {new Date(holiday.date + 'T00:00:00').toLocaleDateString('en-IN', { month: 'short' })}
                    </span>
                    <span className="text-white text-xl font-bold">
                      {new Date(holiday.date + 'T00:00:00').getDate()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-lg font-semibold text-royal-800">{holiday.name}</h3>
                    <p className="text-gray-500 text-sm">{formatDate(holiday.date)}</p>
                    {holiday.description && (
                      <p className="text-gray-400 text-sm mt-1">{holiday.description}</p>
                    )}
                  </div>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full flex-shrink-0">
                    {getDayDiff(holiday.date)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {pastHolidays.length > 0 && (
          <div>
            <h2 className="font-display text-2xl font-bold text-gray-400 mb-6">Past Holidays</h2>
            <div className="space-y-3">
              {pastHolidays.map((holiday) => (
                <div key={holiday.id} className="bg-gray-50 rounded-xl p-4 flex items-center gap-4 opacity-60">
                  <div className="w-12 h-12 bg-gray-300 rounded-lg flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-gray-600 text-[10px]">
                      {new Date(holiday.date + 'T00:00:00').toLocaleDateString('en-IN', { month: 'short' })}
                    </span>
                    <span className="text-gray-600 text-lg font-bold">
                      {new Date(holiday.date + 'T00:00:00').getDate()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-500">{holiday.name}</h3>
                    <p className="text-gray-400 text-sm">{formatDate(holiday.date)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {holidays.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No holidays listed yet</p>
          </div>
        )}
      </section>
    </div>
  );
}
