
export interface FormData {
  // Step 1: DASAR
  role: string;
  ownerName: string;
  relationship: string;
  
  // Step 2: LAHAN
  provinsi?: string;
  kota?: string;
  kecamatan?: string;
  desa?: string;
  alamat?: string;
  luas?: string;
  kondisi?: string;
  koordinat?: string;
  
  // Step 3: DOKUMENHAK
  jenisDocHak?: string;
  nomorDoc?: string;
  tahunTerbit?: string;
  riwayatPenguasaan?: string;
  
  // Step 4: DOKUMENPENDUKUNG
  ktp?: File | null;
  kk?: File | null;
  landDocument?: File | null;
  locationPhoto?: File | null;
  notes?: string;
  disclaimerAccepted?: boolean;
  
  // Step 5: LEGALITAS
  uploadedLegalFile?: File | null;
  
  // Registration fields (for compatibility)
  nik?: string;
  name?: string;
  email?: string;
  birthPlace?: string;
  birthDate?: string;
  gender?: string;
  job?: string;
  password?: string;
  ktpPhoto?: File | null;
  kkPhoto?: File | null;
}

export enum Step {
  PERSONAL_INFO = 1,
  ADDRESS = 2,
  OCCUPATION = 3,
  REVIEW = 4
}

export enum StepPengajuan {
  DASAR = 1,
  LAHAN = 2,
  DOKUMENHAK = 3,
  DOKUMENPENDUKUNG = 4,
  LEGALITAS = 5,
  REVIEW = 6
}