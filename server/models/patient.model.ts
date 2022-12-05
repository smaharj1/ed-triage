import { model, Schema } from 'mongoose';
import { IPatient } from './types';

const PatientSchema = new Schema<IPatient>(
  {
    pid: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
    },
    conditionAcute: {
      type: Boolean,
      default: false,
    },
    activeMedication: {
      type: Number,
      default: 0,
    },
    height: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    injuries: {
      type: Number,
      default: 0,
    },
    notes: {
      type: String,
    },
    preexistingConditions: {
      type: Number,
      default: 0,
    },
    priority: {
      type: Number,
      required: false,
    },
    status: {
      type: String,
      required: true,
    },
    bed: {
      type: Schema.Types.ObjectId,
      ref: 'bed',
    },
    bedStart: {
      type: Date,
      required: false,
    },
    bedEnd: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Patient = model<IPatient>('patient', PatientSchema);
