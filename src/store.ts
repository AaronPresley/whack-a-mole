import create, { State } from 'zustand';
import { cellState } from './hooks';

const MAX_SCORE = 3;
const MAX_MISSED = 3;

export interface GameState extends State {
  gameInProgress: boolean,
  gameOver: boolean;
  gameWon: boolean;
  rows: number;
  columns: number;
  score: number;
  missed: number;
  currentDelay: number;
  cellStates: Record<string, cellState>,
  determineGame: () => void;
  didMiss: () => void,
  didScore: () => void,
  setCellState: (row:number, column:number, newState:cellState) => void,
  startGame: (rows:number, columns:number) => void,
  tick: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  gameInProgress: false,
  gameOver: false,
  gameWon: false,
  rows: null,
  columns: null,
  score: 0,
  missed: 0,
  currentDelay: null,
  cellStates: {},

  determineGame: () => {
    const [score, missed] = [get().score, get().missed];
    if (score >= MAX_SCORE ) set({ gameOver: true, gameWon: true });
    if (missed >= MAX_MISSED ) set({ gameOver: true, gameWon: false });
  },

  didMiss: () => {
    set({ missed: get().missed + 1})
    get().determineGame();
  },
  
  didScore: () => {
    set({ score: get().score + 1})
    get().determineGame();
  },

  setCellState: (row, column, newState) => set({
    cellStates: {
      ...get().cellStates,
      [`${row}|${column}`]: newState,
    }
  }),

  startGame: async (rows, columns) => {
    await set({
      gameInProgress: true,
      score: 0,
      rows, columns,
    });

    const performTick = async () => {
      await get().tick();
      if (get().gameInProgress) {
        setTimeout(performTick, get().currentDelay || 1000);
      }
    };

    performTick();
  },

  tick: async () => {
    const [rows, cols] = [get().rows, get().columns];
    const newCells:Record<string, cellState> = {}
    const totalFilled = Math.ceil((rows * cols) / 4);

    for (let x = 0; x < totalFilled; x += 1) {
      const randomRow = Math.floor(Math.random() * (rows - 1) + 1);
      const randomCol = Math.floor(Math.random() * (cols - 1) + 1);
      newCells[`${randomRow}|${randomCol}`] = 'filled';
    }
    
    await set({ cellStates: newCells });
  },
}));
