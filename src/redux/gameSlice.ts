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
  allItemsCollected: Boolean,
} = {
  mission: missions[0],
  status: '',
  playerPosition: { x: 0, y: 0 },
  inventory: [],
  allItemsCollected: false,
};

const legalInventoryGridPositions = [
  { x: 0, y: 1 },
  { x: 0, y: 2 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
  { x: 1, y: 2 },
  { x: 2, y: 0 },
  { x: 2, y: 1 },
];

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startMission: (state, action: PayloadAction<{ mission?: Mission, user: User, nextMission?: boolean }>) => {
      const { user, nextMission } = action.payload;
      // if no mission provided, restart this mission
      let mission = action.payload.mission || state.mission;

      // increment to next mission if requested
      if (nextMission) {
        let newIndex: number = missions.findIndex(mission => mission.id === state.mission.id) + 1;
        if (newIndex < missions.length) {
          mission = missions[newIndex];
        } else {
          mission = missions[0];
        }
      }

      const status = user.completedMissions.includes(mission.id) ? 'COMPLETED' : 'NOT_STARTED';

      // prevent moving items if mission hasn't changed
      let inventory = state.inventory;
      const stateMissionId = state.mission.id.toString();
      const missionId = mission.id.toString();
      const sameMission = stateMissionId === missionId;

      if (!sameMission || state.inventory.length < 1) {
        const arrayLength = legalInventoryGridPositions.length;
        const shuffledArray = legalInventoryGridPositions.sort(() => 0.5 - Math.random());
        inventory = mission.technologies.map((technology, index) => {
          return ({
            position: shuffledArray[index % arrayLength],
            status: 'NOT_COLLECTED',
            title: technology,
          })
        })
      }

      return {
        mission,
        playerPosition: { x: 0, y: 0 },
        status,
        inventory,
        allItemsCollected: false,
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
    collectItem: (state) => {
      const itemIndex = state.inventory.findIndex(item => {
        const isCorrectXPosition = item.position.x === state.playerPosition.x;
        const isCorrectYPosition = item.position.y === state.playerPosition.y;
        const isNotCollected = item.status === 'NOT_COLLECTED';
        return isCorrectXPosition && isCorrectYPosition && isNotCollected;
      });
      state.inventory[itemIndex] = {
        ...state.inventory[itemIndex],
        status: 'COLLECTED',
      }
      state.allItemsCollected = state.inventory.length > 0 && state.inventory.every(item => item.status === 'COLLECTED');
    },
  }
})

// Action creators are generated for each case reducer function
export const { startMission, moveUp, moveDown, moveLeft, moveRight, collectItem } = gameSlice.actions

export default gameSlice.reducer