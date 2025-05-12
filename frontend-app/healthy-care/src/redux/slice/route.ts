import { createSlice, } from "@reduxjs/toolkit";

export type Route = {
    is_first: boolean;
};

const route = createSlice({
    name: "route",
    initialState: {
        is_first: true,
    }  as Route,
    reducers: {
        joinApp: (state) => {
            state.is_first = false;  
        },
    },
})

export default route.reducer;
export const { joinApp } = route.actions;