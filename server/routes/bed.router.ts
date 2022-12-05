import { catchAsync } from '@helpers';
import express from 'express';
import { addBed, getBeds } from './handlers/bed.handler';
const router = express.Router();

router.post('/', catchAsync(addBed));
router.get('/', catchAsync(getBeds));

export default router;
