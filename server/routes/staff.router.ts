import { catchAsync } from '@helpers';
import express from 'express';
import { getStaffs } from './handlers/staff.handler';

const router = express.Router();

router.get('/', catchAsync(getStaffs));

export default router;
