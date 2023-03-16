import { configureStore } from '@reduxjs/toolkit'
import missionSlice from './missionSlice'
import playerPositionReducer from './playerPositionSlice'

export const store = configureStore({
  reducer: {
    playerPosition: playerPositionReducer,
    mission: missionSlice,
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
