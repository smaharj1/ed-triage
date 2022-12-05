import { catchAsync } from '@helpers';
import express from 'express';
import {
  addPatient,
  getPatients,
  getPatientById,
} from './handlers/patient.handler';

const router = express.Router();

router.post('/', catchAsync(addPatient));
router.get('/', catchAsync(getPatients));
router.get('/:id', catchAsync(getPatientById));

export default router;
