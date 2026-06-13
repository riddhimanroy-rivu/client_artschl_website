import { ExternalLink, Clock, User, Zap } from 'lucide-react';

export default function PrivateBooking() {
  return (
    <div className="pt-16 md:pt-20">
      <section className="bg-gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">Private Class</h1>
          <p className="text-blue-100 text-xl">One-on-one sessions with personalized attention</p>
        </div>
      </section>

      <section className="py-20 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {[
            { icon: Clock, title: 'Flexible Timing', desc: 'Choose your preferred date and time' },
            { icon: User, title: 'Personal Attention', desc: 'One-on-one guidance from Amit Sir' },
            { icon: Zap, title: 'Focused Learning', desc: 'Tailored curriculum for your goals' },
          ].map((item, i) => (
            <div key={i} className="bg-royal-50 rounded-xl p-4 text-center">
              <item.icon className="w-6 h-6 text-royal-600 mx-auto mb-2" />
              <h3 className="font-semibold text-royal-800 text-sm">{item.title}</h3>
              <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-royal-800 mb-3">
            Book a Private Class
          </h2>
          <p className="text-gray-500 mb-10">
            Fill out the form to request a private session with Amit Sir.
          </p>

          <a
            href="https://forms.gle/o54wpS97e5v4QF3v5"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-royal-700 hover:bg-royal-800 text-white font-semibold px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 text-lg"
          >
            <ExternalLink className="w-5 h-5" />
            Private Class Form
          </a>

          <p className="mt-10 text-sm text-gray-400">
            For any queries, contact us at{' '}
            <a href="tel:+919831090796" className="text-royal-600 hover:underline">
              +91 9831090796
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
