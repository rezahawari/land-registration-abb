
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import ProgressBar from '../components/ProgressBar';
import FormSection from '../components/FormSection';
import MapSection from '../components/MapSection';
import FormCard from '../components/FormCard';
import FileUpload from '../components/FileUpload';
import { StepPengajuan, FormData } from '../types';
import { 
  Header, 
  Hero, 
  Features, 
  Services, 
  CTASection, 
  Footer,
} from '../components/LandingPage';
import { 
  SectionHeader, 
  InfoPanel, 
  WorkflowStep, 
  UploadArea, 
  SubmissionFooter,
  SiteFooter
} from '../components/UI';
import { submitPengajuan } from '../services/api';

const Pengajuan: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<StepPengajuan>(StepPengajuan.DASAR);
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    role: '',
    ownerName: '',
    relationship: '',
    uploadedLegalFile: null,
  });

  // Check if form has unsaved data
  const hasUnsavedData = () => {
    return formData.role !== '' || 
           formData.ownerName !== '' || 
           formData.relationship !== '' ||
           formData.provinsi !== undefined ||
           formData.alamat !== undefined ||
           formData.jenisDocHak !== undefined ||
           formData.ktp !== undefined ||
           formData.uploadedLegalFile !== undefined;
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (fieldName: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [fieldName]: file }));
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, notes: value }));
  };

  const handleFormCardChange = (data: any) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleToggleDisclaimer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setFormData(prev => ({ ...prev, disclaimerAccepted: checked }));
  };

  // Legalitas / upload handlers
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDisclaimerCheckedLocal, setIsDisclaimerCheckedLocal] = useState<boolean>(!!formData.disclaimerAccepted);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState<boolean>(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    setIsSubmitEnabled(!!uploadedFile && !!isDisclaimerCheckedLocal);
    // keep formData sync
    setFormData(prev => ({ ...prev, disclaimerAccepted: isDisclaimerCheckedLocal }));
  }, [uploadedFile, isDisclaimerCheckedLocal]);

  const handleDownload = () => {
    // Buat file sederhana berisi data pengajuan (placeholder untuk PDF generator)
    const content = `Surat Kuasa\n\nData Pengaju:\n${JSON.stringify(formData, null, 2)}`;
    const blob = new Blob([content], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'surat_kuasa.pdf';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setUploadedFile(file);
    handleFileChange('uploadedLegalFile', file);
  };

  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmitPengajuan = async () => {
    try {
      // kirim formData ke backend
      await submitPengajuan(formData);
      setToast({ message: 'Pengajuan berhasil dikirim. Terima kasih.', type: 'success' });
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err: any) {
      console.error(err);
      setToast({ message: 'Gagal mengirim pengajuan: ' + (err?.message || err), type: 'error' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16 md:pt-20">
        <div className="flex flex-col items-center py-10 px-4">
          <div className="w-full max-w-[800px] flex flex-col gap-6">
          
          {/* Toast Notification */}
          {toast && (
            <div 
              className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white font-semibold animate-in fade-in slide-in-from-top-2 duration-300 z-50 ${
                toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
              }`}
              onAnimationEnd={() => {
                const timer = setTimeout(() => setToast(null), 3000);
                return () => clearTimeout(timer);
              }}
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined">{toast.type === 'success' ? 'check_circle' : 'error'}</span>
                {toast.message}
              </div>
            </div>
          )}
          
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
              {/* Steps 6: Review */}
              {currentStep === StepPengajuan.REVIEW && (
                <div className="flex flex-col gap-6">
                  <h2 className="text-2xl font-bold">Tinjau Pengajuan Anda</h2>
                  <div className="bg-white rounded-xl p-4 border border-[#dce0e5]">
                    <h3 className="font-semibold mb-2">Informasi Dasar</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-[#374151]">
                      <div><strong>Peran:</strong> {formData.role || '-'}</div>
                      <div><strong>Nama Pemilik:</strong> {formData.ownerName || '-'}</div>
                      <div><strong>Hubungan:</strong> {formData.relationship || '-'}</div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-4 border border-[#dce0e5]">
                    <h3 className="font-semibold mb-2">Lokasi & Detail</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-[#374151]">
                      <div><strong>Provinsi:</strong> {formData.provinsi || '-'}</div>
                      <div><strong>Kota:</strong> {formData.kota || '-'}</div>
                      <div><strong>Kecamatan:</strong> {formData.kecamatan || '-'}</div>
                      <div><strong>Kelurahan:</strong> {formData.desa || '-'}</div>
                      <div><strong>Alamat:</strong> {formData.alamat || '-'}</div>
                      <div><strong>Luas:</strong> {formData.luas || '-'}</div>
                      <div><strong>Kondisi:</strong> {formData.kondisi || '-'}</div>
                      <div><strong>Koordinat:</strong> {formData.koordinat || '-'}</div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-4 border border-[#dce0e5]">
                    <h3 className="font-semibold mb-2">Dokumen & Pendukung</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-[#374151]">
                      <div><strong>KTP:</strong> {formData.ktp ? (formData.ktp as File).name : '-'}</div>
                      <div><strong>KK:</strong> {formData.kk ? (formData.kk as File).name : '-'}</div>
                      <div><strong>Bukti Kepemilikan:</strong> {formData.landDocument ? (formData.landDocument as File).name : '-'}</div>
                      <div><strong>Foto Lokasi:</strong> {formData.locationPhoto ? (formData.locationPhoto as File).name : '-'}</div>
                      <div className="md:col-span-2"><strong>Catatan:</strong> {formData.notes || '-'}</div>
                    </div>
                  </div>
                </div>
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
              
              {/* Steps 3: Dokumen Hak Content */}
              {currentStep === StepPengajuan.DOKUMENHAK && (
                <FormCard 
                  step={currentStep} 
                  onNext={handleNext} 
                  onBack={handleBack}
                  formData={formData}
                  onFormDataChange={handleFormCardChange}
                />
              )}

              {/* Steps 4: Dokumen Pendukung Content */}
              {currentStep === StepPengajuan.DOKUMENPENDUKUNG && (
                <div className="flex flex-col gap-8">
                  <div className="py-4 border-t border-solid border-[#f0f2f4] dark:border-slate-800 mt-2">
                    <h1 className="text-3xl font-black leading-tight tracking-[-0.033em]">Unggah Foto Dokumen</h1>
                    <p className="text-[#637588] dark:text-slate-400 text-base font-normal leading-normal mt-2">
                      Pastikan semua dokumen dalam format <b>JPG, PNG atau PDF</b> (Maksimal 5MB per file). Gunakan pencahayaan yang terang agar teks terbaca jelas.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FileUpload 
                      label="KTP Asli"
                      icon="id_card"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={(f) => handleFileChange('ktp', f)}
                      value={formData.ktp || null}
                    />
                    <FileUpload 
                      label="Kartu Keluarga"
                      icon="family_history"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={(f) => handleFileChange('kk', f)}
                      value={formData.kk || null}
                    />
                    <FileUpload 
                      label="Bukti Kepemilikan Tanah"
                      icon="description"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={(f) => handleFileChange('landDocument', f)}
                      value={formData.landDocument || null}
                    />
                    <FileUpload 
                      label="Foto Lokasi"
                      icon="photo_camera"
                      accept="image/*"
                      onChange={(f) => handleFileChange('locationPhoto', f)}
                      value={formData.locationPhoto || null}
                    />
                  </div>

                  <div className="flex flex-col gap-3 py-6">
                    <label className="text-base font-bold leading-normal" htmlFor="notes">Catatan Tambahan (Opsional)</label>
                    <textarea 
                      className="w-full rounded-xl border border-[#dce0e5] dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-primary focus:ring-primary transition-all p-4 placeholder:text-slate-400" 
                      id="notes" 
                      name="notes"
                      placeholder="Berikan informasi tambahan jika ada (misal: patokan lokasi, jam kunjungan yang disarankan, dll)" 
                      rows={4}
                      value={formData.notes || ''}
                      onChange={handleNotesChange}
                    ></textarea>
                  </div>

                  <div className="flex items-start gap-3 p-5 bg-primary/5 dark:bg-primary/10 rounded-xl border border-primary/20 mb-8">
                    <div className="flex items-center h-5">
                      <input 
                        className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer" 
                        id="disclaimer" 
                        type="checkbox"
                        checked={formData.disclaimerAccepted || false}
                        onChange={handleToggleDisclaimer}
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label className="font-medium cursor-pointer" htmlFor="disclaimer">Pernyataan Keaslian Dokumen</label>
                      <p className="text-[#637588] dark:text-slate-400">
                        Saya menyatakan dengan sadar bahwa semua dokumen yang diunggah adalah asli, benar, dan sah menurut hukum yang berlaku. Amanah Bangkit Bersama berhak membatalkan pengajuan jika ditemukan ketidaksesuaian data.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {/* Steps 5: Legalitas */}
              {currentStep === StepPengajuan.LEGALITAS && (
                <div className="flex flex-col gap-6">
                  <SectionHeader 
                    title="Berikan Kuasa Pengurusan"
                    subtitle="Lengkapi surat kuasa untuk melanjutkan proses legalitas di BPN dan Pengadilan secara sah."
                  />

                  <InfoPanel 
                    title="Mengapa ini diperlukan?"
                    content="Berdasarkan peraturan BPN dan Pengadilan, pengurusan sertifikat tanah melalui pihak ketiga memerlukan surat kuasa sah bermaterai sebagai bukti legalitas perwakilan Anda yang diakui secara hukum."
                    linkText="Pelajari Dasar Hukum"
                  />

                  <div className="grid grid-cols-1 gap-6">
                    <WorkflowStep 
                      number={1}
                      title="Unduh Dokumen"
                      description="Dapatkan draf surat kuasa yang telah terisi data Anda secara otomatis berdasarkan pengisian sebelumnya."
                      action={
                        <button 
                          onClick={handleDownload}
                          className="bg-[#1466b8] hover:bg-[#1466b8]/90 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2 transition-all w-full md:w-auto justify-center"
                        >
                          <span className="material-symbols-outlined">download</span>
                          Unduh Surat Kuasa (PDF)
                        </button>
                      }
                    />

                    <WorkflowStep 
                      number={2}
                      title="Tanda Tangan & Materai"
                      description="Cetak dokumen, tempelkan Materai Rp 10.000, dan bubuhkan tanda tangan di atas materai tersebut."
                      action={
                        <div className="flex gap-3">
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded bg-accent-gold/10 text-accent-gold"> 
                            <span className="material-symbols-outlined">sell</span>
                            Materai
                          </span>
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded bg-accent-teal/10 text-accent-teal"> 
                            <span className="material-symbols-outlined">edit_document</span>
                            Tanda Tangan
                          </span>
                        </div>
                      }
                    />

                    <WorkflowStep 
                      number={3}
                      title="Foto & Unggah Kembali"
                      description="Pastikan seluruh bagian dokumen terlihat jelas dengan pencahayaan yang cukup. Format file: JPG, PNG, atau PDF."
                      fullWidth
                    >
                      <UploadArea 
                        onUploadClick={handleFileUploadClick}
                        uploadedFile={uploadedFile}
                      />
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept=".jpg,.png,.pdf" 
                        onChange={handleFileUpload} 
                      />
                    </WorkflowStep>
                  </div>

                  <SubmissionFooter 
                    isChecked={isDisclaimerCheckedLocal}
                    onCheckChange={setIsDisclaimerCheckedLocal}
                    isEnabled={isSubmitEnabled}
                    onSubmit={handleSubmitPengajuan}
                    onBack={handleBack}
                  />
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
                onClick={currentStep === StepPengajuan.REVIEW ? handleSubmitPengajuan : handleNext}
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
