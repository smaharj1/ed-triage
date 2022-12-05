export const transformPatientAdd = (patient: any) => {
  const {
    activeMedication,
    conditionAcute,
    gender,
    height,
    id: pid,
    injuries,
    name,
    notes,
    preexistingConditions,
    weight,
  } = patient;

  const nameObj = name?.[0] ?? {};
  return {
    pid,
    firstName: nameObj.given?.[0] ?? "",
    lastName: nameObj.family ?? "",
    gender,
    conditionAcute,
    activeMedication,
    height,
    weight,
    injuries,
    notes,
    preexistingConditions,
  };
};
