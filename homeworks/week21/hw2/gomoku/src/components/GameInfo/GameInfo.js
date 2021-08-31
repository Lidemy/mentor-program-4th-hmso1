import styled from "styled-components";
import { memo } from "react";
const GameInfoContainer = styled.div``;

const GameDescContainer = styled.div`
  width: ${(props) => props.theme.maxBoardSize * props.theme.squareSize}px;
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
`;

const Player = styled.span`
  margin: auto 0;
`;

const GameSettingContainer = styled.div``;

const GameBoardSizeDesc = styled.div`
  display: inline;
`;

const GameBoardSizeInput = styled.input`
  width: 40px;
`;

export const GameInfo = memo(
  ({ stepNumber, winnerStepNumber, inputValue, debounceForInputChange }) => {
    return (
      <GameInfoContainer>
        <GameDescContainer>
          {winnerStepNumber === stepNumber - 1 ? (
            <Player>{winnerStepNumber % 2 ? "黑子" : "白子"}勝出</Player>
          ) : (
            <Player>下一位玩家：{stepNumber % 2 ? "黑子" : "白子"}</Player>
          )}
          <GameSettingContainer>
            <GameBoardSizeDesc>棋盤大小（5-19）：</GameBoardSizeDesc>
            <GameBoardSizeInput
              type="number"
              ref={inputValue}
              onChange={debounceForInputChange}
            />
          </GameSettingContainer>
        </GameDescContainer>
      </GameInfoContainer>
    );
  }
);
