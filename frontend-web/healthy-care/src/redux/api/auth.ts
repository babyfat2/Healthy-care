import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EROLE } from "../../global/globalEum";

interface loginResult {
    msg: string;
    data: { role: EROLE | undefined };
}

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:3000/auth`,
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
