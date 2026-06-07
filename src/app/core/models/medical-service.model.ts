export interface MedicalService {
  id: string;
  name: string;
  department: string;
  description: string;
  price: number;
  durationMinutes: number;
  isActive: boolean;
}

export type CreateMedicalServiceDto = Omit<MedicalService, 'id'>;
export type UpdateMedicalServiceDto = Partial<CreateMedicalServiceDto>;
