import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    modalState: false,
    formType: "", //Signin ou Signup
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
  name: "users",
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

<<<<<<< HEAD
        login: (state, action) => {
            state.value.token = action.payload.token;
            state.value.email = action.payload.email;
            state.value.username = action.payload.username;
            state.value.isAssociationOwner = action.payload.isAssociationOwner;
            state.value.id = action.payload.id;
            state.value.likedEvents = action.payload.likedEvents;
            state.value.followingAssociations = action.payload.followingAssociations;
          },
=======
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.email = action.payload.email;
      state.value.username = action.payload.username;
      state.value.isAssociationOwner = action.payload.isAssociationOwner;
      state.value.id = action.payload.id;
      state.value.likedEvents = action.payload.likedEvents;
      state.value.followingAssociations = action.payload.followingAssociations;
    },
>>>>>>> 1c53b3babe47097f3f9ec0079244bc775c823ad4

    logout: (state) => {
      state.value.token = null;
      state.value.email = null;
      state.value.username = null;
      state.value.isAssociationOwner = false;
      state.value.likedEvents = [];
      state.value.followingAssociations = [];
    },
    addLikeEvent: (state) => {
      state.value.likedEvents = action.payload;
    },
  },
});

export const { isModalVisible, isReset, login, logout, setFormType, addLikeEvent } =
  usersSlice.actions;
export default usersSlice.reducer;
