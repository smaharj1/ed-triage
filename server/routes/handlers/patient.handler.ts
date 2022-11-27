import { Response, Request } from 'express';
import { sendSuccess } from '@helpers';
import { Patient } from '@models';

export const addPatient = async (req: Request, res: Response) => {
  const patientBody = req.body ?? undefined;

  const patient = new Patient(patientBody);
  const savedPatient = await patient.save();

  console.log(`DB Response: ${savedPatient}`);

  return sendSuccess(res, savedPatient);
};
