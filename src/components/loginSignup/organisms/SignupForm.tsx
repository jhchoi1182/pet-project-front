import React, { useState } from "react";
import Logo from "../../atoms/ui/Logo";
import Button from "../../atoms/base/Button";
import CloseButton from "../molecules/CloseButton";
import NameInput from "../molecules/NameInput";
import EmailPasswordInput from "../molecules/EmailPasswordInput";
import useSignupAxios from "@/service/auth/useSignupAxios";

export type EnteredInfoType = {
  username: string;
  nickname: string;
  email: string;
  password: string;
  passwordConfirm: string;
};
interface SignupModalProps {
  setToggleLoginSignup: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SignupModal({ setToggleLoginSignup }: SignupModalProps) {
  const [enteredInfo, setEnteredInfo] = useState<EnteredInfoType>({
    username: "",
    nickname: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);
  const { handleSignup } = useSignupAxios();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEnteredInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSignup({
      enteredInfo,
      isUsernameAvailable,
      isNicknameAvailable,
      setToggleLoginSignup,
    });
  };

  return (
    <form className={`flex flex-col items-center w-[689px] h-[710px] bg-navy rounded-[10px] shadow-xl`} onSubmit={handleSubmit}>
      <CloseButton />
      <div className={`mt-11`}>
        <Logo />
      </div>
      <div className={`flex flex-col gap-[50px] mt-[55px]`}>
        <NameInput type="username" value={enteredInfo.username} handleInputChange={handleInputChange} setIsNameAvailable={setIsUsernameAvailable} />
        <NameInput type="nickname" value={enteredInfo.nickname} handleInputChange={handleInputChange} setIsNameAvailable={setIsNicknameAvailable} />
        <EmailPasswordInput type="email" value={enteredInfo.email} handleInputChange={handleInputChange} />
        <EmailPasswordInput type="password" value={enteredInfo.password} handleInputChange={handleInputChange} />
        <EmailPasswordInput type="passwordConfirm" value={enteredInfo.passwordConfirm} password={enteredInfo.password} handleInputChange={handleInputChange} />
      </div>
      <div className={`flex justify-between w-full mt-[45px] px-[45px]`}>
        <Button type="button" onClick={() => setToggleLoginSignup(true)}>
          뒤로가기
        </Button>
        <Button>회원가입</Button>
      </div>
    </form>
  );
}
