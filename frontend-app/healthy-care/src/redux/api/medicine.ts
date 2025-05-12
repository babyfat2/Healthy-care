import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { IMedicine } from "../../type/api";

export const medicineApi = createApi({
    reducerPath: "medicineApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.EXPO_PUBLIC_API_URL+ `medicine`,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).user.token;
            // If we have a token, set it in the header
            if (token) {
              headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
          },
    }),
    tagTypes: ["medicine"],
    endpoints: (builder) => ({
        getListMedicine: builder.query<
            {
                data: IMedicine[],
            },
            {page?: number; row?: number; search?: string }
        >({
            query: ({ page, row, search}) => {
                const params = new URLSearchParams();
                if (page) params.append("page", page.toString());
                if (row) params.append("limit", row.toString());
                if (search) params.append("search", search);
        

                return `?${params.toString()}`;
            },
    
        }),
    }),
});

export const {
    useLazyGetListMedicineQuery,
} = medicineApi;
