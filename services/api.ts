import type { FormData } from '../types';

const API_BASE_URL = process.env.VITE_API_BASE_URL || 'https://api-abb.exium.my.id/api';
const WILAYAH_API_BASE = 'https://alamat.thecloudalert.com/api/';

// ===== WILAYAH API =====
interface WilayahItem {
  id: string;
  text: string;
}

interface WilayahResponse {
  status: number;
  message: string;
  result: WilayahItem[];
}

export const getProvinsi = async (): Promise<WilayahItem[]> => {
  try {
    const response = await fetch(`${WILAYAH_API_BASE}provinsi/get/`);
    if (!response.ok) throw new Error('Failed to fetch provinces');
    const data: WilayahResponse = await response.json();
    return data.result || [];
  } catch (error) {
    console.error('Error fetching provinces:', error);
    return [];
  }
};

export const getKotaByProvinsi = async (provinsiId: string): Promise<WilayahItem[]> => {
  try {
    const response = await fetch(`${WILAYAH_API_BASE}kabkota/get/?d_provinsi_id=${provinsiId}`);
    if (!response.ok) throw new Error('Failed to fetch cities');
    const data: WilayahResponse = await response.json();
    return data.result || [];
  } catch (error) {
    console.error('Error fetching cities:', error);
    return [];
  }
};

export const getKecamatanByKota = async (kotaId: string): Promise<WilayahItem[]> => {
  try {
    const response = await fetch(`${WILAYAH_API_BASE}kecamatan/get/?d_kabkota_id=${kotaId}`);
    if (!response.ok) throw new Error('Failed to fetch districts');
    const data: WilayahResponse = await response.json();
    return data.result || [];
  } catch (error) {
    console.error('Error fetching districts:', error);
    return [];
  }
};

export const getKelurahanByKecamatan = async (kecamatanId: string): Promise<WilayahItem[]> => {
  try {
    const response = await fetch(`${WILAYAH_API_BASE}kelurahan/get/?d_kecamatan_id=${kecamatanId}`);
    if (!response.ok) throw new Error('Failed to fetch villages');
    const data: WilayahResponse = await response.json();
    return data.result || [];
  } catch (error) {
    console.error('Error fetching villages:', error);
    return [];
  }
};

// ===== REGISTRATION API =====

export interface RegistrationResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    [key: string]: any;
  };
}

export const submitRegistration = async (formData: FormData): Promise<RegistrationResponse> => {
  try {
    // Validasi data wajib
    if (!formData.nik || !formData.name || !formData.email || !formData.birthDate || !formData.gender || !formData.password) {
      throw new Error('Data wajib tidak lengkap');
    }

    // Buat FormData untuk upload file
    const data = new FormData();
    
    // Tambahkan field text
    data.append('nik', formData.nik);
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('birthPlace', formData.birthPlace || '');
    data.append('birthDate', formData.birthDate);
    data.append('gender', formData.gender);
    data.append('job', formData.job || '');
    data.append('password', formData.password);

    // Tambahkan file jika ada
    if (formData.ktpPhoto) {
      data.append('ktpPhoto', formData.ktpPhoto);
    }
    if (formData.kkPhoto) {
      data.append('kkPhoto', formData.kkPhoto);
    }

    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      body: data,
      headers: {
        'Accept': 'application/json',
        // Jangan set Content-Type, browser akan set otomatis dengan boundary
      },
    });

    const responseData: RegistrationResponse = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Gagal mengirim data pendaftaran');
    }

    return responseData;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error: ${error.message}`);
    }
    throw new Error('Terjadi kesalahan saat mengirim data');
  }
};

// Alternatif API call tanpa file (jika backend tidak perlu file)
export const submitRegistrationJSON = async (formData: Omit<FormData, 'ktpPhoto' | 'kkPhoto'>): Promise<RegistrationResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/registrations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const responseData: RegistrationResponse = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Gagal mengirim data pendaftaran');
    }

    return responseData;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error: ${error.message}`);
    }
    throw new Error('Terjadi kesalahan saat mengirim data');
  }
};

// ===== PENGAJUAN API =====
export interface PengajuanResponse {
  success: boolean;
  message: string;
  data?: any;
}

// list items returned by GET /pengajuan
export interface PengajuanItem {
  id: string;
  status: string;
  createdAt: string;
  reference_number?: string;
  role?: string;
  ownerName?: string;
}

export const getPengajuanList = async (): Promise<PengajuanItem[]> => {
  try {
    const token = localStorage.getItem('authToken');
    const headers: HeadersInit = { Accept: 'application/json' };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/pengajuan`, {
      method: 'GET',
      headers,
    });

    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.message || 'Gagal mengambil daftar pengajuan');
    }

    // assume backend returns { success: true, data: [...] }
    return json.data || [];
  } catch (err) {
    console.error('getPengajuanList error', err);
    throw err;
  }
};

export const submitPengajuan = async (formData: FormData): Promise<PengajuanResponse> => {
  try {
    // Validasi data wajib
    if (!formData.role || !formData.ownerName) {
      throw new Error('Data wajib (role, ownerName) tidak lengkap');
    }

    // Buat FormData untuk upload file dan text
    const data = new FormData();

    // Step 1: DASAR
    data.append('role', formData.role || '');
    data.append('ownerName', formData.ownerName || '');
    if (formData.relationship) {
      data.append('relationship', formData.relationship);
    }

    // Step 2: LAHAN
    if (formData.provinsi) data.append('provinsi', formData.provinsi);
    if (formData.kota) data.append('kota', formData.kota);
    if (formData.kecamatan) data.append('kecamatan', formData.kecamatan);
    if (formData.desa) data.append('desa', formData.desa);
    if (formData.alamat) data.append('alamat', formData.alamat);
    if (formData.luas) data.append('luas', formData.luas);
    if (formData.kondisi) data.append('kondisi', formData.kondisi);
    if (formData.koordinat) data.append('koordinat', formData.koordinat);

    // Step 3: DOKUMEN HAK
    if (formData.jenisDocHak) data.append('jenisDocHak', formData.jenisDocHak);
    if (formData.nomorDoc) data.append('nomorDoc', formData.nomorDoc);
    if (formData.tahunTerbit) data.append('tahunTerbit', formData.tahunTerbit);
    if (formData.riwayatPenguasaan) data.append('riwayatPenguasaan', formData.riwayatPenguasaan);

    // Step 4: DOKUMEN PENDUKUNG (Files)
    if (formData.ktp instanceof File) {
      data.append('ktp', formData.ktp);
    }
    if (formData.kk instanceof File) {
      data.append('kk', formData.kk);
    }
    if (formData.landDocument instanceof File) {
      data.append('landDocument', formData.landDocument);
    }
    if (formData.locationPhoto instanceof File) {
      data.append('locationPhoto', formData.locationPhoto);
    }
    if (formData.notes) data.append('notes', formData.notes);
    if (formData.disclaimerAccepted) data.append('disclaimerAccepted', 'true');

    // Step 5: LEGALITAS
    if (formData.uploadedLegalFile instanceof File) {
      data.append('uploadedLegalFile', formData.uploadedLegalFile);
    }

    // Get token from localStorage if available
    const token = localStorage.getItem('authToken');
    
    const headers: HeadersInit = {
      'Accept': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/pengajuan/store`, {
      method: 'POST',
      body: data,
      headers,
    });

    const json = await response.json();
    
    if (!response.ok) {
      throw new Error(json.message || `Gagal submit pengajuan (Status: ${response.status})`);
    }
    
    return { 
      success: true, 
      message: json.message || 'Pengajuan berhasil dikirim', 
      data: json.data 
    };
  } catch (err) {
    console.error('submitPengajuan error', err);
    if (err instanceof Error) {
      throw new Error(`Error: ${err.message}`);
    }
    throw new Error('Terjadi kesalahan saat mengirim pengajuan');
  }
};
