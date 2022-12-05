enum ShiftStatus {
  WORKING = 'WORKING',
  ON_VACATION = 'ON_VACATION',
  ONCALL = 'ONCALL',
}

export interface IStaff {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  type: string;
  shiftStatus: ShiftStatus;
}
