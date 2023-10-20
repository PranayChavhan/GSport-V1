
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  user: null
};

export const orgSlice = createSlice({
  initialState,
  name: 'orgSlice',
  reducers: {
    logout: () => initialState,
    
    setOrg: (state, action) => {
      const { user } = action.payload
      state.user = user
    },
  },
});

export const { logout, setOrg } = orgSlice.actions;

export const selectCurrentUser = (state) =>state.orgSlice.user
export default orgSlice.reducer;