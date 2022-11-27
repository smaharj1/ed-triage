import { catchAsync } from '@helpers';
import express from 'express';
import { addPatient } from './handlers/patient.handler';

export const router = express.Router();

router.get('/health', (req, res) => {
  console.log('Health Check: GREEN');
  res.send('Health Good');
});

router.route('/patients').post(catchAsync(addPatient));
