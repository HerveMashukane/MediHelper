export interface Patient {
  id: string;
  preferedName: string;
  image: string;
  fullName: string;
  email: string;
  phone: string;
  department: string;
  age: string;
  bloodGroup: string;
  createdAt?: string;
  updatedAt?: string;
}

export type CreatePatientDto = Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdatePatientDto = Partial<CreatePatientDto>;
