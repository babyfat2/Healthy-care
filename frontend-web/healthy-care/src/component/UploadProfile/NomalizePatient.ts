import { IPatient } from "../../type/api";

export function normalizePatient(input: Partial<IPatient>): IPatient {
  return {
    id: input.id ?? 0,
    citizen_identification_id: input.citizen_identification_id ?? "",
    full_name: input.full_name ?? "",
    address: input.address ?? "",
    hometown: input.hometown ?? "",
    birthday: input.birthday ?? "",
    ethnicity: input.ethnicity ?? "",
    issued_date: input.issued_date ?? "",
    issued_place: input.issued_place ?? "",
    phone: input.phone ?? "",
  };
}