import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IHospital, IPagination } from "../../type/api";
import { RootState } from "../store";


export const hospitalApi = createApi({
    reducerPath: "hospitalApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.EXPO_PUBLIC_API_URL + `patient/hospital`,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).user.token;
            // If we have a token, set it in the header
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["hospital"],
    endpoints: (builder) => ({
        getListHospital: builder.query<
            {
                data: IHospital[];
                pagination: IPagination;
            },
            { page?: number; row?: number; search?: string, latitude?: string, longitude?: string }
        >({
            query: ({ page, row, search, latitude, longitude }) => {
                const params = new URLSearchParams();
                if (page) params.append("page", page.toString());
                if (row) params.append("row", row.toString());
                if (search) params.append("search", search);
                if (latitude) params.append("latitude", latitude);
                if (longitude) params.append("longitude", longitude);


                return `?${params.toString()}`;
            },

        }),

        getDetailHospital: builder.query<
            {
                data: IHospital;
            },
            { id: number }
        >({
            query: ({ id }) => ({
                url: `/${id}`, // Chèn `id` vào URL
                method: "GET",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
            }),
        }),

        booking: builder.mutation<
            {
                data: any;
            },
            { hospital_id: number, description: string, appointment_time: Date }
        >({
            query: (payload) => ({
                url: "/booking",
                method: "POST",
                body: payload,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            })
        }),
    }),
});

export const {
    useLazyGetListHospitalQuery,
    useGetDetailHospitalQuery,
    useBookingMutation,
} = hospitalApi;
