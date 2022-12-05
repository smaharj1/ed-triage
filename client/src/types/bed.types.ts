import { PatientResponse } from "./patient.types";

export interface BedResponse {
  bedNumber: number;
  _id: string;
  occupied: boolean;
  occupiedAt: string;
  patient: PatientResponse;
}

export interface BedRequest extends Omit<BedResponse, "patient"> {
  patient?: string;
}
