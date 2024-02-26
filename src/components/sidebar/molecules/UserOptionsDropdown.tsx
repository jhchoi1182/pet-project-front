import { Dropdown } from "@/components/atoms/base/Dropdown";
import DownArrow from "@/components/atoms/icons/DownArrow";
import withdrawController from "@/controller/authController/withdrawController";
import { loggedInNicknameAtom } from "@/stateStore/commonAtom";
import { cookieUtils } from "@/util/cookieUtils";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";

const { removeCookie } = cookieUtils();

export default function UserOptionsDropdown() {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const setLoggedInNickname = useSetRecoilState(loggedInNicknameAtom);

  const handleLogout = () => {
    removeCookie();
    setToggleDropdown(false);
    setLoggedInNickname(null);
  };

  const handleWithdraw = () => {
    withdrawController()({ setToggleDropdown, setLoggedInNickname });
  };

  return (
    <div className={`relative flex`}>
      <button onClick={() => setToggleDropdown(true)}>
        <DownArrow />
      </button>
      {toggleDropdown && (
        <Dropdown setToggleDropdown={setToggleDropdown}>
          <Dropdown.li first onClick={handleLogout}>
            로그아웃
          </Dropdown.li>
          <Dropdown.li end textColor="red" onClick={handleWithdraw}>
            회원 탈퇴
          </Dropdown.li>
        </Dropdown>
      )}
    </div>
  );
}
