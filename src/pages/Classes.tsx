import { Link } from 'react-router-dom';
import { Clock, Calendar, Check, Info, ArrowRight } from 'lucide-react';

const saturdaySlots = [
  { time: '9:00 AM – 10:00 AM', available: true },
  { time: '10:00 AM – 11:00 AM', available: true },
  { time: '10:30 AM – 11:30 AM', available: true },
];

const sundayMorningSlots = [
  { time: '8:00 AM – 9:00 AM', available: true },
  { time: '9:00 AM – 10:00 AM', available: true },
  { time: '10:00 AM – 11:00 AM', available: true },
  { time: '11:00 AM – 12:00 PM', available: true },
  { time: '12:00 PM – 1:00 PM', available: true },
];

const sundayEveningSlots = [
  { time: '4:00 PM – 5:00 PM', available: true },
  { time: '5:00 PM – 6:00 PM', available: true },
];

export default function Classes() {
  return (
    <div className="pt-16 md:pt-20">
      <section className="bg-gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">Classes & Timings</h1>
          <p className="text-blue-100 text-xl max-w-2xl mx-auto">Choose a convenient time slot for your art classes</p>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-royal-50 rounded-xl p-6 mb-12 flex items-start gap-3">
          <Info className="w-5 h-5 text-royal-600 mt-0.5 flex-shrink-0" />
          <p className="text-royal-800 text-sm">
            <strong>Important:</strong> Admission students can select <strong>ANY ONE</strong> preferred 1-hour session from the available timings below. Each student attends one session per week on their chosen day and time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Saturday */}
          <div className="card overflow-hidden">
            <div className="bg-gradient-royal p-6 text-center">
              <Calendar className="w-8 h-8 text-gold-400 mx-auto mb-2" />
              <h2 className="font-display text-2xl font-bold text-white">Saturday</h2>
              <p className="text-blue-200 mt-1">9:00 AM – 11:30 AM</p>
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-royal-800 mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4" /> Available Sessions
              </h3>
              <div className="space-y-3">
                {saturdaySlots.map((slot, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">{slot.time}</span>
                    <span className={`flex items-center gap-1 text-sm font-medium ${
                      slot.available ? 'text-green-600' : 'text-red-500'
                    }`}>
                      <Check className="w-4 h-4" />
                      {slot.available ? 'Available' : 'Full'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sunday */}
          <div className="card overflow-hidden">
            <div className="bg-gradient-royal p-6 text-center">
              <Calendar className="w-8 h-8 text-gold-400 mx-auto mb-2" />
              <h2 className="font-display text-2xl font-bold text-white">Sunday</h2>
              <div className="text-blue-200 mt-1 space-y-1">
                <p>8:00 AM – 1:00 PM</p>
                <p>4:00 PM – 6:00 PM</p>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-royal-800 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4" /> Morning Sessions
              </h3>
              <div className="space-y-2 mb-6">
                {sundayMorningSlots.map((slot, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">{slot.time}</span>
                    <span className="flex items-center gap-1 text-sm font-medium text-green-600">
                      <Check className="w-4 h-4" /> Available
                    </span>
                  </div>
                ))}
              </div>
              <h3 className="font-semibold text-royal-800 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4" /> Evening Sessions
              </h3>
              <div className="space-y-2">
                {sundayEveningSlots.map((slot, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">{slot.time}</span>
                    <span className="flex items-center gap-1 text-sm font-medium text-green-600">
                      <Check className="w-4 h-4" /> Available
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* How it Works */}
        <div className="mt-16">
          <h2 className="section-title text-center mb-8">How It Works</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { step: '1', title: 'Choose Your Day', desc: 'Select either Saturday or Sunday for your weekly class' },
              { step: '2', title: 'Pick Your Slot', desc: 'Choose one 1-hour session from the available timings' },
              { step: '3', title: 'Start Creating', desc: 'Attend your weekly session and develop your artistic skills' },
            ].map((item, i) => (
              <div key={i} className="text-center card p-6">
                <div className="w-12 h-12 rounded-full bg-royal-600 text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="font-display text-lg font-semibold text-royal-800 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Private Classes */}
        <div className="mt-16 bg-gradient-royal rounded-xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gold-400 rounded-full blur-[60px]" />
          </div>
          <div className="relative">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
              Need More Flexible Timing?
            </h2>
            <p className="text-blue-100 mb-6 max-w-lg mx-auto">
              Book a private one-on-one class at a time that works for you. Get personalized attention and focused learning.
            </p>
            <Link to="/private-booking" className="btn-gold inline-flex items-center gap-2">
              Book Private Class <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
