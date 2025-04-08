import { EROLE } from "./enum";

export interface IUser  {
    full_name: string;
    role: EROLE;
}


export interface IStaffHospital  {
    id: string;
    full_name: string;
    email: string;
    role: string;
    clinical_specialties: string | undefined | null;
    paraclinical_specialties: string | undefined | null;
    status: string;
    start_at: Date;
}

export interface IPagination  {
    total: number;
    page: number;
    row: number;
}


export interface IRoom  {
    id: string;
    name_building: string;
    room_number: number;
    specialties: string | undefined | null;
    room_type: string;
}

export interface IMedicine  {
    id: string;
    name: string;
    origin: string;
    code: number;
    description: string;
    price: number;
}

export interface IResult  {
    data: any;
    message: string;
}

export interface IWorkDoctor  {
    id: string;
    work_time: string,
    room_number: number,
    name_building: string,
}
