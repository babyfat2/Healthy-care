import { createApi, fetchBaseQuery  } from "@reduxjs/toolkit/query/react";
import { IPatient, IResult } from "../../type/api";
import { RootState } from "../store";


export const receptionApi = createApi({
    reducerPath: "receptionApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_DOMAIN + `/reception`,
        prepareHeaders: (headers, { getState }) => {
                    const token = (getState() as RootState).user.token;
                    // If we have a token, set it in the header
                    if (token) {
                        headers.set("Authorization", `Bearer ${token}`);
                    }
                    return headers;
                },
    }),
    tagTypes: ["reception"],
    endpoints: (builder) => ({
        confirmProfile: builder.mutation<
        IResult,
        { patient: IPatient, appointment_id?: string, user_id?: string, room_id: string, appointment_description: string }
    >({
        query: (payload) => ({
            url: "/confirmProfile",
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
    useConfirmProfileMutation,
} = receptionApi;
