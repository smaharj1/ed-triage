import { model, Schema } from 'mongoose';
import { IStaff } from './types/staff.types';

const StaffSchema = new Schema<IStaff>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
  shiftStatus: {
    type: String,
    required: true,
  },
});

export const StaffModel = model('staff', StaffSchema);
