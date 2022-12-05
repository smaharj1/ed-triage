import { Document } from 'mongoose';
import { IBed } from './bed.types';

export enum PatientStatus {
  QUEUE = 'QUEUE',
  TREATMENT = 'TREATMENT',
  DISCHARGED = 'DISCHARGED',
}
export interface IPatient extends Document {
  pid: string;
  priority: number;
  firstName: string;
  lastName: string;
  gender: string;
  conditionAcute: boolean;
  activeMedication: number;
  height: number;
  weight: number;
  injuries: number;
  notes: string;
  preexistingConditions: number;
  status: PatientStatus;
  bed: IBed;
  bedStart: Date;
  bedEnd: Date;
}
