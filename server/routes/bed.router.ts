import { catchAsync } from '@helpers';
import express from 'express';
import { addBed, getBeds, addPatientToBed } from './handlers/bed.handler';
const router = express.Router();

router.post('/', catchAsync(addBed));
router.get('/', catchAsync(getBeds));
router.put('/addPatient/:id', catchAsync(addPatientToBed));

export default router;
