import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface playerPositionState {
  x: number
  y: number
}

// Define the initial state using that type
const initialState: playerPositionState = {
  x: 0,
  y: 0
}

export const playerPositionSlice = createSlice({
  name: 'playerPosition',
  initialState,
  reducers: {
    moveUp: state => {
      if (state.y < 2) state.y += 1
    },
    moveDown: state => {
      if (state.y > 0) state.y -= 1
    },
    moveLeft: state => {
      if (state.x > 0) state.x -= 1
    },
    moveRight: state => {
      if (state.x < 2) state.x += 1
    }
  }
})

// Action creators are generated for each case reducer function
export const { moveUp, moveDown, moveLeft, moveRight } = playerPositionSlice.actions

export default playerPositionSlice.reducer