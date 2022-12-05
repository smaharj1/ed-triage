import { sendSuccess } from '@helpers';
import { Response, Request } from 'express';
import { BedModel } from '@models';

export const addBed = async (req: Request, res: Response) => {
  const bed = new BedModel(req.body);
  const savedBed = await bed.save();

  return sendSuccess(res, savedBed);
};

export const getBeds = async (req: Request, res: Response) => {
  const { occupiedOnly = false, emptyOnly = false } = req.query;
  const beds = await BedModel.find({
    ...(occupiedOnly == 'true' && { occupied: true }),
    ...(emptyOnly == 'true' && { occupied: false }),
  }).populate('patient');

  return sendSuccess(res, beds);
};
