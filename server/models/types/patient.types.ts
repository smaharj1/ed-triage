import { Document } from 'mongoose';

enum Priority {
  Low = 'Low',
  LowMedium = 'Low-Medium',
  Medium = 'Medium',
  MediumHigh = 'Medium-High',
  High = 'High',
}
export interface IPatient extends Document {
  pid: string;
  priority: Priority;
  status: string;
}
