import { Link } from 'react-router-dom';
import { ExternalLink, CreditCard } from 'lucide-react';

export default function Admission() {
  return (
    <div className="pt-16 md:pt-20">
      <section className="bg-gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">Admission</h1>
          <p className="text-blue-100 text-xl">Join ART-LINE Fine Arts School</p>
        </div>
      </section>

      <section className="py-20 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-royal-800 mb-3">
            Choose an Option
          </h2>
          <p className="text-gray-500 mb-10">
            Fill in the admission form or proceed to pay the admission fees.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <a
              href="https://forms.gle/e9hRt4CQdnvNq1nb7"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-royal-700 hover:bg-royal-800 text-white font-semibold px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 text-lg"
            >
              <ExternalLink className="w-5 h-5" />
              Admission Form
            </a>

            <Link
              to="/payment"
              className="flex items-center justify-center gap-3 border-2 border-royal-700 text-royal-700 hover:bg-royal-700 hover:text-white font-semibold px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 text-lg"
            >
              <CreditCard className="w-5 h-5" />
              Admission Fees
            </Link>
          </div>

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
