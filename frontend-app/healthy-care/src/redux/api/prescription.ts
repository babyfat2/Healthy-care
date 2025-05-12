import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { IPresciption } from "../../type/api";


export const prescriptionApi = createApi({
    reducerPath: "prescriptionApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.EXPO_PUBLIC_API_URL + `patient/prescription`,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).user.token;
            // If we have a token, set it in the header
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["prescription"],
    endpoints: (builder) => ({
        getPrescription: builder.query<
            {
                data: IPresciption,
                message: string,
                statusCode: string;
            },
            { id: string }
        >({
            query: ({ id }) => `/${id}`
        }),
    }),
});

export const {
    useLazyGetPrescriptionQuery
} = prescriptionApi;
