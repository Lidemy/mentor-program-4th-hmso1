import styled from "styled-components";
import { Warning } from "../Warning/";
import { memo } from "react";

export const InputItemWrapper = styled.div`
  padding-bottom: 50px;
`;

export const InputLable = styled.label`
  font-size: 20px;
  display: block;

  ${(props) =>
    props.required &&
    `
  &::after {
    content: "*";
    color: #e74149;
    margin-left: 5px;
  `}
  }
`;

const InputLabelRemark = styled.p`
  font-size: 14px;
  padding-top: 12px;
`;

const Input = styled.input`
  width: 287px;
  height: 23px;
  padding: 5px 3px 3px 5px;
  margin-top: 20px;
  border: 1px solid #d0d0d0;
  font-size: 16px;
  display: block;
`;

export const InputItem = memo(
  ({ id, value, chtTitle, placeholder, onChange, subDesc = false, type }) => {
    return (
      <InputItemWrapper>
        <InputLable htmlFor={id} required={value.required}>
          {chtTitle}
        </InputLable>
        {subDesc && <InputLabelRemark>{subDesc}</InputLabelRemark>}
        <Input
          id={id}
          name={id}
          value={value.content}
          placeholder={placeholder}
          onChange={onChange}
          type={type}
        />
        {value.required && <Warning content={chtTitle} hasErr={value.hasErr} />}
      </InputItemWrapper>
    );
  }
);
