import { useCallback, useState } from "react";

export default function useForm() {
  const [nickname, setNickname] = useState({
    content: "",
    hasErr: false,
    required: true,
  });
  const [email, setEmail] = useState({
    content: "",
    hasErr: false,
    required: true,
  });
  const [mobile, setMobile] = useState({
    content: "",
    hasErr: false,
    required: true,
  });
  const [source, setSource] = useState({
    content: "",
    hasErr: false,
    required: true,
  });
  const [other, setOther] = useState({
    content: "",
    hasErr: false,
    required: false,
  });
  const [registerType, setRegisterType] = useState({
    content: "",
    hasErr: false,
    required: true,
  });

  const onChange = useCallback((e) => {
    switch (e.target.name) {
      case "nickname":
        setNickname((nickname) => ({
          ...nickname,
          content: e.target.value,
          hasErr: false,
        }));
        break;
      case "email":
        setEmail((email) => ({
          ...email,
          content: e.target.value,
          hasErr: false,
        }));
        break;
      case "mobile":
        setMobile((mobile) => ({
          ...mobile,
          content: e.target.value,
          hasErr: false,
        }));
        break;
      case "register-type":
        setRegisterType((registerType) => ({
          ...registerType,
          content: e.target.value,
          hasErr: false,
        }));
        break;
      case "source":
        setSource((source) => ({
          ...source,
          content: e.target.value,
          hasErr: false,
        }));
        break;
      case "other":
        setOther((other) => ({
          ...other,
          content: e.target.value,
          hasErr: false,
        }));
        break;
      default:
        return;
    }
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const list = [nickname, email, mobile, source, registerType];
      const setList = [
        setNickname,
        setEmail,
        setMobile,
        setSource,
        setRegisterType,
      ];
      let isValid = true;
      for (let i = 0; i < list.length; i++) {
        if (list[i].content === "") {
          setList[i]({ content: "", hasErr: true, required: list[i].required });
          isValid = false;
        }
      }
      if (!isValid) return;

      alert(`
    暱稱: ${nickname.content}
    電子郵件: ${email.content}
    手機號碼: ${mobile.content}
    報名類型: ${source.content}
    怎麼知道這個活動的: ${registerType.content}
    其他: ${other.content}
    `);
    },
    [email, mobile, nickname, other, registerType, source]
  );

  return {
    nickname,
    email,
    mobile,
    registerType,
    source,
    other,
    onChange,
    handleSubmit,
  };
}
