
import React from 'react';

export const Header: React.FC = () => (
  <header className="sticky top-0 z-50 bg-white border-b border-solid border-[#dce0e5] px-4 md:px-10 py-3">
    <div className="max-w-[1200px] mx-auto flex items-center justify-between whitespace-nowrap">
      <div className="flex items-center gap-3">
        <div className="size-8 text-[#1466b8]">
          <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fillRule="evenodd"></path>
          </svg>
        </div>
        <h2 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em]">Amanah Bangkit Bersama</h2>
      </div>
      <div className="flex items-center gap-8">
        <nav className="hidden md:flex items-center gap-8">
          <a className="text-[#111418] text-sm font-medium hover:text-[#1466b8] transition-colors" href="#">Beranda</a>
          <a className="text-[#111418] text-sm font-medium hover:text-[#1466b8] transition-colors" href="#">Layanan</a>
          <a className="text-[#1466b8] text-sm font-bold border-b-2 border-[#1466b8]" href="#">Status Pengajuan</a>
          <a className="text-[#111418] text-sm font-medium hover:text-[#1466b8] transition-colors" href="#">Bantuan</a>
        </nav>
        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#1466b8]/20" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCm02RbPhF6tnht9ZIuI7CH90trUFmctcE5f2aqnmnMVfoprAdZKZM8rGRHtdcnL-LMzNeaN0PWGs-ZCY8vXWGXvAz0IgNS4KUdERpXjb5XJ35wr7RhkIfHDjd7mL1KPC-ncKyh1IWhgmrck-aaFJUbo7j1JlcMd-wmFBsbTJ09F9ytl5I77srTT_NqnOgyCRvvTbO-YwCNPIY4kkod5DRZpjaR1WPrtK9EiVkLH5yOKYT99jTxLjN2Tg76tFaqK8_YJrUQ5NFL6ygS")' }}></div>
      </div>
    </div>
  </header>
);

export const ProgressBar: React.FC<{ step: number; totalSteps: number; title: string; progress: number }> = ({ step, totalSteps, title, progress }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-[#dce0e5]">
    <div className="flex flex-col gap-3">
      <div className="flex gap-6 justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="bg-[#1466b8] text-white text-xs font-bold px-2 py-1 rounded">LANGKAH {step} DARI {totalSteps}</span>
          <p className="text-[#111418] text-base font-semibold leading-normal">{title}</p>
        </div>
        <p className="text-[#1466b8] text-sm font-bold leading-normal">{progress}% Selesai</p>
      </div>
      <div className="rounded-full bg-[#dce0e5] h-3 overflow-hidden">
        <div className="h-full rounded-full bg-[#1466b8]" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  </div>
);

export const SectionHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <div className="pt-2 px-1">
    <h1 className="text-[#111418] tracking-tight text-[32px] font-bold leading-tight">{title}</h1>
    <p className="text-[#637588] text-lg font-normal leading-normal pt-2">{subtitle}</p>
  </div>
);

export const InfoPanel: React.FC<{ title: string; content: string; linkText: string }> = ({ title, content, linkText }) => (
  <div className="flex flex-col @container">
    <div className="flex flex-1 flex-col items-start justify-between gap-4 rounded-xl border-l-4 border-[#1466b8] bg-white p-6 shadow-sm @[480px]:flex-row @[480px]:items-center">
      <div className="flex gap-4">
        <div className="bg-[#1466b8]/10 p-3 rounded-full flex items-center justify-center h-fit">
          <span className="material-symbols-outlined text-[#1466b8]" style={{ fontSize: '28px' }}>gavel</span>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-[#111418] text-lg font-bold leading-tight">{title}</p>
          <p className="text-[#637588] text-base font-normal leading-relaxed">{content}</p>
        </div>
      </div>
      <a className="shrink-0 text-sm font-bold leading-normal tracking-[0.015em] flex items-center gap-2 text-[#1466b8] hover:underline" href="#">
        {linkText}
        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
      </a>
    </div>
  </div>
);

export const WorkflowStep: React.FC<{ 
  number: number; 
  title: string; 
  description: string; 
  action?: React.ReactNode; 
  children?: React.ReactNode;
  fullWidth?: boolean;
}> = ({ number, title, description, action, children, fullWidth }) => (
  <div className="bg-white rounded-xl border border-[#dce0e5] p-6 flex flex-col gap-6">
    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
      <div className="flex-shrink-0 size-12 bg-[#1466b8] text-white rounded-full flex items-center justify-center font-bold text-xl">{number}</div>
      <div className="flex-grow">
        <h3 className="text-lg font-bold text-[#111418]">{title}</h3>
        <p className="text-[#637588]">{description}</p>
      </div>
      {!fullWidth && action && (
        <div className="w-full md:w-auto">
          {action}
        </div>
      )}
    </div>
    {fullWidth && action && (
      <div className="w-full">
        {action}
      </div>
    )}
    {children}
  </div>
);

export const UploadArea: React.FC<{ onUploadClick: () => void; uploadedFile: File | null }> = ({ onUploadClick, uploadedFile }) => (
  <div 
    onClick={onUploadClick}
    className={`mt-4 border-2 border-dashed ${uploadedFile ? 'border-accent-teal/50 bg-accent-teal/5' : 'border-[#1466b8]/30 bg-[#1466b8]/5'} rounded-xl p-10 flex flex-col items-center justify-center hover:bg-opacity-10 transition-colors cursor-pointer group`}
  >
    <div className="bg-white p-4 rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform">
      <span className={`material-symbols-outlined ${uploadedFile ? 'text-accent-teal' : 'text-[#1466b8]'}`} style={{ fontSize: '40px' }}>
        {uploadedFile ? 'check_circle' : 'cloud_upload'}
      </span>
    </div>
    <p className="text-[#111418] font-bold text-lg mb-1">
      {uploadedFile ? uploadedFile.name : 'Klik untuk unggah atau seret file ke sini'}
    </p>
    <p className="text-[#637588] text-sm">
      {uploadedFile ? `${(uploadedFile.size / 1024 / 1024).toFixed(2)} MB` : 'Maksimal ukuran file: 5MB'}
    </p>
  </div>
);

export const SubmissionFooter: React.FC<{ 
  isChecked: boolean; 
  onCheckChange: (val: boolean) => void; 
  isEnabled: boolean;
  onSubmit: () => void;
  onBack: () => void;
}> = ({ isChecked, onCheckChange, isEnabled, onSubmit, onBack }) => (
  <div className="mt-4 flex flex-col gap-6 p-1">
    <div className="flex items-start gap-4">
      <div className="flex items-center h-6">
        <input 
          className="size-5 rounded border-gray-300 text-[#1466b8] focus:ring-[#1466b8] cursor-pointer" 
          id="disclaimer" 
          type="checkbox"
          checked={isChecked}
          onChange={(e) => onCheckChange(e.target.checked)}
        />
      </div>
      <label className="text-sm font-medium text-[#111418] leading-relaxed cursor-pointer" htmlFor="disclaimer">
        Saya dengan sadar memberikan kuasa penuh kepada Amanah Bangkit Bersama untuk memproses legalitas dokumen sesuai ketentuan yang berlaku dan menyatakan bahwa dokumen yang diunggah adalah sah dan benar.
      </label>
    </div>
    
  </div>
);

export const SiteFooter: React.FC = () => (
  <footer className="bg-white border-t border-[#dce0e5] py-8 px-4 mt-8">
    <div className="max-w-[960px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-[#637588] text-sm">© 2024 Amanah Bangkit Bersama. All rights reserved.</p>
      <div className="flex gap-6">
        <a className="text-[#637588] text-xs hover:text-[#1466b8]" href="#">Syarat & Ketentuan</a>
        <a className="text-[#637588] text-xs hover:text-[#1466b8]" href="#">Kebijakan Privasi</a>
        <a className="text-[#637588] text-xs hover:text-[#1466b8]" href="#">Hubungi Kami</a>
      </div>
    </div>
  </footer>
);
