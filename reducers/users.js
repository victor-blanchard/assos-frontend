import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
        modalState: false,
        formType: '', //Signin ou Signup
        formReset: false,
        token: null,
        email: null,
    },
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        isModalVisible: (state, action) => {
            state.value.modalState = action.payload;
        },

        setFormType: (state, action) => {
            state.value.formType = action.payload;
        },

        isReset: (state, action) => {
            state.value.formReset = action.payload;
        },

        login: (state, action) => {
            state.value.token = action.payload.token;
            state.value.email = action.payload.email;
          },

        logout: (state) => {
            state.value.token = null;
            state.value.email = null;
        },
    }
});

export const { isModalVisible, isReset, login, logout, setFormType } = usersSlice.actions;
export default usersSlice.reducer;