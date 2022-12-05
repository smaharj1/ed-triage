import { sendFailure, sendSuccess } from '@helpers';
import { Response, Request } from 'express';
import { BedModel, Patient } from '@models';

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

export const addPatientToBed = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { patient } = req.body;

  if (!id || !patient) {
    return sendFailure(res, {
      status: 400,
      message: 'Bed id and patient id are required',
    });
  }

  const bed = await BedModel.findByIdAndUpdate(
    { _id: id },
    { patient, occupied: true, occupiedAt: new Date() },
    { new: true }
  );

  await Patient.findByIdAndUpdate(
    { _id: patient },
    { bed: bed?._id, status: 'TREATMENT', bedStart: new Date() },
    { new: true }
  );

  return sendSuccess(res, bed);
};
