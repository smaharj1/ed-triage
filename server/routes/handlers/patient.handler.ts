import { Response, Request } from 'express';
import { sendSuccess } from '@helpers';
import { BedModel, Patient } from '@models';
import { IPatient, PatientStatus } from '@models/types';
import { calculateMin, calculatePriority } from 'services/algo';

export const addPatient = async (req: Request, res: Response) => {
  const patientBody = req.body ?? undefined;

  if (!patientBody?.status) {
    // This is when this is a new patient.

    const priority = await calculatePriority(patientBody);
    patientBody['priority'] = priority;

    // Check if beds are available and add the patient to Bed as well. If not, add to queue.
    const bed = await BedModel.find({ occupied: false });
    if (bed.length > 0) {
      // Get current patient queue
      const queue = await Patient.find({ status: PatientStatus.QUEUE });
      const highestPriorityInQueue = calculateMin(queue, 'priority');

      // If queue is empty OR the priority of the new patient is higher than the highest priority in queue, add to bed.
      if (queue.length === 0 || priority < highestPriorityInQueue) {
        patientBody['status'] = PatientStatus.TREATMENT;
        patientBody['bed'] = bed[0]._id;
        bed[0].occupied = true;
        await bed[0].save();
      } else {
        console.log(
          `Adding to the queue because there are patients with higher priority in queue.`
        );
        patientBody['status'] = PatientStatus.QUEUE;
      }
    } else {
      patientBody['status'] = PatientStatus.QUEUE;
    }
  }

  const patient = new Patient(patientBody);
  const savedPatient = await (await patient.save()).populate('bed');

  return sendSuccess(res, savedPatient);
};

export const getPatients = async (req: Request, res: Response) => {
  const { status = '', priority } = req.query;
  const patients = await Patient.find({
    ...(status && { status: (status as string)?.toUpperCase() }),
    ...(priority && { priority: { $lte: priority } }),
  }).sort({ priority: 1, createdAt: -1 });

  return sendSuccess(res, patients);
};

export const getPatientById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const patient = await Patient.findOne({ _id: id });

  const pri = await calculatePriority(patient as IPatient);
  console.log('Priority', pri);

  return sendSuccess(res, patient);
};
