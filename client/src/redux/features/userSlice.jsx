import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';


const userProfile = localStorage.getItem('userData') !== null ? JSON.parse(localStorage.getItem('userData')) : {}

const cookie = new Cookies()

const initialState = {
  user: userProfile,
  token: cookie.get('jwt_auth_token')
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    logout: (state, action) => {
      console.log("log out user called")
      state.user = null,
      state.token = null,
      cookie.remove('jwt_auth_token', { path: '/' })
    },
    
    setUser: (state, action) => {
      const { user, token } = action.payload
      state.user = user
      state.token = token
    },
  },
});

export const { logout, setUser } = userSlice.actions;

export default userSlice.reducer;

export const selectCurrentUser = (state) => state.userSlice?.user