export interface Doctor {
  id: string;
  image: string;
  fullName: string;
  preferedName: string;
  email: string;
  phone: string;
  speciality: string;
  hospital: string;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateDoctorDto = Omit<Doctor, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateDoctorDto = Partial<CreateDoctorDto>;
