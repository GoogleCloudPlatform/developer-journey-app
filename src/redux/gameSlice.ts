import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Mission } from 'src/models/Mission'
import { missions } from 'src/initialData.ts/missions';
import { GridPosition } from 'src/models/GridPosition';
import { User } from 'src/models/User';
import { InventoryItem } from 'src/models/InventoryItem';

// Define the initial state using that type
const initialState: {
  mission: Mission,
  status: string,
  playerPosition: GridPosition,
  inventory: InventoryItem[],
} = {
  mission: missions[0],
  status: '',
  playerPosition: { x: 0, y: 0 },
  inventory: [],
};

const legalInventoryGridPositions = [
  {x: 0, y: 1},
  {x: 0, y: 2},
  {x: 1, y: 0},
  {x: 1, y: 1},
  {x: 1, y: 2},
  {x: 2, y: 0},
  {x: 2, y: 1},
];

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startMission: (state, action: PayloadAction<{ mission?: Mission, user: User, nextMission?: boolean }>) => {
      const {user, nextMission} = action.payload;
      // if no mission provided, restart this mission
      let mission = action.payload.mission || state.mission;

      // increment to next mission if requested
      if (nextMission) {
        let newIndex: number = missions.findIndex(mission => mission.id === state.mission.id) + 1;
        if (newIndex >= missions.length) {
          mission = missions[0];
        } else {
          mission = missions[newIndex];
        }
      }

      const status = user.completedMissions.includes(mission.id) ? 'COMPLETED' : 'NOT_STARTED';

      const inventory = mission.technologies.map(technology => ({
        position: legalInventoryGridPositions[Math.floor(Math.random() * legalInventoryGridPositions.length)],
        status: 'NOT_COLLECTED',
        title: technology,
      }))

      return {
        mission,
        playerPosition: { x: 0, y: 0 },
        status,
        inventory,
      }
    },
    moveUp: state => {
      if (state.playerPosition.y < 2) state.playerPosition.y += 1
    },
    moveDown: state => {
      if (state.playerPosition.y > 0) state.playerPosition.y -= 1
    },
    moveLeft: state => {
      if (state.playerPosition.x > 0) state.playerPosition.x -= 1
    },
    moveRight: state => {
      if (state.playerPosition.x < 2) state.playerPosition.x += 1
    },
    addTechnologyToInventory: (state, action: PayloadAction<string>) => {
      console.log({action})
      const itemIndex = state.inventory.findIndex(item => item.title === action.payload);
      state.inventory[itemIndex] = {
        ...state.inventory[itemIndex],
        status: 'COLLECTED',
      }
    },
  }
})

// Action creators are generated for each case reducer function
export const { startMission, moveUp, moveDown, moveLeft, moveRight, addTechnologyToInventory } = gameSlice.actions

export default gameSlice.reducer