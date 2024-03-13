"use client";

import Button from "@/components/atoms/base/Button";
import { loginModalAtom, loggedInNicknameAtom, isRemovedNicknameCookieAtom, isSocialLoginInProgressAtom } from "@/stateStore/commonAtom";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import UserOptionsDropdown from "../molecules/UserOptionsDropdown";
import { cookieUtils } from "@/util/cookieUtils";
import useAuthenticationController from "@/controller/authController/useAuthenticationController";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";

const { getCookie } = cookieUtils();

export default function UsernameOrLoginButton() {
  const [isLoading, setIsLoading] = useState(true);
  const [loggedInNickname, setLoggedInNickname] = useRecoilState(loggedInNicknameAtom);
  const isSocialLoginInProgress = useRecoilValue(isSocialLoginInProgressAtom);
  const isRemovedNicknameCookie = useRecoilValue(isRemovedNicknameCookieAtom);
  const setActiveLoginModal = useSetRecoilState(loginModalAtom);

  const { fetchAuth } = useAuthenticationController();

  useEffect(() => {
    setLoggedInNickname(getCookie());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isRemovedNicknameCookie) return;
    fetchAuth();
  }, [isRemovedNicknameCookie]);

  return (
    <>
      {isLoading || isSocialLoginInProgress ? (
        <div className="mt-6">
          <LoadingSpinner />
        </div>
      ) : loggedInNickname ? (
        <div className={`flex gap-2 ml-[10.4px] text-inverse`}>
          <div className={`flex flex-col gap-3 items-center`}>
            <span className={`flex items-center`}>
              <span className={`text-yellow`}>{loggedInNickname}</span>
              <span className={`ml-2`}>님</span>
            </span>
            <p>환영합니다!</p>
          </div>
          <UserOptionsDropdown />
        </div>
      ) : (
        <Button onClick={() => setActiveLoginModal(true)}>로그인</Button>
      )}
    </>
  );
}
