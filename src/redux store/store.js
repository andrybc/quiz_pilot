import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './useReducer';

// Create a Redux store with the rootReducer
const store = configureStore({
  reducer: rootReducer,
});

// Export the Redux store
export default store;