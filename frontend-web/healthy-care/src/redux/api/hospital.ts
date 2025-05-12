import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPagination, IResult, IRoom, IStaffHospital, IWorkDoctor } from "../../type/api";
import { RootState } from "../store";
import { EROOM, ESPECIALTIES, ESTAFF, ESTATUS } from "../../type/enum";

export const hospitalApi = createApi({
    reducerPath: "hospitalApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_DOMAIN + `/hospital`,
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
        getListDoctor: builder.query<
            {
                data: IStaffHospital[],
                pagination: IPagination,
            },
            { page?: number; row?: number; search?: string, role?: ESTAFF, status?: ESTATUS, specialties?: ESPECIALTIES }
        >({
            query: ({ page, row, search, role, status, specialties }) => {
                const params = new URLSearchParams();
                if (page) params.append("page", page.toString());
                if (row) params.append("limit", row.toString());
                if (search) params.append("search", search);
                if (role) params.append("role", role);
                if (status) params.append("status", status);
                if (specialties) params.append("specialties", specialties);


                return `/doctor?${params.toString()}`;
            },

        }),

        inviteDoctor: builder.mutation<
            IResult,
            { email: string, start_at: Date }
        >({
            query: (payload) => ({
                url: "/doctor",
                method: "POST",
                body: payload,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            })
        }),

        getDetailDoctor: builder.query<
            IResult,
            { id: number }
        >({
            query: ({ id }) => ({
                url: `/doctor/${id}`, // Chèn `id` vào URL
                method: "GET",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
            }),
        }),

        getWorkCalenderDoctor: builder.query<
            {data: IWorkDoctor[] },
            { id: number, time?: string }
        >({
            query: ({ id, time }) => ({
                url: `/doctor/work/${id}?time=${time}`, // Chèn `id` vào URL
                method: "GET",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
            }),
        }),
        addWork: builder.mutation<
            IResult,
            { doctor_id: number; room_id: number ; body: any}
        >({
            query: ({ doctor_id, room_id, body }) => ({
                url: `/work/${doctor_id}/${room_id}`, // Chèn `id` vào URL
                method: "POST",
                body: body,
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
            }),
        }),


        getListRoom: builder.query<
            {
                data: IRoom[],
                pagination: IPagination,
            },
            { page?: number; row?: number; search?: string, type?: EROOM, specialties?: ESPECIALTIES }
        >({
            query: ({ page, row, search, type, specialties }) => {
                const params = new URLSearchParams();
                if (page) params.append("page", page.toString());
                if (row) params.append("limit", row.toString());
                if (search) params.append("search", search);
                if (type) params.append("type", type);
                if (specialties) params.append("specialties", specialties);


                return `/room?${params.toString()}`;
            },

        }),

        createRoom: builder.mutation<
            IResult,
            { name_building: string, room_number: string, room_type: string, specialties: string | null }
        >({
            query: (payload) => ({
                url: "/room",
                method: "POST",
                body: payload,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            })
        }),
        getDetailRoom: builder.query<
            IResult,
            { id: number }
        >({
            query: ({ id }) => ({
                url: `/room/${id}`, // Chèn `id` vào URL
                method: "GET",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
            }),
        }),

        getWorkCalenderRoom: builder.query<
            IResult,
            { id: number, time?: string }
        >({
            query: ({ id, time }) => ({
                url: `/room/work/${id}?time=${time}`, // Chèn `id` vào URL
                method: "GET",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
            }),
        }),

        deleteWork: builder.query<
            IResult,
            { id: number }
        >({
            query: ({ id }) => ({
                url: `/work/${id}`, // Chèn `id` vào URL
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
            }),
        }),
    }),
});

export const {
    useGetListDoctorQuery,
    useLazyGetListDoctorQuery,
    useGetDetailDoctorQuery,
    useLazyGetListRoomQuery,
    useGetListRoomQuery,
    useInviteDoctorMutation,
    useAddWorkMutation,
    useLazyGetWorkCalenderDoctorQuery,
    useCreateRoomMutation,
    useGetDetailRoomQuery,
    useLazyGetWorkCalenderRoomQuery,
    useLazyDeleteWorkQuery,
} = hospitalApi;
