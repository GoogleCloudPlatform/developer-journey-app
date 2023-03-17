import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GridPosition } from 'src/models/GridPosition'

// Define the initial state using that type
const initialState: string[] = []

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
  }
})

// Action creators are generated for each case reducer function
export const {  } = inventorySlice.actions

export default inventorySlice.reducer