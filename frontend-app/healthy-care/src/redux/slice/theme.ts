import { createSlice, } from "@reduxjs/toolkit";

export type Theme = {
    darkmode: boolean;
    fontSize: number;
};

const theme = createSlice({
    name: "theme",
    initialState: {
        darkmode: false,
        fontSize: 12,
    }  as Theme,
    reducers: {
        changeDarkMode: (state) => {
            state.darkmode = !state.darkmode; 
        },
        changeFontSize: (state, action) => {
                state.fontSize = action.payload.fontSize;
        },
    },
})

export default theme.reducer;
export const { changeDarkMode, changeFontSize } = theme.actions;