import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
        modalState: false,
        formType: '', //Signin ou Signup
        formReset: false,
        token: null,
        email: null,
        username: null,
        id: null,
        isAssociationOwner: false,
        likedEvents: [],
        followingAssociations: [],
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
            state.value.username = action.payload.username;
            state.value.isAssociationOwner = action.payload.isAssociationOwner;
            state.value.id = action.payload.id;
            state.value.likedEvents = action.payload.likedEvents;
            state.value.followingAssociations = action.payload.followingAssociations;
            
          },

        logout: (state) => {
            state.value.token = null;
            state.value.email = null;
            state.value.username = null;
            state.value.isAssociationOwner = false;
        },
    }
});

export const { isModalVisible, isReset, login, logout, setFormType } = usersSlice.actions;
export default usersSlice.reducer;