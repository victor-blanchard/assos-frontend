import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { events: [], associations: [], filters: {} },
};

export const searchResultSlice = createSlice({
  name: "searchResult",
  initialState,
  reducers: {
    addEvents: (state, action) => {
      state.value.events = action.payload;
    },
    deleteEvents: (state, action) => {
      state.value.events = [];
    },
    addAssociations: (state, action) => {
      state.value.associations = action.payload;
    },
    deleteAssociations: (state, action) => {
      state.value.associations = [];
    },
    addFilters: (state, action) => {
      state.value.filters = action.payload;
    },
    deleteFilters: (state, action) => {
      state.value.filters = [];
    },
  },
});

export const {
  addEvents,
  deleteEvents,
  addAssociations,
  deleteAssociations,
  addFilters,
  deleteFilters,
} = searchResultSlice.actions;
export default searchResultSlice.reducer;
