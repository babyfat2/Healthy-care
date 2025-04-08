import { EROLE } from "src/global/globalEnum";

export type TPayloadJwt = { 
    id: number; 
    email: string;
    role: EROLE;
};

export interface IResAuth {
  accessToken: string;
  refreshToken: string;
}
