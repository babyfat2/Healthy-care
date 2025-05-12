import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../../type/api";

interface loginResult {
    msg: string;
    data: { 
        data: IUser;
        token: {
            accessToken: string;
            refreshToken: string;
        }   
    };
}

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_DOMAIN + `/auth`,
        credentials: 'include',
    }),
    tagTypes: ["auth"],
    endpoints: (builder) => ({
        login: builder.mutation<
            loginResult,
            { username: string, password: string }
        >({
            query: (payload) => ({
                url: "/login-web",
                method: "POST",
                body: payload,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            })
        }),
        sendMail: builder.mutation<
            loginResult,
            { email: string }
        >({
            query: (payload) => ({
                url: "/send-email-reset-password",
                method: "POST",
                body: payload,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            })
        }),
        verifyToken: builder.mutation<
            null,
            string
        >({
            query: (token) => `/verify-token/${token}`,
            extraOptions: { maxRetries: 2 }
        }),
    }),
});

export const {
    useLoginMutation,
    useSendMailMutation,
    useVerifyTokenMutation,
} = authApi;
