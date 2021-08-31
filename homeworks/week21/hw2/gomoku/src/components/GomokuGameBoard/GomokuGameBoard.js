import styled from "styled-components";
import { memo } from "react";

const GomokuGameBoardContainer = styled.div`
  position: relative;
  width: ${(props) => props.theme.squareSize * props.size}px;
  margin: 0 auto;
`;

const BoardBackgrounContainer = styled.div`
  width: ${(props) => props.size * props.theme.squareSize}px;
  height: ${(props) => props.size * props.theme.squareSize}px;
  border: 1px solid #000;
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  left: ${(props) => props.theme.squareSize / 2}px;
  top: ${(props) => props.theme.squareSize / 2}px;
`;

const SquareBackground = styled.div`
  width: ${(props) => props.theme.squareSize}px;
  height: ${(props) => props.theme.squareSize}px;
  box-sizing: border-box;
  border: 1px solid #000;
`;

const Square = styled(SquareBackground)`
  position: relative;
  border: none;
`;

const Gomoku = styled.div`
  width: ${(props) => props.theme.squareSize * 0.75}px;
  height: ${(props) => props.theme.squareSize * 0.75}px;
  border-radius: 50%;
  margin: ${(props) => props.theme.squareSize * 0.25 * 0.5}px auto;
`;

const BoardContainer = styled.div`
  width: ${(props) => props.size * props.theme.squareSize}px;
  height: ${(props) => props.size * props.theme.squareSize}px;
  display: flex;
  flex-wrap: wrap;
`;

const GomokuBoardBackground = memo(({ size }) => {
  const generateSquaresBackgound = Array(size * size)
    .fill(null)
    .map((square, index) => <SquareBackground key={index}></SquareBackground>);
  return (
    <BoardBackgrounContainer size={size}>
      {generateSquaresBackgound}
    </BoardBackgrounContainer>
  );
});

const GomokuBoard = memo(({ squares, onClick }) => {
  const generateGomokuBoard = squares.map((squareRow, rowIndex) =>
    squareRow.map((square, colIndex) => (
      <Square
        key={colIndex + squares.length * rowIndex}
        onClick={() => onClick(rowIndex, colIndex)}
      >
        {square && <Gomoku className={square} />}
      </Square>
    ))
  );

  return (
    <BoardContainer size={squares.length}>{generateGomokuBoard}</BoardContainer>
  );
});

export const GomokuGameBoard = memo(({ boardSize, squares, onClick }) => {
  return (
    <GomokuGameBoardContainer size={boardSize}>
      <GomokuBoardBackground size={boardSize - 1} />
      <GomokuBoard squares={squares} onClick={onClick} />
    </GomokuGameBoardContainer>
  );
});
