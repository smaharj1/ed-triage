import { IPatient } from './patient.types';

export interface IBed {
  patient: IPatient;
  occupied: boolean;
  occupiedAt: Date;
  bedNumber: number;
}
