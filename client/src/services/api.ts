import axios from "axios";
import { ShiftStatus, StaffResponse } from "../types";
import { transformPatientAdd } from "./transform";
const { VITE_ENVIRONMENT = "dev" } = import.meta.env;
const BASE_URL =
  VITE_ENVIRONMENT === "dev" ? "http://localhost:3001/api" : "/api";

export const getStaffs = async (status: string = "") => {
  try {
    const { data } = await axios.get(`${BASE_URL}/staffs?status=${status}`);
    return data;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const staffClockInOut = async (staff: StaffResponse) => {
  const staffId = staff._id;
  let status = "";

  // Toggle the values between working staff going home/home coming to ER.
  if (staff.shiftStatus === ShiftStatus.WORKING) {
    status = ShiftStatus.ONCALL;
  } else {
    status = ShiftStatus.WORKING;
  }
  try {
    const { data } = await axios.put(`${BASE_URL}/staffs/${staffId}/clock`, {
      shiftStatus: status,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const getPatientsInQueue = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/patients?status=QUEUE`);

    return data;
  } catch (error) {
    console.log(error);
  }

  return null;
};

export const getBeds = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/beds`);
    return data;
  } catch (error) {
    console.log(error);
  }

  return null;
};

export const putPatientToBed = async (patientId: string, bedId: string) => {
  try {
    const { data } = await axios.put(`${BASE_URL}/beds/addPatient/${bedId}`, {
      patient: patientId,
    });
    return data;
  } catch (error) {
    console.log(error);
  }

  return null;
};

export const dischargePatientFromER = async (patientId: string) => {
  try {
    const { data } = await axios.put(
      `${BASE_URL}/patients/discharge/${patientId}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }

  return null;
};

export const addPatientToDB = async (patient: any) => {
  const payload = transformPatientAdd(patient);

  try {
    const response = await axios.post(`${BASE_URL}/patients`, payload);

    return response.data;
  } catch (error) {
    console.log(error);
  }

  return null;
};

export const getAllPatients = async (filter?: Record<string, unknown>) => {
  try {
    const response = await axios.get(`${BASE_URL}/patients`, {
      ...(filter && { params: filter }),
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }

  return null;
};

export const getAllStaffs = async (filter?: Record<string, unknown>) => {
  try {
    const response = await axios.get(`${BASE_URL}/staffs`, {
      ...(filter && { params: filter }),
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }

  return null;
};
