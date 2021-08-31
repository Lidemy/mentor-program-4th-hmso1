import styled from "styled-components";
import { memo } from "react";

const WarningBody = styled.p`
  padding-top: 10px;
  color: red;
  ${(props) => (props.hasErr ? `visibility: visible;` : `visibility: hidden;`)}
`;

export const Warning = memo(({ content, hasErr }) => {
  return <WarningBody hasErr={hasErr}>請填寫{content}</WarningBody>;
});
