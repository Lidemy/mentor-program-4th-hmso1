import styled from "styled-components";
import { memo } from "react";

const FormDescWrapper = styled.div`
  padding-top: 54px;
`;

const FormDescTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  padding-bottom: 35px;
`;

const FormDescDate = styled.p`
  font-size: 14px;
`;

const FormDescAddress = styled.p`
  font-size: 14px;
  padding-top: 11px;
  padding-bottom: 22px;
`;

const FormDescRequired = styled.p`
  font-size: 16px;
  color: #e74149;
  padding-bottom: 55px;
`;

export const FormDesc = memo(() => {
  return (
    <FormDescWrapper>
      <FormDescTitle>新拖延運動報名表單</FormDescTitle>
      <FormDescDate>活動日期：2020/12/10 ~ 2020/12/11 </FormDescDate>
      <FormDescAddress>活動日期：2020/12/10 ~ 2020/12/11 </FormDescAddress>
      <FormDescRequired>*必填</FormDescRequired>
    </FormDescWrapper>
  );
});
