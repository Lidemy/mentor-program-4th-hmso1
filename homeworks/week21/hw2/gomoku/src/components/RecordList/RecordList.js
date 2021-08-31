import styled from "styled-components";
import { memo } from "react";

const RecordListContainer = styled.ol`
  width: ${(props) => props.theme.maxBoardSize * props.theme.squareSize}px;
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 10px auto;
  padding: 0;
`;

const RecordListItem = styled.li`
  margin: 5px 0;
`;

const RecordLisBtn = styled.button`
  width: 112px;
`;

const EmptyRecordListItem = styled(RecordLisBtn)`
  background-color: #000;
  visibility: hidden;
`;

export const RecordList = memo(({ history, backToThePast }) => {
  const generateRecordBtn = history.map((record, index) => {
    const desc = index ? "回到第" + index + "步" : "回到遊戲開始";
    const handleClick = () => backToThePast(index);
    return (
      <RecordListItem key={index}>
        <RecordLisBtn onClick={handleClick}>{desc}</RecordLisBtn>
      </RecordListItem>
    );
  });

  return (
    <RecordListContainer>
      {generateRecordBtn.length - 1 !== 0 && generateRecordBtn}
      <EmptyRecordListItem />
      <EmptyRecordListItem />
      <EmptyRecordListItem />
    </RecordListContainer>
  );
});
