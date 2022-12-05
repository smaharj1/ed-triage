import axios from "axios";
import { ElLoading } from "element-plus";
import { BedsJson } from "../data/Beds";
import { OnCallJson } from "../data/OnCall";
import { PatientQueueJson } from "../data/PatientQueue";
import { transformPatientAdd } from "./transform";
const { VITE_ENVIRONMENT = "dev" } = import.meta.env;
const BASE_URL = VITE_ENVIRONMENT === "dev" ? "http://localhost:3001/api" : "";

export const getOnCallStaff = async () => {
  return OnCallJson;
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
