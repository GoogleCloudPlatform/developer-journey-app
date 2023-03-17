import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from 'src/models/User'

// Define the initial state using that type
const initialState: User = {
  email: '',
  completedMissions: [],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (_, action: PayloadAction<User>) => {
      return action.payload;
    }
  }
})

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions

export default userSlice.reducer