import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { cellState, useCell } from './hooks';

export interface CellProps {
  row: number;
  column: number;
}

const CellStyled = styled.div<{currState:cellState}>`
  width: 50px;
  height: 50px;
  background-color: green;
  display: flex;
  align-items: center;
  justify-content: center;

  ${props => props.currState === 'empty' ? ``: ``}
  ${props => props.currState === 'filled' ? `
    background-color: brown;
  `: ``}
  ${props => props.currState === 'mashed' ? `
    background-color: blue;
  `: ``}
  ${props => props.currState === 'missed' ? `
    background-color: red;
  `: ``}
`;

const Cell:FunctionComponent<CellProps> = ({
  row, column, ...rest
}) => {
  const [ currState, onClick ] = useCell(row, column);
  return (
    <CellStyled
      currState={currState}
      onClick={onClick}
      {...rest}
    />
  );
};

export default Cell;
