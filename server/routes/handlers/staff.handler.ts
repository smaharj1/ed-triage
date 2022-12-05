import { sendSuccess } from '@helpers';
import { StaffModel } from '@models';
import { Request, Response } from 'express';

export const getStaffs = async (req: Request, res: Response) => {
  const { status } = req.query;

  const staffs = await StaffModel.find({
    ...(status && { shiftStatus: (status as string)?.toUpperCase() }),
  });

  return sendSuccess(res, staffs);
};
