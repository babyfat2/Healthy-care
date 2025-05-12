import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IResult } from "../../type/api";
import { RootState } from "../store";


export const doctorApi = createApi({
    reducerPath: "doctorApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_DOMAIN + `/doctor`,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).user.token;
            // If we have a token, set it in the header
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["doctor"],
    endpoints: (builder) => ({
        getMyWork: builder.query<
            IResult,
            null
        >({
            query: () => `/work`,
            extraOptions: { maxRetries: 2 }
        }),
        getInforPrescription: builder.query<
            IResult,
            {id: string}
        >({
            query: ({id}) => `/prescription/${id}`,
            extraOptions: { maxRetries: 2 }
        })
    }),
});

export const {
    useGetMyWorkQuery,
    useGetInforPrescriptionQuery
} = doctorApi;
