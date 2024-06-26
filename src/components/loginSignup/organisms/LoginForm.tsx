import React, { useState } from "react";
import Logo from "../../atoms/ui/Logo";
import Input from "../../atoms/base/Input";
import Button from "../../atoms/base/Button";
import CloseButton from "../molecules/CloseButton";
import useLoginAxios from "@/service/auth/useLoginAxios";
import { SetStateBoolean } from "@/types/type/utilityTypes";
import SocialLoginIcons from "../molecules/SocialLoginIcons";

interface LoginModalProps {
  setToggleLoginSignup: SetStateBoolean;
}

export default function LoginModal({ setToggleLoginSignup }: LoginModalProps) {
  const [enteredInfo, setEnteredInfo] = useState({
    username: "",
    password: "",
  });
  const [validationTextColor, setValidationTextColor] = useState("text-transparent");
  const { handleUserLogin } = useLoginAxios();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEnteredInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleUserLogin(enteredInfo, setValidationTextColor);
  };

  return (
    <form className={`flex flex-col items-center w-[689px] h-[534px] bg-navy rounded-[10px] shadow-xl`} onSubmit={handleSubmit}>
      <CloseButton />
      <div className={`mt-11`}>
        <Logo />
      </div>
      <div className={`flex flex-col gap-[53px] mt-[55px]`}>
        <Input variant="login" label="아이디" name="username">
          <Input.TextField variant="login" onChange={handleInputChange} required />
        </Input>
        <Input variant="login" label="비밀번호" name="password">
          <Input.TextField variant="login" type="password" onChange={handleInputChange} required />
        </Input>
      </div>
      <div className={`relative flex flex-col justify-center`}>
        <div className={`absolute top-5`}>
          <span className={`text-body03 ${validationTextColor} select-none`}>아이디 또는 비밀번호를 다시 확인해주세요.</span>
        </div>
        <div className={`flex gap-9 mt-[63px]`}>
          <Button>로그인</Button>
          <Button onClick={() => setToggleLoginSignup(false)}>회원가입</Button>
        </div>
        <SocialLoginIcons />
      </div>
    </form>
  );
}
