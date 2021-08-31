import styled from "styled-components";
import { FormDesc } from "../FormDesc";
import { InputItem } from "../InputItem";
import { RadioItem } from "../RadioItem";
import useForm from "../../hooks/useForm/useForm";
import { useMemo } from "react";

const FormWrapper = styled.form`
  background: white;
  width: 645px;
  margin: 121px auto 66px;
  border-top: 8px solid #fad312;
  box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  padding-left: 42px;
`;

const FormButton = styled.button`
  width: 92px;
  height: 40px;
  background-color: #fad312;
  border-radius: 3px;
  border: 1px solid #fad312;
  font-size: 15px;
`;

const FormWarning = styled.p`
  padding: 21px 0 35px;
`;

const Footer = styled.footer`
  background: #000;
  line-height: 60px;
  color: #999999;
  text-align: center;
  font-size: 13px;
`;

export default function App() {
  const {
    nickname,
    email,
    mobile,
    registerType,
    source,
    other,
    onChange,
    handleSubmit,
  } = useForm();

  return (
    <div>
      <FormWrapper onSubmit={handleSubmit}>
        <FormDesc />
        <InputItem
          id="nickname"
          value={nickname}
          chtTitle="暱稱"
          placeholder="您的回答"
          onChange={onChange}
          type="text"
        />
        <InputItem
          id="email"
          value={email}
          chtTitle="電子郵件"
          placeholder="您的電子郵件"
          onChange={onChange}
          type="email"
        />
        <InputItem
          id="mobile"
          value={mobile}
          chtTitle="手機號碼"
          placeholder="您的手機號碼"
          onChange={onChange}
          type="text"
        />
        <RadioItem
          name="register-type"
          optionsText={useMemo(
            () => ["躺在床上用想像力實作", "趴在地上滑手機找現成的"],
            []
          )}
          options={useMemo(() => ["register-type-01", "register-type-02"], [])}
          chtTitle={"報名類型"}
          value={registerType}
          onChange={onChange}
        />
        <InputItem
          id="source"
          value={source}
          chtTitle="怎麼知道這個活動的？"
          placeholder="您的回答"
          onChange={onChange}
          type="text"
        />
        <InputItem
          id="other"
          value={other}
          chtTitle="其他"
          placeholder="您的回答"
          onChange={onChange}
          required={false}
          subDesc="對活動的一些建議"
          type="text"
        />
        <FormButton>提交</FormButton>
        <FormWarning>請勿透過表單送出您的密碼。</FormWarning>
      </FormWrapper>

      <Footer>© 2020 © Copyright. All rights Reserved.</Footer>
    </div>
  );
}
