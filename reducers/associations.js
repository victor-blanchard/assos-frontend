import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
        assosCreate: false,
        modalCreateState: false,
        assoInfos: [],
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
            // console.log("État avant modification :", state);
            console.log("Payload reçu :", action.payload);
            state.value.assoInfos.push(action.payload);
            // console.log("État après push :", state.value.assoInfos);
        }


    }
});

export const { isCreateAsso, isModalCreateOpen, getAssoInfo } = associationsSlice.actions;
export default associationsSlice.reducer;