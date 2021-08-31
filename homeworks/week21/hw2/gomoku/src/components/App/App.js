import "./App.css";
import styled from "styled-components";
import { GomokuGameBoard } from "../GomokuGameBoard";
import { GameInfo } from "../GameInfo";
import { RecordList } from "../RecordList/RecordList";
import useGomoku from "../../hooks/useGomoku";

const Title = styled.h1`
  text-align: center;
`;

function App() {
  const {
    boardSize,
    history,
    stepNumber,
    onClick,
    winnerStepNumber,
    inputValue,
    debounceForInputChange,
    backToThePast,
  } = useGomoku();

  return (
    <div>
      <Title>五子棋遊戲</Title>
      <GomokuGameBoard
        boardSize={boardSize}
        squares={history[stepNumber - 1]}
        onClick={onClick}
      />
      <GameInfo
        stepNumber={stepNumber}
        winnerStepNumber={winnerStepNumber}
        inputValue={inputValue}
        debounceForInputChange={debounceForInputChange()}
      />
      <RecordList history={history} backToThePast={backToThePast} />
    </div>
  );
}

export default App;
