import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    events: [],
    associations: [],
    filters: {},
    selectedEventId: "",
    selectedAssociationId: "",
  },
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
    addEventId: (state, action) => {
      state.value.selectedEventId = action.payload;
    },
    addAssociationId: (state, action) => {
      state.value.selectedAssociationId = action.payload;
      console.log("id de l'asso ajouté au reducer");
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
  addEventId,
  addAssociationId,
} = searchResultSlice.actions;
export default searchResultSlice.reducer;
