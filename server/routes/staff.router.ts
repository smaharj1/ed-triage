import { catchAsync } from '@helpers';
import express from 'express';
import { getStaffs, clockInOut } from './handlers/staff.handler';

const router = express.Router();

router.get('/', catchAsync(getStaffs));
router.put('/:id/clock', catchAsync(clockInOut));

export default router;
