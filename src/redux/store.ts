import {configureStore} from '@reduxjs/toolkit';
import gameReducer from './gameSlice';
import {apiSlice} from 'src/redux/apiSlice';

export const store = configureStore({
  reducer: {
    game: gameReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
