import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Lock, Palette, AlertCircle } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError('Invalid email or password');
      setLoading(false);
      return;
    }

    const { data: adminRow } = await supabase.from('admin_users').select('id').maybeSingle();
    if (!adminRow) {
      await supabase.auth.signOut();
      setError('Access denied. This account does not have admin privileges.');
      setLoading(false);
      return;
    }

    navigate('/admin/dashboard');
    setLoading(false);
  };

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-royal rounded-xl flex items-center justify-center mx-auto mb-4">
            <Palette className="w-8 h-8 text-gold-400" />
          </div>
          <h1 className="font-display text-3xl font-bold text-royal-800">Admin Portal</h1>
          <p className="text-gray-500 mt-2">ART-LINE Management System</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="label-field">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" required />
            </div>
            <div>
              <label className="label-field">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" required />
            </div>
            <button type="submit" disabled={loading} className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50">
              {loading ? 'Signing in...' : <><Lock className="w-4 h-4" /> Sign In</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
