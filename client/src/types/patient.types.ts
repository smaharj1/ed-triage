import { BedResponse } from "./bed.types";

export enum PatientStatus {
  QUEUE = "QUEUE",
  TREATMENT = "TREATMENT",
  DISCHARGED = "DISCHARGED",
}

export interface PatientResponse {
  _id: string;
  pid: string;
  priority: number;
  firstName: string;
  lastName: string;
  gender: string;
  conditionAcute: boolean;
  activeMedication: number;
  height: number;
  weight: number;
  injuries: number;
  notes: string;
  preexistingConditions: number;
  status: PatientStatus;
  bed: BedResponse;
  createdAt: string;
  updatedAt: string;
}
