import { catchAsync } from '@helpers';
import express from 'express';
import {
  addPatient,
  getPatients,
  getPatientById,
  dischargePatient,
} from './handlers/patient.handler';

const router = express.Router();

router.post('/', catchAsync(addPatient));
router.get('/', catchAsync(getPatients));
router.get('/:id', catchAsync(getPatientById));
router.put('/discharge/:id', catchAsync(dischargePatient));

export default router;
