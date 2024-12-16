import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
        assosCreate: false,
        modalCreateState: false,
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


    }
});

export const { isCreateAsso, isModalCreateOpen } = associationsSlice.actions;
export default associationsSlice.reducer;