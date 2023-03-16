/**
 * Location in a 2D maze (grid)
 */
export interface Location {
  x: number;
  y: number;
}


/**
 * Direction that the player moves (mapped to ASCII keyboard codes)
 */
export enum Direction {
  Left = 37, Up, Right, Down,
}


/**
 * A resource is associated with a Tile
 */
export interface Resource {
  title: string;
  imageUrl: string;
}


/**
 * Set of all available (pre-defined) resources.
 */
export interface ResourceCollection {
  resources: Resource[];
}


/**
 * A Tile has a location and potentially a Resource on it. When the player
 * moves to a Tile, the placer acquires the Resource.
 * Tiles also can have prompts. The starting Tile prompt might explain the
 * mission. A Tile prompt might also indicate that the player is close to
 * a Resource. When on a Tile with a Resource, the Tile prompt might
 * indicate that the Player has acquired the resource.
 */
export interface Tile {
  location: Location;
  resource?: Resource;
  prompt?: string;
}


/**
 * Technology is a technical resource with a link for more information.
 */
export interface Technology {
  name: string;
  referenceUrl: string;
}


/**
 * Set of all available (pre-defined) technologies.
 */
export interface TechnologyCollection {
  technologies: Technology[];
}


/**
 * Start Tile is the first tile in `tiles`. A mission is complete when all
 * resource tiles have been acquired.
 */
export interface Mission {
  name: string;
  description: string;
  technologies: Technology[];


  /**
   * An array of tiles that will be rendered on a 3x3 grid.
   */
  tiles: Tile[];


  /**
   * The total number of tiles that have resources to be acquired.
   */
  resourceTiles(): number;
}


/**
 * Set of all available (pre-defined) missions.
 */
export interface MissionCollection {
  missions: Mission[];
}


export interface Player {
  name: string;

  /**
   * Player image resource
   */
  avatar: string;

  /**
   * The Player's current Mission.
   */
  mission: Mission;


  /**
   * The tile that the Player is currently on.
   */
  tile: Tile;


  /**
   * The resources that the player has collected moving over tiles.
   * When the Player has collected all the resources (indicated by
   * mission.resourceTiles) the mission is complete.
   */
  resources: Resource[];
}


/**
 * The states of play for the game engine.
 */
export enum GameState {
  Initial, InPlay, GameOver,
}


/**
 * Status reflects current state in a convenient, flattened object.
 * This could also just get rolled up into Game itself.
 */
export interface Status {
  x: number;
  y: number;
  prompt: string;


  // other convenient props...
  currentTile: Tile;
  resourcesCollected: number;
  resourcesRemaining: number;
}


export interface Game {
  currentState: GameState;

  player: Player;

  /**
   * Updated for each `move` action.
   */
  status: Status;
  moveUp: void;

  /**
   * action
   */
  move(direction: Direction): void;

  // ** or **
  moveLeft(): void;

  moveRight(): void;

  moveDown(): void;
}
