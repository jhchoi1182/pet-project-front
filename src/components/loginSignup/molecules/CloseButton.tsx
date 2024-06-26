import React from "react";
import Close from "../../atoms/icons/Close";
import { useDispatch } from "react-redux";
import { setIsOpenLoginModal } from "@/stores/modules/authSlice";

export default function CloseButton() {
  const dispatch = useDispatch();

  return <Close className={`absolute top-5 right-5`} type="button" onClick={() => dispatch(setIsOpenLoginModal(false))} />;
}
