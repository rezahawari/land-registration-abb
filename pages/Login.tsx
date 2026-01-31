import React, { useState } from 'react';
import { 
  Header, 
  Hero, 
  Features, 
  Services, 
  CTASection, 
  Footer,
  ProgressBar 
} from '../components/LandingPage';
import { Link } from 'react-router-dom';
import { saveToken, saveUser } from '../utils/auth';

interface LoginProps {
  onBackToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onBackToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      // Validasi input
      if (!email || !password) {
        setError('Email dan password harus diisi');
        setIsLoading(false);
        return;
      }

      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3002/api';

      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.status) {
        setError(data.message || 'Login gagal. Silakan coba lagi.');
        setIsLoading(false);
        return;
      }

      // Jika login berhasil
      setSuccess('Login berhasil! Mengalihkan...');
      
      // Simpan token menggunakan fungsi auth utility
      saveToken({
        token: data.data.token,
        refreshToken: data.data.refreshToken,
        expiresIn: data.data.expiresIn,
      });
      
      // Simpan user data
      if (data.data.user) {
        saveUser(data.data.user);
      }

      // Redirect ke halaman awal setelah 1 detik
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="flex flex-col items-center justify-center w-full max-w-[480px] mx-auto py-12">
          <div className="bg-white dark:bg-gray-900 w-full rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-8 md:p-10">
        <div className="text-center mb-10">
          <div className="h-16 w-auto flex justify-center mb-6">
            <img 
              src="https://raw.githubusercontent.com/username/repo/main/logo.jpg" 
              alt="Amanah Bangkit Bersama Logo"
              className="h-full w-auto object-contain"
              onError={(e) => {
                e.currentTarget.src = "https://img.freepik.com/free-vector/shield-with-house-logo-template_23-2148651034.jpg";
              }}
            />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#111418] dark:text-white">Selamat Datang</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Silakan masuk ke akun Anda</p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-700 dark:text-red-400 text-sm font-semibold">{error}</p>
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <p className="text-green-700 dark:text-green-400 text-sm font-semibold">{success}</p>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email atau Nomor HP</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">person</span>
              <input 
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="w-full pl-11 pr-4 py-3 rounded-xl border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec] transition-all outline-none disabled:opacity-50"
                placeholder="Masukkan email atau No. HP"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Kata Sandi</label>
              {/* <a href="#" className="text-xs font-bold text-[#137fec] hover:underline">Lupa sandi?</a> */}
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">lock</span>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="w-full pl-11 pr-4 py-3 rounded-xl border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec] transition-all outline-none disabled:opacity-50"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#137fec] text-white font-bold py-4 rounded-xl hover:bg-[#137fec]/90 transition-all shadow-lg shadow-[#137fec]/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="material-symbols-outlined animate-spin">sync</span>
                Memproses...
              </>
            ) : (
              'Masuk Sekarang'
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-600 dark:text-gray-400">
          Belum punya akun?{' '}
          <Link to="/daftar">
            <button 
              className="text-[#137fec] font-bold hover:underline"
            >
              Daftar Anggota
            </button>
          
          </Link>
        </p>
      </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
