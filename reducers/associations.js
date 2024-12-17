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
            state.value.assoInfos.push(action.payload);
        }


    }
});

export const { isCreateAsso, isModalCreateOpen, getAssoInfo } = associationsSlice.actions;
export default associationsSlice.reducer;