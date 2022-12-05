import { model, Schema } from 'mongoose';
import { IBed } from './types/bed.types';

const BedSchema = new Schema<IBed>({
  patient: {
    type: Schema.Types.ObjectId,
    ref: 'patient',
  },
  bedNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  occupied: {
    type: Boolean,
    required: true,
  },
  occupiedAt: {
    type: Date,
  },
});

BedSchema.pre('save', async function (next) {
  if (this.occupied) {
    this.occupiedAt = new Date();
  }
  next();
});

export const BedModel = model<IBed>('bed', BedSchema);
