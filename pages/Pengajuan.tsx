
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import ProgressBar from '../components/ProgressBar';
import FormSection from '../components/FormSection';
import MapSection from '../components/MapSection';
import { StepPengajuan, FormData } from '../types';
import { 
  Header, 
  Hero, 
  Features, 
  Services, 
  CTASection, 
  Footer,
} from '../components/LandingPage';

const Pengajuan: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<StepPengajuan>(StepPengajuan.DASAR);
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    role: '',
    ownerName: '',
    relationship: '',
  });

  // Check if form has unsaved data
  const hasUnsavedData = () => {
    return formData.role !== '' || formData.ownerName !== '' || formData.relationship !== '';
  };


  const handleBackToDashboard = () => {
    if (hasUnsavedData()) {
      setShowDialog(true);
    } else {
      navigate('/dashboard');
    }
  };

  const confirmLeavePage = () => {
    setShowDialog(false);
    navigate('/dashboard');
  };

  const cancelLeavePage = () => {
    setShowDialog(false);
  };

  const handleNext = () => {
    if (currentStep < StepPengajuan.REVIEW) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > StepPengajuan.DASAR) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16 md:pt-20">
        <div className="flex flex-col items-center py-10 px-4">
          <div className="w-full max-w-[800px] flex flex-col gap-6">
          
          <ProgressBar currentStep={currentStep} />

          <div className="px-2 flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-[#111318] dark:text-white mb-2">Ajukan Sertifikat Baru</h1>
              <p className="text-slate-600 dark:text-slate-400">
                Identifikasi hubungan antara pemohon dengan pemilik properti untuk memulai proses pengajuan sertifikat tanah secara resmi.
              </p>
            </div>
            <button
              onClick={handleBackToDashboard}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              <span className="text-sm font-semibold">Kembali</span>
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-8 flex flex-col gap-8">
              
              {/* Step 1: Dasar Content */}
              {currentStep === StepPengajuan.DASAR && (
                <>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-[#111318] dark:text-slate-200">Bertindak Sebagai</label>
                    <div className="relative">
                      <select 
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="appearance-none w-full px-4 py-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all cursor-pointer"
                      >
                        <option disabled value="">Pilih status peran anda</option>
                        <option value="pemilik">Pemilik Langsung</option>
                        <option value="waris">Ahli Waris</option>
                        <option value="kuasa">Kuasa</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">Status ini menentukan jenis dokumen persyaratan yang akan diminta pada tahap berikutnya.</p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-[#111318] dark:text-slate-200">Nama Pemilik di Surat Tanah</label>
                    <input 
                      name="ownerName"
                      value={formData.ownerName}
                      onChange={handleChange}
                      className="w-full px-4 py-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" 
                      placeholder="Masukkan nama sesuai dokumen" 
                      type="text"
                    />
                    <div className="flex gap-2 items-start mt-1">
                      <span className="material-symbols-outlined text-gold-brand text-lg">info</span>
                      <p className="text-[12px] text-slate-600 dark:text-slate-400 leading-tight">
                        Pastikan ejaan nama sesuai dengan yang tertera pada dokumen asli atau surat ukur tanah.
                      </p>
                    </div>
                  </div>

                  {formData.role === 'waris' && (
                    <div className="flex flex-col gap-2 opacity-100 animate-in fade-in slide-in-from-top-2 duration-500">
                      <label className="text-sm font-bold text-[#111318] dark:text-slate-200">Hubungan dengan Pemilik</label>
                      <div className="relative">
                        <select 
                          name="relationship"
                          value={formData.relationship}
                          onChange={handleChange}
                          className="appearance-none w-full px-4 py-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all cursor-pointer"
                        >
                          <option disabled value="">Pilih hubungan keluarga</option>
                          <option value="anak">Anak Kandung</option>
                          <option value="pasangan">Suami / Istri</option>
                          <option value="orangtua">Orang Tua</option>
                          <option value="lainnya">Lainnya</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                      </div>
                    </div>
                  )}

                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex gap-3">
                    <span className="material-symbols-outlined text-primary">verified_user</span>
                    <div>
                      <p className="text-sm font-bold text-primary">Informasi Amanah</p>
                      <p className="text-xs text-primary/80">Data yang anda masukkan akan kami verifikasi secara ketat untuk menjamin keamanan hak milik tanah anda.</p>
                    </div>
                  </div>
                </>
              )}

              {/* Steps 2: Lahan Content */}
              {currentStep === StepPengajuan.LAHAN && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-7 flex flex-col gap-6">
                    <FormSection 
                      formData={formData} 
                      onChange={handleChange} 
                    />
                  </div>
                  
                  <div className="lg:col-span-5">
                    <MapSection 
                      koordinat={formData.koordinat || ''} 
                      onChange={(koordinat) => {
                        setFormData(prev => ({ ...prev, koordinat }));
                      }}
                    />
                  </div>
                </div>
              )}
              
              {/* Steps 3: Lahan Content */}
              {currentStep === StepPengajuan.DOKUMENHAK && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-7 flex flex-col gap-6">
                    <FormSection 
                      formData={formData} 
                      onChange={handleChange} 
                    />
                  </div>
                  
                  <div className="lg:col-span-5">
                    <MapSection 
                      koordinat={formData.koordinat || ''} 
                      onChange={(koordinat) => {
                        setFormData(prev => ({ ...prev, koordinat }));
                      }}
                    />
                  </div>
                </div>
              )}

            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
              <button 
                onClick={handleBack}
                disabled={currentStep === StepPengajuan.DASAR}
                className={`px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors ${
                  currentStep === StepPengajuan.DASAR ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <span className="material-symbols-outlined text-lg">arrow_back</span>
                Kembali
              </button>
              <button 
                onClick={handleNext}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
              >
                {currentStep === StepPengajuan.REVIEW ? 'Submit' : 'Selanjutnya'}
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </div>
          </div>
          
        </div>
        </div>

        {/* Warning Dialog Modal */}
        {showDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl max-w-md w-full p-6 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-300">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                  <span className="material-symbols-outlined text-yellow-600 dark:text-yellow-400">warning</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Belum Disimpan</h3>
              </div>
              
              <p className="text-slate-600 dark:text-slate-400">
                Data pengajuan Anda belum disimpan. Jika Anda kembali sekarang, semua data yang sudah diisi akan hilang dan tidak akan tersimpan.
              </p>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={cancelLeavePage}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Lanjutkan Mengisi
                </button>
                <button
                  onClick={confirmLeavePage}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors"
                >
                  Kembali ke Dashboard
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Pengajuan;
