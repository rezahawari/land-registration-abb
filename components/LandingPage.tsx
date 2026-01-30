
import React from 'react';
import { Link } from 'react-router-dom'

export const Header: React.FC = () => (
  <header className="flex items-center justify-between border-b border-[#f0f2f4] bg-white px-10 py-3 sticky top-0 z-50">
    <Link to="/">
      <div className="flex items-center gap-4 text-primary">
        <span className="material-symbols-outlined text-3xl">account_balance</span>
        <h2 className="text-[#111418] text-lg font-bold leading-tight tracking-tight">Amanah Bangkit Bersama</h2>
      </div>
    </Link>
    <div className="flex flex-1 justify-end gap-8">
      <nav className="hidden md:flex items-center gap-9">
        <Link to="/"><span className="text-[#111418] text-sm font-medium hover:text-teal-custom transition-colors">Beranda</span></Link>
        <a className="text-[#111418] text-sm font-medium hover:text-teal-custom transition-colors" href="#">Layanan</a>
        <a className="text-[#111418] text-sm font-medium hover:text-teal-custom transition-colors" href="#">Tentang Kami</a>
        <a className="text-[#111418] text-sm font-medium hover:text-teal-custom transition-colors" href="#">FAQ</a>
      </nav>
      <div className="flex gap-2">
        <Link to="/daftar">
          <button className="bg-primary text-white text-sm font-bold px-4 h-10 rounded-lg hover:bg-primary/90 transition-all shadow-sm">
            Daftar Anggota
          </button>
        </Link>
        <button className="bg-[#f0f2f4] text-[#111418] text-sm font-bold px-4 h-10 rounded-lg hover:bg-[#e2e4e6] transition-all">
          Masuk
        </button>
      </div>
    </div>
  </header>
);

export const ProgressBar: React.FC<{ currentStep: number; totalSteps: number }> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;
  return (
    <div className="w-full mb-12 mt-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-primary tracking-widest uppercase">
          Langkah {currentStep} dari {totalSteps}: Data Pribadi
        </span>
        <span className="text-xs font-bold text-teal-custom">{Math.round(progress)}% Lengkap</span>
      </div>
      <div className="h-2 w-full bg-[#f0f2f4] rounded-full overflow-hidden">
        <div 
          className="h-full bg-teal-custom rounded-full transition-all duration-500" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export const Hero: React.FC = () => (
  <section className="bg-white px-4 md:px-40 py-10">
    <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row-reverse gap-8 items-center">
      <div 
        className="w-full md:w-1/2 aspect-video bg-cover bg-center rounded-xl shadow-xl border border-gray-100"
        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBYZxgk_ATHZv0M8KVMk5kHK10gRdyaCekxnArhWSXifWxin3zjSxf2N4I_HA10hwuBSCzqYQZHm3SMPmZ9zKTj8pi1xN_F-sPpdIrjpgIrov7VaQTeDdNtBaBigdWR0icFYR-ZSvISw-yulFgqsjNsj_wCBkTFJ7a4fzWSBksn7cicEyFpJUKGTCX7Ivy_gJCAxvbGglDuQGynZMNdH_YADm6h37ggQxzo_J0HWPVAqb1qilRfHT98KTMXFBMnMDwCSIuB781zvi20")' }}
      />
      <div className="w-full md:w-1/2 flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="h-1 w-12 bg-gold-custom"></div>
            <span className="text-teal-custom font-bold text-xs uppercase tracking-widest">Pendaftaran Anggota Baru</span>
          </div>
          <h1 className="text-primary text-4xl md:text-5xl font-black leading-tight tracking-tight">
            Membangun Masa Depan Sejahtera Bersama Amanah Bangkit Bersama
          </h1>
          <p className="text-[#617589] text-sm md:text-lg border-l-4 border-gold-custom pl-4 italic leading-relaxed">
            Solusi terpercaya untuk layanan keanggotaan dan transformasi sertifikat tanah elektronik yang aman, transparan, dan profesional.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-teal-custom text-white font-bold px-8 h-12 rounded-lg hover:bg-teal-custom/90 transition-all shadow-md">
            Gabung Sekarang
          </button>
          <button className="border-2 border-primary text-primary font-bold px-8 h-12 rounded-lg hover:bg-primary/5 transition-all">
            Pelajari Layanan
          </button>
        </div>
      </div>
    </div>
  </section>
);

export const Features: React.FC = () => (
  <section className="bg-slate-50 px-4 md:px-40 py-20">
    <div className="max-w-[1200px] mx-auto">
      <div className="text-center md:text-left mb-12">
        <h2 className="text-primary text-3xl md:text-4xl font-black mb-4">Keunggulan Menjadi Anggota</h2>
        <p className="text-[#617589] text-base max-w-[720px]">
          Bergabunglah dengan komunitas Amanah Bangkit Bersama yang berfokus pada pertumbuhan ekonomi bersama dan pengelolaan aset yang aman.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: 'trending_up', title: 'Pertumbuhan Finansial', desc: 'Dapatkan bagi hasil yang kompetitif dan akses ke produk keuangan eksklusif anggota.', color: 'bg-teal-custom' },
          { icon: 'verified_user', title: 'Tata Kelola Transparan', desc: 'Setiap keputusan diambil untuk kepentingan bersama dengan sistem pelaporan terbuka.', color: 'bg-primary' },
          { icon: 'gavel', title: 'Kepastian Hukum', desc: 'Legalitas yang kuat memberikan perlindungan hukum bagi seluruh dana dan aset anggota.', color: 'bg-gold-custom' },
        ].map((feat, i) => (
          <div key={i} className="bg-white p-8 rounded-xl border border-gray-200 hover:border-gold-custom transition-all hover:shadow-lg group">
            <div className={`${feat.color} text-white p-3 w-fit rounded-lg mb-4 group-hover:scale-110 transition-transform`}>
              <span className="material-symbols-outlined text-3xl">{feat.icon}</span>
            </div>
            <h3 className="text-primary text-xl font-bold mb-2">{feat.title}</h3>
            <p className="text-[#617589] text-sm leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const Services: React.FC = () => (
  <section className="bg-white px-4 md:px-40 py-20">
    <div className="max-w-[1200px] mx-auto">
      <div className="flex flex-col gap-4 mb-12">
        <div className="flex items-center gap-2 text-gold-custom font-bold text-sm tracking-wider uppercase">
          <span className="material-symbols-outlined text-xl">description</span>
          Layanan Unggulan
        </div>
        <h2 className="text-primary text-3xl md:text-4xl font-black">
          Transformasi Digital Aset Tanah Anda
        </h2>
        <p className="text-[#617589] text-lg max-w-[720px]">
          Kami memfasilitasi proses alih media dari Sertifikat Tanah Fisik menjadi Sertifikat Elektronik secara aman.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {[
          { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0Q3mFqbx4wq5bXxn99emJwK5P1x8BQUXPS8WqdifgZF4AbrwCo1wt-wq9zkrAwjHWsulDKb7nxpRdZkpFOdNJ_jvK65IPuSqIScgjOkg2dnrS3Opv056Muttm20233ppRdUafcOIsva1dzQAIIaxjbc7FhPhs1iHlDkl_dQOszKTSQRmFaYWh2ChrZhHmgnwfFr6tE5LuIWvjhtSQTX988s_qRx7UKcxSKsLfP4khfXUCqcv7-cjzkqgnF61YVfclVSlg6C_nagA7', title: 'Pengajuan Mudah', desc: 'Konsultasikan dokumen Anda dan unggah berkas fisik secara aman.', color: 'border-teal-custom', step: 1 },
          { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEPHfs4CBDmbthg11LQomnGjHEWF9bxRy7-1oIy4E7gdFfU6CikWmRGol9myd1CPdfcy_PZmsgfSfEMnaVN_VIVoeN9CXVoZj15VglcVZeDM9EdpJCbFZdJmhqnNBjJ8VfK0GDqsmGl8sSnW0FHHOKwnNmrczBAe2VGhZQYd7xUEPoq2x8TlFA2rBMT2Yt1DNgV315M_pexc0xU_4MkWy9htvs0CgS8SiwXXaOzpr3eniIObVEiTyvKG22fAEJ95vxU2_2dBP6QsDD', title: 'Verifikasi & Validasi', desc: 'Tim legal kami melakukan validasi keabsahan data sebelum diajukan.', color: 'border-primary', step: 2 },
          { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_8MKDww8LHtF51u8plQOrD_JF8jl6ddablP-8VfJ6qApJI2QlTPPgwvEVfjKJv94tFs6tV6ELYyogb8BO5hU2cICSp7gWmvvpQTcVyDnXlQPK5OvyK3_zXt6hmsOgptbD2hjHxcYKQNEVWge8iaLMLPEAIpmTPSs6Rnp2BjKTyhfzbohQROxn-OSGPZ-UBxCht6Ll_v-8iy_wJVljJF7Oe9KnOsLwwkm9E1GLrL0QeGqPJ1i7wi2jPslTRSHH8tsmIge42Rf-xEIh', title: 'Penerbitan Elektronik', desc: 'Terima sertifikat elektronik yang terintegrasi secara nasional.', color: 'border-gold-custom', step: 3 },
        ].map((item, i) => (
          <div key={i} className="flex flex-col gap-4 group">
            <div className={`w-full aspect-[16/10] bg-cover bg-center rounded-xl overflow-hidden shadow-sm group-hover:shadow-md transition-all border-b-4 ${item.color}`} style={{ backgroundImage: `url(${item.img})` }} />
            <div className="pt-2">
              <div className="flex items-center gap-2 mb-1">
                <span className={`flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-bold ${item.color.replace('border-', 'bg-')}`}>{item.step}</span>
                <p className="text-primary text-lg font-bold">{item.title}</p>
              </div>
              <p className="text-[#617589] text-sm">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-primary/5 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-l-8 border-gold-custom">
        <div>
          <h4 className="text-xl font-bold text-primary mb-2">Ingin berkonsultasi mengenai aset Anda?</h4>
          <p className="text-[#617589]">Tim spesialis Amanah Bangkit Bersama siap membantu proses sertifikasi Anda.</p>
        </div>
        <button className="bg-teal-custom hover:bg-teal-custom/90 text-white font-bold py-3 px-8 rounded-lg transition-all flex items-center gap-2 shadow-md whitespace-nowrap">
          <span className="material-symbols-outlined">support_agent</span>
          Hubungi Konsultan
        </button>
      </div>
    </div>
  </section>
);

export const CTASection: React.FC = () => (
  <section className="bg-slate-50 px-4 md:px-40 py-24 text-center">
    <div className="max-w-[960px] mx-auto flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-black text-primary mb-6">Siap Menjadi Bagian dari Pertumbuhan Kami?</h2>
      <p className="text-lg text-[#617589] mb-10 max-w-2xl">
        Mari bangkit bersama Koperasi Jasa Amanah Bangkit Bersama. Keamanan aset dan pertumbuhan finansial Anda adalah prioritas kami.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
        <button className="bg-primary text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-primary/90 hover:shadow-xl transition-all">
          Daftar Anggota Sekarang
        </button>
        <button className="bg-white border-2 border-gold-custom text-primary px-10 py-4 rounded-xl font-bold text-lg hover:bg-gold-custom/5 transition-all">
          Unduh Profil Koperasi
        </button>
      </div>
    </div>
  </section>
);

export const Footer: React.FC = () => (
  <footer className="bg-white border-t border-[#f0f2f4] px-10 md:px-40 py-12">
    <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1">
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-teal-custom text-3xl">account_balance</span>
          <span className="text-xl font-bold text-primary">Amanah Bangkit Bersama</span>
        </div>
        <p className="text-[#617589] text-sm leading-relaxed">
          Koperasi Jasa Amanah Bangkit Bersama berdedikasi untuk memberikan layanan prima dalam manajemen aset dan kesejahteraan anggota.
        </p>
      </div>
      <div>
        <h4 className="font-bold text-primary mb-4">Layanan</h4>
        <ul className="space-y-2 text-sm text-[#617589]">
          <li><a className="hover:text-teal-custom" href="#">Keanggotaan Koperasi</a></li>
          <li><a className="hover:text-teal-custom" href="#">Sertifikat Elektronik</a></li>
          <li><a className="hover:text-teal-custom" href="#">Manajemen Aset</a></li>
          <li><a className="hover:text-teal-custom" href="#">Simpan Pinjam Jasa</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-primary mb-4">Bantuan</h4>
        <ul className="space-y-2 text-sm text-[#617589]">
          <li><a className="hover:text-teal-custom" href="#">Pusat Bantuan</a></li>
          <li><a className="hover:text-teal-custom" href="#">Panduan Pendaftaran</a></li>
          <li><a className="hover:text-teal-custom" href="#">Ketentuan Layanan</a></li>
          <li><a className="hover:text-teal-custom" href="#">Kebijakan Privasi</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-primary mb-4">Kontak Kami</h4>
        <ul className="space-y-3 text-sm text-[#617589]">
          <li className="flex items-start gap-2">
            <span className="material-symbols-outlined text-sm text-teal-custom">location_on</span>
            <span>Jakarta Selatan, DKI Jakarta, Indonesia</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm text-teal-custom">mail</span>
            <span>info@koperasiamanah.id</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm text-teal-custom">phone</span>
            <span>+62 21 1234 5678</span>
          </li>
        </ul>
      </div>
    </div>
    <div className="max-w-[1200px] mx-auto mt-12 pt-8 border-t border-[#f0f2f4] flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-[#617589] text-xs">
        © 2024 Koperasi Jasa Amanah Bangkit Bersama. Seluruh hak cipta dilindungi undang-undang.
      </p>
      <div className="flex gap-4">
        <a className="text-[#617589] hover:text-teal-custom transition-colors" href="#"><span className="material-symbols-outlined">public</span></a>
        <a className="text-[#617589] hover:text-teal-custom transition-colors" href="#"><span className="material-symbols-outlined">group</span></a>
        <a className="text-[#617589] hover:text-teal-custom transition-colors" href="#"><span className="material-symbols-outlined">share</span></a>
      </div>
    </div>
  </footer>
);
