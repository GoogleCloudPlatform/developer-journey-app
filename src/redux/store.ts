import { configureStore } from '@reduxjs/toolkit'
import gameReducer from './gameSlice'
import userSlice from './userSlice'

export const store = configureStore({
  reducer: {
    game: gameReducer,
    user: userSlice,
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
