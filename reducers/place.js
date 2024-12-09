import { createSlice } from "@reduxjs/toolkit";
//definition of initialState
const initialState = {
  value: { placeName: null, lattitude: null, longitude: null },
};
//export and definition of reducers
export const placesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    addPlaceToStore: (state, action) => {
      console.log(action.payload);
      state.value.push(action.payload);
    },
    removePlaceToStore: (state, action) => {
      state.value = state.value.filter(
        (bookmark) => bookmark.title !== action.payload.title
      );
    },
  },
});
//export of all
export const { addPlaceToStore, removePlaceToStore } = placesSlice.actions;
export default placesSlice.reducer;
