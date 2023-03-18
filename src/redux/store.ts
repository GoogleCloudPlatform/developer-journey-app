import { configureStore } from '@reduxjs/toolkit'
import gameReducer from './gameSlice'
import userSlice from './userSlice'
import { apiSlice } from 'src/redux/apiSlice';

export const store = configureStore({
  reducer: {
    game: gameReducer,
    user: userSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
