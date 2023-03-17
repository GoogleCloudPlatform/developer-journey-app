import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GridPosition } from 'src/models/GridPosition'

// Define the initial state using that type
const initialState: GridPosition = {
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
    },
    setPlayerPosition: (_, action: PayloadAction<GridPosition>) => {
      return action.payload;
    }
  }
})

// Action creators are generated for each case reducer function
export const { moveUp, moveDown, moveLeft, moveRight, setPlayerPosition } = playerPositionSlice.actions

export default playerPositionSlice.reducer