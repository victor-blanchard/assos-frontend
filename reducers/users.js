import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
        formState: false,
    },
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        isReset: (state, action) => {
            state.value.formState = action.payload;
        },
    }
});

export const { isReset } = usersSlice.actions;
export default usersSlice.reducer;