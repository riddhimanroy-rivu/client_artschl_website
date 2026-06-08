import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Admission from './pages/Admission';
import Classes from './pages/Classes';
import PrivateBooking from './pages/PrivateBooking';
import Gallery from './pages/Gallery';
import Holidays from './pages/Holidays';
import Notices from './pages/Notices';
import Payment from './pages/Payment';
import Contact from './pages/Contact';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminAdmissions from './pages/admin/AdminAdmissions';
import AdminGallery from './pages/admin/AdminGallery';
import AdminNotices from './pages/admin/AdminNotices';
import AdminHolidays from './pages/admin/AdminHolidays';
import AdminBookings from './pages/admin/AdminBookings';
import AdminPayments from './pages/admin/AdminPayments';
import AdminMessages from './pages/admin/AdminMessages';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/admission" element={<Admission />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/private-booking" element={<PrivateBooking />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/holidays" element={<Holidays />} />
        <Route path="/notices" element={<Notices />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/admissions" element={<AdminAdmissions />} />
        <Route path="/admin/gallery" element={<AdminGallery />} />
        <Route path="/admin/notices" element={<AdminNotices />} />
        <Route path="/admin/holidays" element={<AdminHolidays />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />
        <Route path="/admin/payments" element={<AdminPayments />} />
        <Route path="/admin/messages" element={<AdminMessages />} />
      </Routes>
      <WhatsAppButton />
    </Layout>
  );
}
