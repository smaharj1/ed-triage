import { sendFailure, sendSuccess } from '@helpers';
import { StaffModel } from '@models';
import { Request, Response } from 'express';

export const getStaffs = async (req: Request, res: Response) => {
  const { status } = req.query;

  const staffs = await StaffModel.find({
    ...(status && { shiftStatus: (status as string)?.toUpperCase() }),
  });

  return sendSuccess(res, staffs);
};

export const clockInOut = async (req: Request, res: Response) => {
  const { shiftStatus } = req.body;
  const { id } = req.params;

  if (!id || !shiftStatus) {
    return sendFailure(res, {
      status: 400,
      message: 'Staff id and shift status are required',
    });
  }

  const staff = await StaffModel.findByIdAndUpdate(
    { _id: id },
    { shiftStatus: shiftStatus.toUpperCase() },
    { new: true }
  );

  return sendSuccess(res, staff);
};
