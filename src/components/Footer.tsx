import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-royal-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/assets/artline-logo.jpg"
                alt="ART-LINE Logo"
                className="w-10 h-10 object-contain"
              />
              <span className="font-display text-2xl font-bold">ART-LINE</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Nurturing Creativity Through Art. Professional fine arts and drawing education in Kolkata since 2015.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-royal-600 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-royal-600 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-royal-600 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gold-400 mb-4">Quick Links</h3>
            <div className="space-y-2">
              {[
                { path: '/about', label: 'About Us' },
                { path: '/classes', label: 'Classes & Timings' },
                { path: '/admission', label: 'Admission' },
                { path: '/gallery', label: 'Gallery' },
                { path: '/notices', label: 'Notice Board' },
                { path: '/payment', label: 'Online Payment' },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block text-gray-300 hover:text-white text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gold-400 mb-4">Class Schedule</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p><span className="text-white font-medium">Saturday:</span> 9:00 AM – 11:30 AM</p>
              <p><span className="text-white font-medium">Sunday:</span> 8:00 AM – 1:00 PM</p>
              <p><span className="text-white font-medium">Sunday:</span> 4:00 PM – 6:00 PM</p>
              <p className="mt-3 text-gold-300">Private classes available on request</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gold-400 mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gold-400" />
                <span>P16/A, 2 No. Bacharpara Road, Thakurpukur, Kolkata – 700063</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0 text-gold-400" />
                <span>+91 9831090796</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0 text-gold-400" />
                <span>amitroynu@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} ART-LINE Fine Arts & Drawing School. All rights reserved.
          </p>
          <Link to="/admin" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
            Admin Portal
          </Link>
        </div>
      </div>
    </footer>
  );
}
