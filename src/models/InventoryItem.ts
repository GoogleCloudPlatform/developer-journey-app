import {GridPosition} from './GridPosition';

export class InventoryItem {
  title!: string;
  position!: GridPosition;
  status!: 'COLLECTED' | 'NOT_COLLECTED';
}
