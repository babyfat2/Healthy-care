import { IPatient } from "../../type/api";

export const isValidPatient = (patient: IPatient): boolean => {
  const requiredFields = [
    "citizen_identification_id",
    "full_name",
    "address",
    "hometown",
    "birthday",
    "ethnicity",
    "issued_date",
    "issued_place",
    "phone",
  ];

  for (const field of requiredFields) {
    const value = patient[field as keyof IPatient];
    if (value === null || value === "") {
      return false;
    }
  }

  return true;
};