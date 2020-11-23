import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import Cell, { CellProps } from './Cell';

export interface GridProps {
  rows?: number;
  columns?: number;
}

interface CellStyledProps extends CellProps {
  isTopLeft: boolean;
  isTopRight: boolean;
  isBottomLeft: boolean;
  isBottomRight: boolean;
}

const GridWrapper = styled.div`
  flex: 1;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;
const CellStyled = styled(Cell)<CellStyledProps>`
  ${props => props.isTopLeft ? `
    border-top-left-radius: 15px;
  ` : ``}
  ${props => props.isTopRight ? `
    border-top-right-radius: 15px;
  ` : ``}
  ${props => props.isBottomRight ? `
    border-bottom-right-radius: 15px;
  ` : ``}
  ${props => props.isBottomLeft ? `
    border-bottom-left-radius: 15px;
  ` : ``}
`;

const Grid:FunctionComponent<GridProps> = ({
  rows = 5,
  columns = 5,
}) => {
  const allRows = [];

  for (let y = 1; y <= rows; y += 1) {
    const cells = [];
    for (let x = 1; x <= columns; x += 1) {
      cells.push(<CellStyled
        key={`${x},${y}`}
        isTopLeft={y === 1 && x === 1}
        isBottomLeft={y === rows && x === 1}
        isTopRight={y === 1 && x === columns}
        isBottomRight={y === rows && x === columns}
        row={y}
        column={x}
      />)
    }
    allRows.push(cells);
  }

  return (
    <GridWrapper>
      <GridContainer>
        {allRows.map((r, y) => (
          <Row key={y}>{ r.map(c => c) }</Row>
        ))}
      </GridContainer>
    </GridWrapper>
  );
};

export default Grid;
