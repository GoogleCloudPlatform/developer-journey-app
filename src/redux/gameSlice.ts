import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Mission } from 'src/models/Mission'
import { missions } from 'src/initialData.ts/missions';
import { GridPosition } from 'src/models/GridPosition';
import { InventoryItem } from 'src/models/InventoryItem';

// Define the initial state using that type
const initialState: {
  mission: Mission,
  playerPosition: GridPosition,
  inventory: InventoryItem[],
  allItemsCollected: boolean,
  isSavingMission: boolean,
} = {
  mission: missions[0],
  playerPosition: { x: 0, y: 0 },
  inventory: [],
  allItemsCollected: false,
  isSavingMission: false,
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
    startMission: (state, action: PayloadAction<{ mission?: Mission, nextMission?: boolean }>) => {
      const { nextMission } = action.payload;
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

      // prevent moving items and player if mission hasn't changed
      let inventory = state.inventory;
      const stateMissionId = state.mission.id.toString();
      const missionId = mission.id.toString();
      const sameMission = stateMissionId === missionId;

      let playerPosition = state.playerPosition;

      if (!sameMission || state.inventory.length < 1) {
        playerPosition = { x: 0, y: 0 }
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
        playerPosition,
        inventory,
        allItemsCollected: false,
        isSavingMission: false,
      }
    },
    moveUp: state => {
      if (state.playerPosition.y < 2 && !state.isSavingMission) state.playerPosition.y += 1
    },
    moveDown: state => {
      if (state.playerPosition.y > 0 && !state.isSavingMission) state.playerPosition.y -= 1
    },
    moveLeft: state => {
      if (state.playerPosition.x > 0 && !state.isSavingMission) state.playerPosition.x -= 1
    },
    moveRight: state => {
      if (state.playerPosition.x < 2 && !state.isSavingMission) state.playerPosition.x += 1
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
    setIsSavingMission: (state, action: PayloadAction<boolean>) => {
      state.isSavingMission = action.payload;
    },
  }
})

// Action creators are generated for each case reducer function
export const { startMission, moveUp, moveDown, moveLeft, moveRight, collectItem, setIsSavingMission } = gameSlice.actions

export default gameSlice.reducer