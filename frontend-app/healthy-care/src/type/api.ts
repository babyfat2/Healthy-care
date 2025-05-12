export interface IUser  {
    full_name: string;
}


export interface IPagination  {
    total: number,
    page: number,
    row: number,
}

export interface IHospital {
    id: number;
    name: string;
    address: string;
    avatar: string | undefined | null;
    description: string | undefined;
    distance: string | undefined;
    email: string | undefined;
    phone: string | undefined;
    hospitalImage: IHospitalImage[] | undefined;
}

export interface IHospitalImage {
    id : number;
    image_uri: string;
    stt_image: number;
}

export interface IMedicine {
    id : number;
    name: string;
    code: string;
    origin: string; 
    description: string; 
    form: string;
    price: number 
}

export interface IPresciption {
    id : number;
    diagnosis: string;
    is_first: boolean;
    prescriptionMedicine: IMedicinePresciption[];
}

export interface IMedicinePresciption {
    id : number;
    amount: number;
    font: string;
    start_time: string;
    end_time: string;
    medicine: IMedicine;
    dose_quantity: number;
    timesPerDay: number;
    note: string;
    dosageSchedules: IDosageSchedules[];
}

export interface IDosageSchedules {
    id: number;
    time: string;
    date: string;
    is_taken: boolean;
}

export interface IMedical{
    id: string;
    appointment_time: string;
    status: string;
    hospital: IHospital;
}