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
        baseUrl:  process.env.EXPO_PUBLIC_API_URL +  `auth`,
        credentials: 'include',
    }),
    tagTypes: ["auth"],
    endpoints: (builder) => ({
        login: builder.mutation<
            loginResult,
            { username: string, password: string }
        >({
            query: (payload) => ({
                url: "/login",
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
    useLoginMutation,
} = authApi;
