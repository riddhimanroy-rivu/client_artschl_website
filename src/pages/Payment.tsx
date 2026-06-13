import { Phone, Info } from 'lucide-react';

export default function Payment() {
  return (
    <div className="pt-16 md:pt-20">
      <section className="bg-gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">Payment</h1>
          <p className="text-blue-100 text-xl">Fees & Payment Details</p>
        </div>
      </section>

      <section className="py-24 max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-2xl shadow-lg p-10 md:p-14">
          <div className="w-20 h-20 bg-royal-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Info className="w-10 h-10 text-royal-600" />
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-royal-800 mb-4">
            Contact School for Fees
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            For admission fees or monthly fees, please contact the school directly for more details.
          </p>

          <a
            href="tel:+919831090796"
            className="inline-flex items-center gap-3 bg-royal-700 hover:bg-royal-800 text-white font-semibold px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 text-lg"
          >
            <Phone className="w-5 h-5" />
            Call +91 9831090796
          </a>
        </div>
      </section>
    </div>
  );
}
