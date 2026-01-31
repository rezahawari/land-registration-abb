
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-center border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark px-4 py-3 sticky top-0 z-50">
        <div className="flex w-full max-w-[1200px] items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="size-8 text-primary">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fillRule="evenodd"></path>
              </svg>
            </div>
            <h2 className="text-lg font-bold leading-tight tracking-tight">Amanah Bangkit Bersama</h2>
          </div>
          <div className="flex items-center gap-8">
            <nav className="hidden md:flex items-center gap-6">
              <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Dashboard</a>
              <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Layanan</a>
              <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Riwayat</a>
              <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Bantuan</a>
            </nav>
            <div className="flex items-center gap-3 border-l pl-8 border-slate-200 dark:border-slate-800">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-semibold">Budi Santoso</p>
                <p className="text-[10px] text-slate-500">Pemohon Properti</p>
              </div>
              <div 
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-slate-200" 
                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBcQa_vK3_UE3pmUtIhPwURUYKffgbhhlYp-bmuIZP1HNTKjtpMifEJuc2wu1My08QoZMXOJygTnCnhH8jiRHt4FUrgwrZulcIhGK1D--sPX2ZqsHODC3vZRjB99lhti_R8JODqFrPgJ0FSNM27KiUWMRKGKdNVH4uBBICSgaefYS0Y-Xtibaz---HH05m4XahzdZ9B4ZCfKkYmqnZQ2sKOWnmdVNNzww9zeQv1p68x_VAovcCrUxhLcKxttmxOCFOnKzbRlROL0pE_')` }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="py-10 text-center">
        <div className="flex justify-center gap-8 py-4 border-t border-slate-200 dark:border-slate-800 mb-4 max-w-[800px] mx-auto">
          <a className="text-xs font-medium text-slate-500 hover:text-primary transition-colors flex items-center gap-1" href="#">
            <span className="material-symbols-outlined text-sm">support_agent</span>
            Hubungi Bantuan
          </a>
          <a className="text-xs font-medium text-slate-500 hover:text-primary transition-colors flex items-center gap-1" href="#">
            <span className="material-symbols-outlined text-sm">description</span>
            Panduan Pengisian
          </a>
        </div>
        <p className="text-[11px] text-slate-400 uppercase tracking-[0.2em]">© 2024 Amanah Bangkit Bersama. Terdaftar & Diawasi oleh BPN.</p>
      </footer>
    </div>
  );
};

export default Layout;
