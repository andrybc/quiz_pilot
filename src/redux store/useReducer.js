import { createSlice } from '@reduxjs/toolkit';

console.log("here");
// Define the initial state for the user reducer
const initialUserState = {
  username: "null",
};

// Create a user slice using createSlice
export const userSlice = createSlice({

  name: 'user',
  initialState: initialUserState,
  reducers: {
    setUsernames: (state, action) => {
      state.username = action.payload;
      
    },
    clearUsernames: (state) => {
      state.username = "null";
    },
  },
});

// Export the actions and reducer from the user slice
export const { setUsernames, clearUsernames } = userSlice.actions;
export default userSlice.reducer;