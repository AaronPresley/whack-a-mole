import { useGameStore } from "./store";
import shallow from 'zustand/shallow';
import { useEffect, useState } from "react";

export type cellState = `empty` | `filled` | `mashed` | `missed`;

export const useCell = (
  row:number,
  column:number
):[
  cellState,
  (e:React.MouseEvent<HTMLDivElement>) => void
] => {
  let [cellState, setCellState, didScore, didMiss] = useGameStore(state => [
    state.cellStates[`${row}|${column}`] || 'empty',
    state.setCellState,
    state.didScore,
    state.didMiss,
  ], shallow);
  
  const [ finalCellState, setFinalCellState ] = useState<cellState>(cellState);
  
  useEffect(() => setFinalCellState(cellState), [cellState])
  
  const onCellPressed = (e:React.MouseEvent<HTMLDivElement>) => {
    if (cellState === 'filled') {
      didScore();
      return setCellState(row, column, 'mashed');
    }
    
    didMiss();
    setCellState(row, column, 'missed');
  };

  return [ finalCellState, onCellPressed ];
}
