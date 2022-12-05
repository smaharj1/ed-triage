import { Patient } from '@models';
import { IPatient } from '@models/types';

export const calculatePriority = async (patient: IPatient): Promise<number> => {
  // Lets divide the priority into equal chunk of importance for each factors captured.
  /**
   * 1. Condition Acute (35%)
   * 2. Active Medication (10%)
   * 3. BMI (15%)
   * 5. Injuries (20%)
   * 6. Preexisting Conditions (20%)
   *
   * BAD IS HIGH and GOOD IS LOW
   * 1-3 is BAD
   * 4-7 is MODERATE
   * 8-10 is GOOD
   */

  const allpatients = await Patient.find({ status: 'QUEUE' });

  const MED_MIN = 0;
  const MED_MAX = calculateMax(allpatients, 'activeMedication');

  const INJURIES_MIN = 0;
  const INJURIES_MAX = calculateMax(allpatients, 'injuries');

  const PREX_MIN = 0;
  const PREX_MAX = calculateMax(allpatients, 'preexistingConditions');
  // Calculate BMI
  const height = cmToMeter(patient.height);
  const bmi = lbsToKg(patient.weight) / (height * height);

  let bmiScale = 0;
  if (bmi < 18.5) {
    bmiScale = 5;
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    bmiScale = 2;
  } else if (bmi >= 25 && bmi <= 29.9) {
    bmiScale = 5;
  } else if (bmi >= 30) {
    bmiScale = 10;
  }

  bmiScale = (bmiScale / 10) * 15;

  const acuteScale = (patient.conditionAcute ? 1 : 0) * 35;
  const activeMedicationScale =
    normalizeValue(patient.activeMedication, MED_MIN, MED_MAX) * 10;
  const injuriesScale =
    normalizeValue(patient.injuries, INJURIES_MIN, INJURIES_MAX) * 20;
  const preexistingConditionsScale =
    normalizeValue(patient.preexistingConditions, PREX_MIN, PREX_MAX) * 20;

  const priority: number =
    bmiScale +
    acuteScale +
    activeMedicationScale +
    injuriesScale +
    preexistingConditionsScale;

  return Math.round(priority / 10.0);
};

const lbsToKg = (lbs: number) => {
  return lbs * 0.453592;
};

const cmToMeter = (cm: number) => {
  const meter = cm / 100;
  return meter;
};

export const calculateMax = (arr: any[], key: string) => {
  const max = Math.max(...arr.map(o => o[key]));
  return max;
};

export const calculateMin = (arr: any[], key: string) => {
  const min = Math.min(...arr.map(o => o[key]));
  return min;
};

const normalizeValue = (value: number, min: number, max: number) => {
  let maxV = max === min ? 1 : max;
  maxV = value > maxV ? value : maxV;
  return (value - min) / (maxV - min);
};
