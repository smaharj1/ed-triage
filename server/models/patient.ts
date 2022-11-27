import { model, Schema } from 'mongoose';
import { IPatient } from './types';

const PatientSchema = new Schema<IPatient>({
  pid: {
    type: String,
    required: true,
    unique: true,
  },
  priority: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: false,
  },
});

export const Patient = model<IPatient>('patient', PatientSchema);
