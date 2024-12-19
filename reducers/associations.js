import { createSlice } from '@reduxjs/toolkit';
import { logout } from './users';

const initialState = {
    value: {
        assosCreate: false,
        modalCreateState: false,
        assoInfos: {},
        photosProfil: '',
        eventPhotos: [],
    },
};

export const associationsSlice = createSlice({
    name: 'associations',
    initialState,
    reducers: {
        isCreateAsso: (state, action) => {
            state.value.assosCreate = action.payload;
        },

        isModalCreateOpen: (state, action) => {
            state.value.modalCreateState = action.payload;
        },

        getAssoInfo: (state, action) => {
            // if (!state.value.assoInfos) {
            //     state.value.assoInfos = [];
            // };
            const alreadyExists = state.value.assoInfos.some(
                (asso) => asso.id === action.payload.id // Vérifie par exemple l'ID
            );
        
            if (!alreadyExists) {
                state.value.assoInfos.push(action.payload);
            }
            // console.log("État après push :", state.value.assoInfos);
        },

        logoutAsso: (state, action) => {
            state.value.assoInfos = [];
        },

        addPhoto: (state, action) => {
        state.value.photosProfil = action.payload;
        },

        removePhoto: (state, action) => {
            state.value.photos = state.value.photos.filter((data) => data !== action.payload);
        },


    }
});

export const { isCreateAsso, isModalCreateOpen, getAssoInfo, logoutAsso, addPhoto } = associationsSlice.actions;
export default associationsSlice.reducer;