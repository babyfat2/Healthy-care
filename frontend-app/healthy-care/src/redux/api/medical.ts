import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { IHospital, IMedical, IPresciption} from "../../type/api";


export const medicalApi = createApi({
    reducerPath: "medicalApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.EXPO_PUBLIC_API_URL + `patient/medical`,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).user.token;
            // If we have a token, set it in the header
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["medical"],
    endpoints: (builder) => ({
        getMedical: builder.query<
            {
                data: IMedical[],
                message: string,
                statusCode: string;
            },
            null
        >({
            query: () => ``
        }),
        getMedicalDetail: builder.query<
        {
            data: {
                hospital: IHospital,
                prescription: IPresciption
            },
            message: string,
            statusCode: string;
        },
        {id: string}
    >({
        query: ({id}) => `/${id}`,
    }),
    }),
});

export const {
    useLazyGetMedicalQuery,
    useGetMedicalDetailQuery,
} = medicalApi;
