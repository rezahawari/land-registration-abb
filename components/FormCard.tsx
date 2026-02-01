
import React, { useState } from 'react';

interface FormCardProps {
  step: number;
  onNext: () => void;
  onBack: () => void;
}

const FormCard: React.FC<FormCardProps> = ({ step, onNext, onBack }) => {
  const [selectedHistory, setSelectedHistory] = useState<string>('jual-beli');

  // Step 3 specific content
  if (step === 3) {
    return (
      <div className="bg-white dark:bg-[#1a2632] rounded-xl shadow-sm border border-[#dbe0e6] dark:border-[#343d48] overflow-hidden flex flex-col">
        <div className="p-8">
          <h1 className="text-[#111418] dark:text-white text-2xl font-bold leading-tight mb-2">Detail Dokumen Alas Hak</h1>
          <p className="text-[#617589] dark:text-gray-400 text-base mb-8">
            Silakan masukkan informasi mengenai dokumen dasar kepemilikan tanah Anda untuk proses verifikasi data fisik dan yuridis.
          </p>

          <form className="space-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-[#111418] dark:text-white text-sm font-bold">Jenis Dokumen Alas Hak</label>
              <div className="relative">
                <select className="w-full h-12 px-4 rounded-lg bg-white dark:bg-[#101922] border border-[#dbe0e6] dark:border-[#343d48] focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-base">
                  <option value="">Pilih Jenis Dokumen (Eigendom, Girik, AJB, dll)</option>
                  <option value="eigendom">Eigendom Verponding</option>
                  <option value="girik">Girik / Letter C / Petok D</option>
                  <option value="ajb">Akta Jual Beli (AJB)</option>
                  <option value="hibah">Akta Hibah</option>
                  <option value="waris">Surat Keterangan Waris</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-[#617589]">
                  <span className="material-symbols-outlined">expand_more</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[#111418] dark:text-white text-sm font-bold">Nomor Dokumen</label>
                <input 
                  type="text" 
                  placeholder="Contoh: 1234/Desa/2023"
                  className="w-full h-12 px-4 rounded-lg bg-white dark:bg-[#101922] border border-[#dbe0e6] dark:border-[#343d48] focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[#111418] dark:text-white text-sm font-bold">Tahun Terbit</label>
                <input 
                  type="number" 
                  placeholder="YYYY"
                  className="w-full h-12 px-4 rounded-lg bg-white dark:bg-[#101922] border border-[#dbe0e6] dark:border-[#343d48] focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[#111418] dark:text-white text-sm font-bold">Riwayat Penguasaan Fisik</label>
              <p className="text-[#617589] dark:text-gray-400 text-xs">Bagaimana asal-usul tanah ini Anda kuasai?</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { id: 'jual-beli', icon: 'payments', label: 'Jual Beli' },
                  { id: 'warisan', icon: 'family_history', label: 'Warisan' },
                  { id: 'hibah', icon: 'featured_seasonal_and_gifts', label: 'Hibah' },
                  { id: 'lainnya', icon: 'more_horiz', label: 'Lainnya' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedHistory(item.id)}
                    className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${
                      selectedHistory === item.id 
                        ? 'border-primary bg-primary/5 text-primary' 
                        : 'border-[#dbe0e6] dark:border-[#343d48] text-[#617589] hover:border-primary/50'
                    }`}
                  >
                    <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                    <span className="text-xs font-semibold">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <span className="material-symbols-outlined text-primary">info</span>
              <p className="text-sm text-[#111418] dark:text-gray-200">
                Pastikan dokumen yang diinput adalah dokumen asli atau salinan resmi yang sah. Anda akan diminta mengunggah scan dokumen pada langkah berikutnya.
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Placeholder for other steps
  return (
    <div className="bg-white dark:bg-[#1a2632] rounded-xl shadow-sm border border-[#dbe0e6] dark:border-[#343d48] p-10 text-center flex flex-col items-center gap-6">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
         <span className="material-symbols-outlined text-3xl text-primary">pending_actions</span>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Langkah {step} dalam Pengembangan</h2>
        <p className="text-[#617589]">Mohon maaf, layar untuk tahap ini sedang dipersiapkan oleh tim kami.</p>
      </div>
      <div className="flex gap-4">
        <button onClick={onBack} className="px-6 py-2 rounded-lg border border-[#dbe0e6] dark:border-[#343d48]">Kembali</button>
        <button onClick={onNext} className="px-6 py-2 rounded-lg bg-primary text-white font-bold">Simulasi Lanjut</button>
      </div>
    </div>
  );
};

export default FormCard;
