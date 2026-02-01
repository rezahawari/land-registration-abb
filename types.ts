
export interface FormData {
  nik: string;
  name: string;
  email: string;
  birthPlace: string;
  birthDate: string;
  gender: string;
  job: string;
  password: string;
  ktpPhoto: File | null;
  kkPhoto: File | null;
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