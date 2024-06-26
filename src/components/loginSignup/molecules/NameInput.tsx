import Button from "@/components/atoms/base/Button";
import Input from "@/components/atoms/base/Input";
import React, { useEffect, useState } from "react";
import ValidationText from "../atom/ValidationText";
import { validationService } from "@/service/validationService";
import useNameDuplicationCheckAxios from "@/service/auth/useNameDuplicationCheckAxios";
import { SetStateBoolean } from "@/types/type/utilityTypes";

export type NameInputType = "username" | "nickname";
interface NameInputProps {
  type: NameInputType;
  value: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setIsNameAvailable: SetStateBoolean;
}

const label = {
  username: "아이디",
  nickname: "닉네임",
};

const { changeValidationTextColor } = validationService();

export default function NameInput({ type, value, handleInputChange, setIsNameAvailable }: NameInputProps) {
  const [validationTextColor, setValidationTextColor] = useState("text-transparent");
  const [exceptionText, setExceptionText] = useState("");
  const { checkDuplication } = useNameDuplicationCheckAxios();

  const handleNameDuplicationCheck = (type: NameInputType) => {
    checkDuplication(type, value, setExceptionText, setValidationTextColor, setIsNameAvailable);
  };

  useEffect(() => {
    changeValidationTextColor(type, value, setValidationTextColor);
  }, [value]);

  return (
    <div className={`relative`}>
      <div className={`flex gap-[22px]`}>
        <Input variant="signup" label={label[type]} name={type}>
          <Input.TextField variant="primary" onChange={handleInputChange} required />
        </Input>
        <Button size="small" type="button" onClick={() => handleNameDuplicationCheck(type)}>
          중복 확인
        </Button>
      </div>
      <ValidationText type={type} validationTextColor={validationTextColor} exceptionText={exceptionText} />
    </div>
  );
}
