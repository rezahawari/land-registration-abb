
import React, { useState, useEffect } from 'react';
import { 
  getProvinsi, 
  getKotaByProvinsi, 
  getKecamatanByKota, 
  getKelurahanByKecamatan 
} from '../services/api';

interface FormSectionProps {
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

interface WilayahOption {
  id: string;
  text: string;
}

const FormSection: React.FC<FormSectionProps> = ({ formData, onChange }) => {
  const [provinsiList, setProvinsiList] = useState<WilayahOption[]>([]);
  const [kotaList, setKotaList] = useState<WilayahOption[]>([]);
  const [kecamatanList, setKecamatanList] = useState<WilayahOption[]>([]);
  const [kelurahanList, setKelurahanList] = useState<WilayahOption[]>([]);
  
  const [loadingProvinsi, setLoadingProvinsi] = useState(false);
  const [loadingKota, setLoadingKota] = useState(false);
  const [loadingKecamatan, setLoadingKecamatan] = useState(false);
  const [loadingKelurahan, setLoadingKelurahan] = useState(false);

  // Load Provinsi on component mount
  useEffect(() => {
    const loadProvinsi = async () => {
      setLoadingProvinsi(true);
      const data = await getProvinsi();
      setProvinsiList(data);
      setLoadingProvinsi(false);
    };
    loadProvinsi();
  }, []);

  // Load Kota when Provinsi changes
  useEffect(() => {
    if (formData.provinsi) {
      const loadKota = async () => {
        setLoadingKota(true);
        setKotaList([]);
        setKecamatanList([]);
        setKelurahanList([]);
        const data = await getKotaByProvinsi(formData.provinsi);
        setKotaList(data);
        setLoadingKota(false);
      };
      loadKota();
    }
  }, [formData.provinsi]);

  // Load Kecamatan when Kota changes
  useEffect(() => {
    if (formData.kota) {
      const loadKecamatan = async () => {
        setLoadingKecamatan(true);
        setKecamatanList([]);
        setKelurahanList([]);
        const data = await getKecamatanByKota(formData.kota);
        setKecamatanList(data);
        setLoadingKecamatan(false);
      };
      loadKecamatan();
    }
  }, [formData.kota]);

  // Load Kelurahan when Kecamatan changes
  useEffect(() => {
    if (formData.kecamatan) {
      const loadKelurahan = async () => {
        setLoadingKelurahan(true);
        setKelurahanList([]);
        const data = await getKelurahanByKecamatan(formData.kecamatan);
        setKelurahanList(data);
        setLoadingKelurahan(false);
      };
      loadKelurahan();
    }
  }, [formData.kecamatan]);

  return (
    <>
      {/* Wilayah Administrasi */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
        <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">location_on</span>
          Wilayah Administrasi
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold">Provinsi</span>
            <select 
              name="provinsi"
              value={formData.provinsi || ''}
              onChange={onChange}
              disabled={loadingProvinsi}
              className="form-input rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 py-3 px-4 focus:ring-primary focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">
                {loadingProvinsi ? 'Memuat...' : 'Pilih Provinsi'}
              </option>
              {provinsiList.map((prov) => (
                <option key={prov.id} value={prov.id}>
                  {prov.text}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold">Kota / Kabupaten</span>
            <select 
              name="kota"
              value={formData.kota || ''}
              onChange={onChange}
              disabled={!formData.provinsi || loadingKota}
              className="form-input rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 py-3 px-4 focus:ring-primary focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">
                {loadingKota ? 'Memuat...' : formData.provinsi ? 'Pilih Kota/Kabupaten' : 'Pilih Provinsi Terlebih Dahulu'}
              </option>
              {kotaList.map((kota) => (
                <option key={kota.id} value={kota.id}>
                  {kota.text}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold">Kecamatan</span>
            <select 
              name="kecamatan"
              value={formData.kecamatan || ''}
              onChange={onChange}
              disabled={!formData.kota || loadingKecamatan}
              className="form-input rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 py-3 px-4 focus:ring-primary focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">
                {loadingKecamatan ? 'Memuat...' : formData.kota ? 'Pilih Kecamatan' : 'Pilih Kota Terlebih Dahulu'}
              </option>
              {kecamatanList.map((kec) => (
                <option key={kec.id} value={kec.id}>
                  {kec.text}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold">Desa / Kelurahan</span>
            <select 
              name="desa"
              value={formData.desa || ''}
              onChange={onChange}
              disabled={!formData.kecamatan || loadingKelurahan}
              className="form-input rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 py-3 px-4 focus:ring-primary focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">
                {loadingKelurahan ? 'Memuat...' : formData.kecamatan ? 'Pilih Desa/Kelurahan' : 'Pilih Kecamatan Terlebih Dahulu'}
              </option>
              {kelurahanList.map((kel) => (
                <option key={kel.id} value={kel.id}>
                  {kel.text}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="flex flex-col gap-2 mt-4">
          <span className="text-sm font-semibold">Alamat Lengkap Lokasi Tanah</span>
          <textarea 
            name="alamat"
            value={formData.alamat || ''}
            onChange={onChange}
            className="form-input rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 py-3 px-4 focus:ring-primary focus:border-primary resize-none" 
            placeholder="Masukkan nama jalan, nomor, RT/RW..." 
            rows={3}
          ></textarea>
        </label>
      </div>

      {/* Detail Fisik */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
        <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">straighten</span>
          Detail Fisik
        </h3>
        <div className="flex flex-col gap-6">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold">Perkiraan Luas Tanah (m²)</span>
            <div className="relative">
              <input 
                name="luas"
                value={formData.luas || ''}
                onChange={onChange}
                className="form-input w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 py-3 px-4 focus:ring-primary focus:border-primary" 
                placeholder="Contoh: 150" 
                type="number"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">m²</span>
            </div>
          </label>
          <div>
            <span className="text-sm font-semibold block mb-3">Kondisi Tanah Saat Ini</span>
            <div className="grid grid-cols-2 gap-3">
              {['Tanah Kosong', 'Bangunan', 'Lahan Pertanian', 'Dalam Sengketa'].map((item) => (
                <label key={item} className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <input 
                    type="radio"
                    name="kondisi"
                    value={item}
                    checked={formData.kondisi === item}
                    onChange={onChange}
                    className="text-primary focus:ring-primary h-4 w-4" 
                  />
                  <span className="text-sm">{item}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormSection;
