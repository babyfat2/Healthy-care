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