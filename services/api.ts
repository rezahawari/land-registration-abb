import type { FormData } from '../types';

const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:3002/api';

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
    if (!formData.nik || !formData.name || !formData.birthDate || !formData.gender || !formData.password) {
      throw new Error('Data wajib tidak lengkap');
    }

    // Buat FormData untuk upload file
    const data = new FormData();
    
    // Tambahkan field text
    data.append('nik', formData.nik);
    data.append('name', formData.name);
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
