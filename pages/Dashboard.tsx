
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Header, 
  Hero, 
  Features, 
  Services, 
  CTASection, 
  Footer,
  ProgressBar 
} from '../components/LandingPage';

const Dashboard: React.FC = () => {
  const services = [
    { title: 'Ajukan Baru', icon: 'add_card', color: 'text-blue-500', bg: 'bg-blue-50' },
    { title: 'Aset Saya', icon: 'assignment', color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Konsultasi', icon: 'forum', color: 'text-blue-500', bg: 'bg-blue-50' },
    { title: 'E-Brankas', icon: 'lock', color: 'text-blue-700', bg: 'bg-blue-50' },
    { title: 'Kamus Tanah', icon: 'menu_book', color: 'text-blue-500', bg: 'bg-blue-50' },
    { title: 'Bantuan', icon: 'support_agent', color: 'text-blue-400', bg: 'bg-blue-50' },
  ];

  const news = [
    { 
      title: 'Girik vs Letter C: Apa Bedanya?', 
      desc: 'Pahami perbedaan mendasar status hukum tanah adat di Indonesia.',
      img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=200'
    },
    { 
      title: 'Prosedur PTSL Terbaru 2024', 
      desc: 'Langkah mudah mengurus sertifikat melalui program pemerintah.',
      img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=200'
    },
    { 
      title: 'Syarat Balik Nama Sertifikat', 
      desc: 'Dokumen apa saja yang perlu disiapkan untuk proses AJB.',
      img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=200'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16 md:pt-20">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-6 pb-20 md:pb-6 px-4 md:px-0 mx-auto">
      
      {/* Main Content Area */}
      <div className="lg:col-span-8 space-y-6">
        
        {/* Active Progress Monitor */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 md:p-6 border-b border-gray-50 flex items-center gap-2">
             <span className="material-symbols-outlined text-blue-500 text-lg">analytics</span>
             <h3 className="font-bold text-gray-800">Monitor Progres Aktif</h3>
          </div>
          <div className="p-4 md:p-6 flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-48 h-32 md:h-40 shrink-0">
               <img 
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=600" 
                className="w-full h-full object-cover rounded-xl" 
                alt="Project Land"
              />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h4 className="text-xl font-bold text-gray-900">Konversi Eigendom - Lahan Kaligawe</h4>
                <p className="text-blue-600 font-bold text-sm mt-1 uppercase tracking-tight">Tahap 3 dari 5: Pengecekan Lapangan (BPN)</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-gray-500">
                  <span>Progres Keseluruhan</span>
                  <span>60%</span>
                </div>
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full w-[60%] rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs text-gray-400 italic">
                  <span className="material-symbols-outlined text-[14px]">schedule</span>
                  Update terakhir: 2 jam yang lalu
                </div>
                <button className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-lg hover:bg-blue-700 transition-all shadow-md">
                  LIHAT DETAIL KRONOLOGI
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Services */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-800">Layanan Utama</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {services.map((item, idx) => {
              const card = (
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all flex flex-col items-center justify-center text-center group cursor-pointer">
                  <div className={`${item.bg} ${item.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <span className="material-symbols-outlined text-[32px]">{item.icon}</span>
                  </div>
                  <p className="font-bold text-gray-800">{item.title}</p>
                </div>
              );

              // Make 'Ajukan Baru' navigate to /pengajuan
              if (item.title === 'Ajukan Baru') {
                return (
                  <Link to="/pengajuan" key={idx} className="block">
                    {card}
                  </Link>
                );
              }

              return (
                <div key={idx}>{card}</div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sidebar Area */}
      <div className="lg:col-span-4 space-y-6">
        
        {/* Security Alert Card */}
        <div className="bg-gradient-to-br from-red-600 to-red-800 text-white rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden group">
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] bg-black/20 inline-block px-2 py-1 rounded mb-4">Peringatan Keamanan</p>
          <h3 className="text-2xl font-bold mb-3">Waspada Mafia Tanah!</h3>
          <p className="text-sm text-red-50 font-medium leading-relaxed opacity-90 mb-6">
            Jangan berikan dokumen asli tanpa tanda terima resmi dari Amanbang.
          </p>
          <a href="#" className="inline-flex items-center gap-2 text-sm font-bold border-b-2 border-white pb-1 hover:gap-4 transition-all">
            Pelajari Selengkapnya
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>

        {/* News Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-50 flex items-center justify-between">
            <h3 className="font-bold text-gray-800">Pojok Literasi Amanbang</h3>
            <button className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-800 transition-colors">SEMUA</button>
          </div>
          <div className="divide-y divide-gray-50">
            {news.map((item, idx) => (
              <div key={idx} className="p-4 flex gap-4 hover:bg-gray-50 transition-colors cursor-pointer group">
                <img src={item.img} className="w-16 h-16 object-cover rounded-lg shrink-0 grayscale group-hover:grayscale-0 transition-all" alt={item.title} />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-gray-800 line-clamp-1 group-hover:text-blue-600">{item.title}</h4>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
