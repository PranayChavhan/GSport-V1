// sidebarSlice.js
import { createSlice } from '@reduxjs/toolkit';

const tournamentSlice = createSlice({
  name: 'tournamentSlice',
  initialState: {
    tour_details: {},
  },
  reducers: {
    openSidebar: (state) => {
      state.isOpen = true;
    },
    closeSidebar: (state) => {
      state.isOpen = false;
    },
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },

    setTournamentDetails: (state, action) => {
        const data = action.payload
        console.log(data);
        state.tour_details = data
      },
  },
});

export const { setTournamentDetails } = tournamentSlice.actions;

export default tournamentSlice.reducer;
