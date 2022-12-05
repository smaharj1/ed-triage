import { Response, Request } from 'express';
import { sendSuccess } from '@helpers';
import { BedModel, Patient } from '@models';
import { PatientStatus } from '@models/types';
import { calculateMax, calculatePriority } from 'services/algo';

export const addPatient = async (req: Request, res: Response) => {
  const patientBody = req.body ?? undefined;
  const bed = await BedModel.find({ occupied: false });

  if (!patientBody?.status) {
    // This is when this is a new patient.

    const priority = await calculatePriority(patientBody);
    patientBody['priority'] = priority;

    // Check if beds are available and add the patient to Bed as well. If not, add to queue.
    if (bed.length > 0) {
      // Get current patient queue
      const queue = await Patient.find({ status: PatientStatus.QUEUE });
      const highestPriorityInQueue = calculateMax(queue, 'priority');

      // If queue is empty OR the priority of the new patient is higher than the highest priority in queue, add to bed.
      if (queue.length === 0 || priority > highestPriorityInQueue) {
        patientBody['status'] = PatientStatus.TREATMENT;
        patientBody['bed'] = bed[0]._id;
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

  // Add the patient to bed as well.
  if (savedPatient.status === PatientStatus.TREATMENT) {
    bed[0].occupied = true;
    bed[0].patient = savedPatient._id;
    await bed[0].save();
  }

  return sendSuccess(res, savedPatient);
};

export const getPatients = async (req: Request, res: Response) => {
  const { status = '', priority } = req.query;
  const patients = await Patient.find({
    ...(status && { status: (status as string)?.toUpperCase() }),
    ...(priority && { priority: { $lte: priority } }),
  })
    .sort({ priority: -1, createdAt: -1 })
    .populate('bed');

  return sendSuccess(res, patients);
};

export const getPatientById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const patient = await Patient.findOne({ _id: id });

  return sendSuccess(res, patient);
};

export const dischargePatient = async (req: Request, res: Response) => {
  const { id } = req.params;
  const patient = await Patient.findOneAndUpdate(
    { _id: id },
    { status: PatientStatus.DISCHARGED, bedEnd: new Date() },
    { new: true }
  );

  // Once the patient is discharged, free up the bed.
  await BedModel.findOneAndUpdate(
    { _id: patient?.bed },
    { occupied: false, patient: null, occupiedAt: null },
    { new: true }
  );

  return sendSuccess(res, patient);
};
