import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IMedicine } from "../../type/api";
import { RootState } from "../store";
import { ESPECIALTIES, ESTAFF, ESTATUS } from "../../type/enum";

export const medicineApi = createApi({
    reducerPath: "medicineApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_DOMAIN + `medicine`,
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
            {page?: number; row?: number; search?: string, role?: ESTAFF, status?: ESTATUS, specialties?: ESPECIALTIES}
        >({
            query: ({ page, row, search, role, status, specialties }) => {
                const params = new URLSearchParams();
                if (page) params.append("page", page.toString());
                if (row) params.append("limit", row.toString());
                if (search) params.append("search", search);
                if (role) params.append("role", role);
                if (status) params.append("search", status);
                if (specialties) params.append("specialties", specialties);
        
    
                return `?${params.toString()}`;
            },
    
        }),
    }),
});

export const {
    useLazyGetListMedicineQuery,
} = medicineApi;
