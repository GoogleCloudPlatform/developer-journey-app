import { createSlice } from '@reduxjs/toolkit'
import { Mission } from 'src/models/Mission'
import { missions } from 'src/initialData.ts/missions'

// Define the initial state using that type
const initialState: Mission = missions[0];

export const playerPositionSlice = createSlice({
  name: 'playerPosition',
  initialState,
  reducers: {
    nextMission: state => {
      let newIndex = missions.findIndex(mission => mission.id === state.id) + 1;
      if (newIndex >= missions.length) return missions[0];
      return missions[newIndex]
    },
  }
})

// Action creators are generated for each case reducer function
export const { nextMission } = playerPositionSlice.actions

export default playerPositionSlice.reducer