import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAppointment, IPagination, IPatient} from "../../type/api";
import { RootState } from "../store";
import { ESTATUSAPOINTMENT } from "../../type/enum";


export const appointmentApi = createApi({
    reducerPath: "appointmentApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_DOMAIN + `/appointment`,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).user.token;
            // If we have a token, set it in the header
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["appointment"],
    endpoints: (builder) => ({
        getAppointment: builder.query<
            {
                data: IAppointment[];
                pagination: IPagination;
            },
            {page?: number; row?: number; search?: string, status?: ESTATUSAPOINTMENT, time?: string}
        >({
            query: ({ page, row, search, status, time }) => {
                const params = new URLSearchParams();
                if (page) params.append("page", page.toString());
                if (row) params.append("limit", row.toString());
                if (search) params.append("search", search);
                if (status) params.append("status", status);
                if (time) params.append("time", time);
                return `?${params.toString()}`;
            },
        }),
        changeStatusAppointment: builder.mutation<
            {
                message: string,
            },
            {
                appointment_id: number,
                status: ESTATUSAPOINTMENT,
            }
        >({
            query: (payload) => ({
                url: "",
                method: "POST",
                body: payload,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            })
        }),
        getDetailAppointment: builder.query<
            {
                data: {
                    appointment: IAppointment;
                    patient: IPatient;
                }
            },
            { id: number }
        >({
            query: ({id}) => `/${id}`
        }),
    }),
});

export const {
    useLazyGetAppointmentQuery,
    useChangeStatusAppointmentMutation,
    useGetDetailAppointmentQuery,
} = appointmentApi;
