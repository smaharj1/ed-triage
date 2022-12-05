import express from 'express';
import PatientRouter from './patient.router';
import BedRouter from './bed.router';
import StaffRouter from './staff.router';

export const router = express.Router();

router.get('/health', (req, res) => {
  console.log('Health Check: GREEN');
  res.send('Health Good');
});

router.use('/patients', PatientRouter);
router.use('/beds', BedRouter);
router.use('/staffs', StaffRouter);
