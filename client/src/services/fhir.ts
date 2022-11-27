import axios from "axios";
import { Bundle, Patient } from "fhir/r5";

const HAPI_BASE = "http://hapi.fhir.org/baseR4/Patient";
export const searchHapiFhir = async ({
  name = "",
  id = "",
}): Promise<Bundle<Patient>> => {
  const url = `${HAPI_BASE}?given=${name}&_id=${id}`;

  const { data }: { data: Bundle<Patient> } = await axios(url);

  return data;
};
