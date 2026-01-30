
export interface FormData {
  nik: string;
  fullName: string;
  birthPlace: string;
  birthDate: string;
  gender: string;
  job: string;
  ktpPhoto: File | null;
  kkPhoto: File | null;
}

export enum Step {
  PERSONAL_INFO = 1,
  ADDRESS = 2,
  OCCUPATION = 3,
  REVIEW = 4
}
