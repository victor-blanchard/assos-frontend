import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
        formState: true,
        formReset: false,
        token: '',
    },
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        isModalVisible: (state, action) => {
            state.value.formState = action.payload;
        },

        isReset: (state, action) => {
            state.value.formReset = action.payload;
        },

        login: (state, action) => {
            state.value.token = action.payload.token;
            state.value.email = action.payload.email;
          },
    }
});

export const { isModalVisible, isReset, login } = usersSlice.actions;
export default usersSlice.reducer;