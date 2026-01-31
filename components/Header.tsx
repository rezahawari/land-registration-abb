
import React from 'react';

interface HeaderProps {
  onLoginClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick }) => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f4] dark:border-b-gray-800 bg-white dark:bg-[#101922] px-6 md:px-10 py-3 sticky top-0 z-50">
      <div className="flex items-center gap-4 text-[#137fec]">
        <div className="h-10 w-auto">
          <img 
            src="https://raw.githubusercontent.com/username/repo/main/logo.jpg" 
            alt="Amanah Bangkit Bersama Logo"
            className="h-full w-auto object-contain"
            onError={(e) => {
              // Fallback if image fails to load
              e.currentTarget.src = "https://img.freepik.com/free-vector/shield-with-house-logo-template_23-2148651034.jpg";
            }}
          />
        </div>
        <h2 className="text-[#111418] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">
          Amanah Bangkit Bersama
        </h2>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <nav className="hidden md:flex items-center gap-9">
          <a className="text-[#111418] dark:text-gray-300 text-sm font-medium hover:text-[#137fec] transition-colors" href="#">Beranda</a>
          <a className="text-[#111418] dark:text-gray-300 text-sm font-medium hover:text-[#137fec] transition-colors" href="#">Tentang Kami</a>
          <a className="text-[#111418] dark:text-gray-300 text-sm font-medium hover:text-[#137fec] transition-colors" href="#">Layanan</a>
          <a className="text-[#111418] dark:text-gray-300 text-sm font-medium hover:text-[#137fec] transition-colors" href="#">Bantuan</a>
        </nav>
        <button 
          onClick={onLoginClick}
          className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-[#137fec] text-white text-sm font-bold hover:bg-[#137fec]/90 transition-all">
          <span>Masuk</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
