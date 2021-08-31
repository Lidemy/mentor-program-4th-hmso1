import styled from "styled-components";
import { Warning } from "../Warning";
import { InputItemWrapper, InputLable } from "../InputItem";
import { memo, useMemo } from "react";

const RadioItemWrapper = styled(InputItemWrapper)``;
const RadioItemTitle = styled(InputLable)``;

const RadioOption = styled.div`
  padding-top: 24px;
`;
const RadioInput = styled.input``;
const RadioInputLabel = styled.label``;

export const RadioItem = memo(
  ({ name, options, optionsText, chtTitle, value, onChange }) => {
    const generateRadioOption = useMemo(
      () =>
        options.map((option, index) => {
          return (
            <RadioOption key={index}>
              <RadioInput
                type="radio"
                id={option}
                name={name}
                value={optionsText[index]}
                checked={value.content === optionsText[index]}
                onChange={onChange}
              />
              <RadioInputLabel htmlFor={option}>
                {optionsText[index]}
              </RadioInputLabel>
            </RadioOption>
          );
        }),
      [name, onChange, options, optionsText, value.content]
    );

    return (
      <RadioItemWrapper>
        <RadioItemTitle required={value.required}>{chtTitle}</RadioItemTitle>
        {generateRadioOption}
        {value.required && <Warning content={chtTitle} hasErr={value.hasErr} />}
      </RadioItemWrapper>
    );
  }
);
