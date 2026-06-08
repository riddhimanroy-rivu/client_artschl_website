import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Users, Clock, Star, ChevronLeft, ChevronRight, BookOpen, Phone } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Testimonial {
  id: string;
  student_name: string;
  content: string;
  rating: number;
}

interface Notice {
  id: string;
  title: string;
  content: string;
  is_pinned: boolean;
  created_at: string;
}

export default function Home() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    supabase.from('testimonials').select('*').eq('is_approved', true).then(({ data }) => {
      if (data) setTestimonials(data);
    });
    supabase.from('notices').select('*').order('is_pinned', { ascending: false }).order('created_at', { ascending: false }).limit(3).then(({ data }) => {
      if (data) setNotices(data);
    });
  }, []);

  const artworkImages = [
    'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1194255/pexels-photo-1194255.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/102127/pexels-photo-102127.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/2859169/pexels-photo-2859169.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1389360/pexels-photo-1389360.jpeg?auto=compress&cs=tinysrgb&w=600',
  ];

  return (
    <div className="pt-16 md:pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gold-400 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-royal-400 rounded-full blur-[150px]" />
        </div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-fade-in">
              <Star className="w-4 h-4 text-gold-400" />
              <span className="text-gold-300 text-sm font-medium">Kolkata's Premier Art School</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 animate-slide-up leading-tight">
              ARTLINE
              <span className="block text-gold-400 text-3xl md:text-4xl mt-2">Fine Arts & Drawing School</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 animate-slide-up font-light" style={{ animationDelay: '0.2s' }}>
              Nurturing Creativity Through Art
            </p>
            <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Link to="/admission" className="btn-gold flex items-center gap-2 text-lg">
                Apply for Admission <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="https://wa.me/919051349496?text=Hello%20Sir%2C%20I%20would%20like%20to%20inquire%20about%20ARTLINE%20classes."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Phone className="w-5 h-5" /> Contact Teacher
              </a>
              <Link to="/classes" className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm border border-white/20">
                View Classes
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-16 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Users, label: 'Students Trained', value: '500+' },
            { icon: Award, label: 'Awards Won', value: '50+' },
            { icon: BookOpen, label: 'Years of Teaching', value: '10+' },
            { icon: Star, label: 'Student Rating', value: '4.9/5' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <stat.icon className="w-8 h-8 text-royal-600 mx-auto mb-2" />
              <p className="text-2xl md:text-3xl font-bold text-royal-800">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="section-title mb-6">Welcome to ARTLINE</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              At ARTLINE, we believe every person has an artist within. Our mission is to unlock that creative potential through structured, inspiring, and enjoyable art education. Under the guidance of our founder Amit Roy, we have helped hundreds of students discover their artistic voice.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Whether you are a complete beginner or an experienced artist looking to refine your skills, ARTLINE provides the perfect environment for artistic growth. Our small class sizes ensure personalized attention, and our comprehensive curriculum covers everything from basic sketching to advanced painting techniques.
            </p>
            <Link to="/about" className="btn-primary inline-flex items-center gap-2">
              Learn More About Us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {artworkImages.slice(0, 4).map((img, i) => (
              <div
                key={i}
                className={`rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow ${
                  i % 3 === 0 ? 'row-span-2' : ''
                }`}
              >
                <img src={img} alt="Student artwork" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">Explore ARTLINE</h2>
            <p className="section-subtitle mx-auto">Everything you need to start your artistic journey</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Admission Open', desc: 'Apply now for the new session', path: '/admission', icon: BookOpen, color: 'royal' },
              { title: 'Class Schedule', desc: 'View available time slots', path: '/classes', icon: Clock, color: 'gold' },
              { title: 'Private Classes', desc: 'Book one-on-one sessions', path: '/private-booking', icon: Users, color: 'royal' },
              { title: 'Make Payment', desc: 'Pay fees securely online', path: '/payment', icon: Award, color: 'gold' },
            ].map((card, i) => (
              <Link key={i} to={card.path} className="card p-6 group hover:-translate-y-1">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                  card.color === 'royal' ? 'bg-royal-50 text-royal-600' : 'bg-gold-50 text-gold-600'
                } group-hover:scale-110 transition-transform`}>
                  <card.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-lg font-semibold text-royal-800 mb-2">{card.title}</h3>
                <p className="text-gray-500 text-sm">{card.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Student Artwork Showcase */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">Student Artwork Showcase</h2>
          <p className="section-subtitle mx-auto">Beautiful creations by our talented students</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {artworkImages.map((img, i) => (
            <div key={i} className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all">
              <img src={img} alt={`Artwork ${i + 1}`} className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-royal-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <span className="text-white text-sm font-medium">Student Artwork</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-gradient-royal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Upcoming Events</h2>
            <p className="text-blue-200 text-lg">Join our exciting art events and workshops</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Annual Exhibition on Saraswati Puja', date: 'Saraswati Puja', desc: 'Our annual art exhibition is held every year on Saraswati Puja — showcase your best artwork' },
              { title: 'Drawing Competition', date: 'April 2026', desc: 'Compete with fellow artists and win exciting prizes' },
              { title: 'Summer Workshop', date: 'May 2026', desc: 'Intensive art workshop covering multiple mediums' },
            ].map((event, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/15 transition-all">
                <div className="text-gold-400 font-semibold text-sm mb-2">{event.date}</div>
                <h3 className="font-display text-xl font-semibold text-white mb-2">{event.title}</h3>
                <p className="text-blue-200 text-sm">{event.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Notices */}
      {notices.length > 0 && (
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="section-title">Latest Notices</h2>
            <Link to="/notices" className="btn-outline text-sm">View All</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {notices.map((notice) => (
              <div key={notice.id} className="card p-6">
                {notice.is_pinned && (
                  <span className="inline-block bg-gold-100 text-gold-700 text-xs font-semibold px-2 py-1 rounded mb-3">Pinned</span>
                )}
                <h3 className="font-display text-lg font-semibold text-royal-800 mb-2">{notice.title}</h3>
                <p className="text-gray-500 text-sm line-clamp-3">{notice.content}</p>
                <p className="text-gray-400 text-xs mt-3">
                  {new Date(notice.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="section-title mb-4">What Our Students Say</h2>
            </div>
            <div className="max-w-3xl mx-auto text-center">
              <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial]?.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gold-500 fill-gold-500" />
                  ))}
                </div>
                <p className="text-gray-600 text-lg italic leading-relaxed mb-6">
                  "{testimonials[currentTestimonial]?.content}"
                </p>
                <p className="font-display text-lg font-semibold text-royal-800">
                  — {testimonials[currentTestimonial]?.student_name}
                </p>
              </div>
              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                  className="w-10 h-10 rounded-full bg-white shadow hover:shadow-md flex items-center justify-center transition-shadow"
                >
                  <ChevronLeft className="w-5 h-5 text-royal-600" />
                </button>
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentTestimonial(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        i === currentTestimonial ? 'bg-royal-600 w-6' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                  className="w-10 h-10 rounded-full bg-white shadow hover:shadow-md flex items-center justify-center transition-shadow"
                >
                  <ChevronRight className="w-5 h-5 text-royal-600" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-royal rounded-2xl p-8 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-400 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-royal-300 rounded-full blur-[60px]" />
          </div>
          <div className="relative">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
              Start Your Artistic Journey Today
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
              Join ARTLINE and discover the artist within you. New batch starting soon!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/admission" className="btn-gold text-lg">Apply for Admission</Link>
              <Link to="/contact" className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-semibold transition-all border border-white/20">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
