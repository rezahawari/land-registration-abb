
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
import StepProgress from '../components/StepProgress';
import FileUpload from '../components/FileUpload';
import { FormData, Step } from '../types';
import { submitRegistration } from '../services/api';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    nik: '',
    name: '',
    email: '',
    birthPlace: '',
    birthDate: '',
    gender: '',
    job: '',
    password: '',
    ktpPhoto: null,
    kkPhoto: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(''); // Clear error when user starts typing
  };

  const handleFileChange = (name: keyof FormData) => (file: File | null) => {
    setFormData(prev => ({ ...prev, [name]: file }));
    setError(''); // Clear error when user uploads file
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await submitRegistration(formData);
      setSuccess(true);
      
      // Reset form setelah sukses
      setTimeout(() => {
        setFormData({
          nik: '',
          name: '',
          email: '',
          birthPlace: '',
          birthDate: '',
          gender: '',
          job: '',
          password: '',
          ktpPhoto: null,
          kkPhoto: null,
        });
        setSuccess(false);
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat mengirim data');
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="layout-container flex h-full grow flex-col min-h-screen">
      <Header />

      <main className="flex flex-1 justify-center py-10 px-4">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          
          <div className="text-center mb-8">
            <h1 className="text-[#111418] dark:text-white tracking-light text-3xl md:text-4xl font-bold leading-tight pb-2">
              Pendaftaran Calon Anggota
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Bergabunglah bersama kami untuk masa depan yang lebih amanah dan sejahtera.
            </p>
          </div>

          {/* <StepProgress 
            currentStep={currentStep} 
            totalSteps={4} 
            stepTitle="Data Diri" 
            stepDescription="Lengkapi informasi identitas sesuai dengan Kartu Tanda Penduduk (KTP) yang berlaku."
          /> */}

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="border-b border-gray-100 dark:border-gray-800 px-8 py-6 bg-gray-50/50 dark:bg-gray-800/30">
              <h2 className="text-[#111418] dark:text-white text-xl font-bold leading-tight flex items-center gap-2">
                <span className="material-symbols-outlined">description</span>
                Informasi Pribadi
              </h2>
            </div>

            <form className="p-8 space-y-6" onSubmit={handleSubmit}>
              {/* Success Alert */}
              {success && (
                <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                  <p className="text-green-800 dark:text-green-200 font-semibold flex items-center gap-2">
                    <span className="material-symbols-outlined">check_circle</span>
                    Pendaftaran berhasil! Terima kasih telah mendaftar.
                  </p>
                </div>
              )}

              {/* Error Alert */}
              {error && (
                <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                  <p className="text-red-800 dark:text-red-200 font-semibold flex items-center gap-2">
                    <span className="material-symbols-outlined">error</span>
                    {error}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="flex flex-col gap-2">
                  <span className="text-[#111418] dark:text-gray-200 text-sm font-semibold">NIK (Nomor Induk Kependudukan)</span>
                  <input 
                    name="nik"
                    value={formData.nik}
                    onChange={handleInputChange}
                    className="form-input w-full rounded-lg border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#111418] dark:text-white h-12 px-4 focus:ring-[#137fec] focus:border-[#137fec]" 
                    placeholder="Masukkan 16 digit NIK" 
                    type="text"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-[#111418] dark:text-gray-200 text-sm font-semibold">Nama Lengkap</span>
                  <input 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input w-full rounded-lg border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#111418] dark:text-white h-12 px-4 focus:ring-[#137fec] focus:border-[#137fec]" 
                    placeholder="Sesuai KTP" 
                    type="text"
                  />
                </label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="flex flex-col gap-2">
                  <span className="text-[#111418] dark:text-gray-200 text-sm font-semibold">Tempat Lahir</span>
                  <input 
                    name="birthPlace"
                    value={formData.birthPlace}
                    onChange={handleInputChange}
                    className="form-input w-full rounded-lg border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#111418] dark:text-white h-12 px-4 focus:ring-[#137fec] focus:border-[#137fec]" 
                    placeholder="Kota Kelahiran" 
                    type="text"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-[#111418] dark:text-gray-200 text-sm font-semibold">Tanggal Lahir</span>
                  <input 
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    className="form-input w-full rounded-lg border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#111418] dark:text-white h-12 px-4 focus:ring-[#137fec] focus:border-[#137fec]" 
                    type="date"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="flex flex-col gap-2">
                  <span className="text-[#111418] dark:text-gray-200 text-sm font-semibold">Jenis Kelamin</span>
                  <select 
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="form-select w-full rounded-lg border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#111418] dark:text-white h-12 px-4 focus:ring-[#137fec] focus:border-[#137fec]"
                  >
                    <option value="">Pilih Jenis Kelamin</option>
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-[#111418] dark:text-gray-200 text-sm font-semibold">Pekerjaan</span>
                  <input 
                    name="job"
                    value={formData.job}
                    onChange={handleInputChange}
                    className="form-input w-full rounded-lg border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#111418] dark:text-white h-12 px-4 focus:ring-[#137fec] focus:border-[#137fec]" 
                    placeholder="Pekerjaan saat ini" 
                    type="text"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="flex flex-col gap-2">
                  <span className="text-[#111418] dark:text-gray-200 text-sm font-semibold">Email</span>
                  <input 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input w-full rounded-lg border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#111418] dark:text-white h-12 px-4 focus:ring-[#137fec] focus:border-[#137fec]" 
                    placeholder="alamat@email.com" 
                    type="email"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-[#111418] dark:text-gray-200 text-sm font-semibold">Password</span>
                  <input 
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="form-input w-full rounded-lg border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#111418] dark:text-white h-12 px-4 focus:ring-[#137fec] focus:border-[#137fec]" 
                    placeholder="Buat password yang kuat" 
                    type="password"
                    required
                  />
                </label>
              </div>

              <div className="border-t border-gray-100 dark:border-gray-800 pt-6">
                <h2 className="text-[#111418] dark:text-white text-xl font-bold leading-tight pb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined">upload_file</span>
                  Unggah Dokumen
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FileUpload 
                    label="Foto KTP" 
                    icon="add_a_photo" 
                    value={formData.ktpPhoto}
                    onChange={handleFileChange('ktpPhoto')}
                  />
                  <FileUpload 
                    label="Foto Kartu Keluarga" 
                    icon="file_upload" 
                    value={formData.kkPhoto}
                    onChange={handleFileChange('kkPhoto')}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-8 border-t border-gray-100 dark:border-gray-800">
                {/* <button 
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg border border-[#dbe0e6] dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                  Batal
                </button> */}
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center gap-2 px-8 py-3 rounded-lg bg-[#137fec] text-white font-bold hover:bg-[#137fec]/90 transition-all shadow-lg shadow-[#137fec]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <span className="material-symbols-outlined text-[20px] animate-spin">sync</span>
                      Mengirim...
                    </>
                  ) : (
                    <>
                      Submit
                      <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#137fec]">verified_user</span>
              <span className="text-xs font-semibold uppercase tracking-widest">Data Terenkripsi</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#137fec]">gpp_good</span>
              <span className="text-xs font-semibold uppercase tracking-widest">Aman & Terpercaya</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#137fec]">support_agent</span>
              <span className="text-xs font-semibold uppercase tracking-widest">Layanan 24/7</span>
            </div>
          </div>

          <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-500 text-sm">
            <div className="flex justify-center gap-6 mb-4">
              <a className="hover:text-[#137fec] underline underline-offset-4" href="#">Syarat & Ketentuan</a>
              <a className="hover:text-[#137fec] underline underline-offset-4" href="#">Kebijakan Privasi</a>
              <a className="hover:text-[#137fec] underline underline-offset-4" href="#">Pusat Bantuan</a>
            </div>
            <p>© 2024 Amanah Bangkit Bersama. Seluruh Hak Cipta Dilindungi.</p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default App;
