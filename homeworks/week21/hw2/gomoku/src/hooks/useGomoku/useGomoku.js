import { useState, useRef, useEffect, useMemo, useCallback } from "react";

const debounce = (func) => {
  let timer;
  return function (...args) {
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, 500);
  };
};

export default function useGomoku() {
  const [boardSize, setBoardSize] = useState(19);
  const [history, setHistory] = useState(
    Array(1).fill(Array(19).fill(Array(19).fill(null)))
  );
  const [stepNumber, setStepNumber] = useState(1);
  const [winnerStepNumber, setWinnerStepNumber] = useState(false);
  const inputValue = useRef();

  useEffect(() => (inputValue.current.value = 19), []);

  const checkTotalGomokuWithDirection = useMemo(
    () => (record, x, y, xDirection, yDirection) => {
      let targetColor = record[x][y];
      let total = 0;
      let currentX = x;
      let currentY = y;

      do {
        if (
          currentX + xDirection < 0 ||
          currentY + yDirection < 0 ||
          currentX + xDirection >= boardSize ||
          currentY + yDirection >= boardSize
        )
          break;

        if (
          record[currentX + xDirection][currentY + yDirection] === targetColor
        ) {
          total++;
          currentX = currentX + xDirection;
          currentY = currentY + yDirection;
        } else {
          break;
        }
      } while (true);
      console.log(total);
      return total;
    },
    [boardSize]
  );

  const checkWinner = useMemo(
    () => (record, x, y) => {
      if (
        checkTotalGomokuWithDirection(record, x, y, 0, 1) +
          checkTotalGomokuWithDirection(record, x, y, 0, -1) >=
          4 ||
        checkTotalGomokuWithDirection(record, x, y, 1, 0) +
          checkTotalGomokuWithDirection(record, x, y, -1, 0) >=
          4 ||
        checkTotalGomokuWithDirection(record, x, y, 1, 1) +
          checkTotalGomokuWithDirection(record, x, y, -1, -1) >=
          4 ||
        checkTotalGomokuWithDirection(record, x, y, -1, 1) +
          checkTotalGomokuWithDirection(record, x, y, 1, -1) >=
          4
      )
        return true;

      return false;
    },
    [checkTotalGomokuWithDirection]
  );

  const handleInputChange = useMemo(
    () => (e) => {
      let newValue = Number(e.target.value);
      if (newValue < 5) newValue = 5;
      if (newValue > 19) newValue = 19;

      setStepNumber(1);
      setBoardSize(newValue);
      setWinnerStepNumber(false);
      setHistory(
        Array(1).fill(Array(newValue).fill(Array(newValue).fill(null)))
      );
      inputValue.current.value = newValue;
    },
    []
  );

  const debounceForInputChange = useCallback(
    () => debounce(handleInputChange),
    [handleInputChange]
  );

  const onClick = useCallback(
    (currentXIndex, currentYIndex) => {
      const copyOfHistory = history.slice(0, stepNumber);
      const copyOfRecord = history[stepNumber - 1].slice();
      const gomokuColor = stepNumber % 2 ? "b" : "w";

      if (copyOfRecord[currentXIndex][currentYIndex]) return;

      if (stepNumber <= winnerStepNumber) {
        setWinnerStepNumber(false);
      }

      if (winnerStepNumber === stepNumber - 1) return;

      const newRecord = Array(
        copyOfRecord.map((row, rowIndex) => {
          if (rowIndex !== currentXIndex) return row;
          return row.map((col, colIndex) => {
            if (colIndex !== currentYIndex) return col;
            return gomokuColor;
          });
        })
      );
      setHistory(copyOfHistory.concat(newRecord));
      setStepNumber(stepNumber + 1);
      if (checkWinner(newRecord[0], currentXIndex, currentYIndex))
        return setWinnerStepNumber(stepNumber);
    },
    [checkWinner, history, stepNumber, winnerStepNumber]
  );

  const backToThePast = useCallback(
    (index) => {
      setStepNumber(index + 1);
    },
    [setStepNumber]
  );

  return {
    boardSize,
    history,
    stepNumber,
    onClick,
    winnerStepNumber,
    inputValue,
    debounceForInputChange,
    backToThePast,
  };
}
