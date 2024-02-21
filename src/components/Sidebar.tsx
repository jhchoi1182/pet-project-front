"use client";

import React from "react";
import Button from "./atoms/base/Button";
import Link from "next/link";
import Input from "./atoms/base/Input";
import { useRecoilState } from "recoil";
import { modalAtom } from "@/stateStore/commonAtom";
import AuthModal from "./loginSignup/template/AuthModal";
import Logo from "./atoms/Logo";

export default function Sidebar() {
  const [activeLoginModal, setActiveLoginModal] = useRecoilState(modalAtom);

  return (
    <section className={`flex flex-col items-center w-[28%] h-full`}>
      <Link href={`/home`} className="mt-16">
        <Logo />
      </Link>
      <div className={`mt-[60px]`}>
        <Button onClick={() => setActiveLoginModal(true)}>로그인</Button>
      </div>
      <form className={`flex flex-col w-[70%] h-full mt-20`}>
        <div className="w-full">
          <Input variant="post" label="제목" name="title" isPost>
            <Input.TextField variant="post" />
          </Input>
        </div>
        <div className={`flex flex-col w-full h-full`}>
          <div className={`mt-10 w-full h-full`}>
            <Input variant="post" label="내용" name="contents" isPost>
              <Input.TextArea variant="post" />
            </Input>
          </div>
          <div className={`pt-14 self-end mt-auto mb-[14px]`}>
            <Button>작성하기</Button>
          </div>
        </div>
      </form>
      {activeLoginModal && <AuthModal />}
    </section>
  );
}
