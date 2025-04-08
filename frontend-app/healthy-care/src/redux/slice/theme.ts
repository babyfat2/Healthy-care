import { createSlice, } from "@reduxjs/toolkit";

export type Theme = {
    darkmode: boolean;
    fontSize: number;
};

const theme = createSlice({
    name: "theme",
    initialState: {
        darkmode: false,
        fontSize: 0,
    }  as Theme,
    reducers: {
        changeDarkMode: (state) => {
            state.darkmode = !state.darkmode; 
        },
        increaseFontSize: (state) => {
            if (state.fontSize < 5) {
                state.fontSize += 1;
            }
        },
        decreaseFontSize: (state) => {
            if (state.fontSize > -5) {
                state.fontSize -= 1;
            }
        },
        resetFontSize: (state) => {
            state.fontSize = 0;
        },
    },
})

export default theme.reducer;
export const { changeDarkMode, increaseFontSize, decreaseFontSize, resetFontSize } = theme.actions;