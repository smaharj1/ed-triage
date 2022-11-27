import axios from "axios";
import { BedsJson } from "../data/Beds";
import { OnCallJson } from "../data/OnCall";
import { PatientQueueJson } from "../data/PatientQueue";
const BASE_URL = "https://random-data-api.com/api/v2";

export const getOnCallStaff = async () => {
  // const response = await axios(`${BASE_URL}/users?size=10`);

  return OnCallJson;
};

export const getPatientsInQueue = async () => {
  return PatientQueueJson;
};

export const getBeds = async () => {
  return BedsJson;
};
