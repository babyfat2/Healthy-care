import { createSlice } from '@reduxjs/toolkit';
import { ENOTIFICATIONTYPE } from '../../type/enum';


interface NotificationState {
    notificationType?: ENOTIFICATIONTYPE;
    message?: string;
}

export const notification = createSlice({
    name: 'notification',
    initialState: {
        notificationType: undefined,
        message: undefined,
    } as NotificationState,
    reducers: {
        openNotification: (state, action) => {
            state.notificationType = action.payload.type;
            state.message = action.payload.message;
        },
        clearNotification: (state) => {
            state.notificationType = undefined;
            state.message = undefined;
        },
    },

})

// Action creators are generated for each case reducer function
export const { openNotification, clearNotification } = notification.actions;

export default notification.reducer;