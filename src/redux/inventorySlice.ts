import { createSlice } from '@reduxjs/toolkit'

// Define the initial state using that type
const initialState: string[] = []

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
  }
})

export default inventorySlice.reducer
