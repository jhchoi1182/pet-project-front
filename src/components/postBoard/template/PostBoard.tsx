"use client";

import BoardLoadingSpinner from "@/components/atoms/BoardLoadingSpinner";
import { useGetPostsController } from "@/controller/postController/useGetPostsController";
import React from "react";
import PostList from "../molecules/PostList";
import PaginationNumGroup from "../molecules/PaginationNumGroup";

export default function PostBoard() {
  const { data, isLoading } = useGetPostsController();
  const { content = [], totalPages = 0 } = data ?? {};

  return (
    <>
      <section className={`w-[80%] h-board rounded-tr-[20px] rounded-b-[20px] bg-inverse text-body03`}>
        <header className={`flex items-center w-full h-[10%] font-semibold border-b-[1px] border-black`}>
          <div className={`w-[70%] text-center`}>제목</div>
          <div className={`w-[15%] text-center`}>작성자</div>
          <div className={`w-[15%] text-center`}>작성일</div>
        </header>
        {!isLoading ? <PostList posts={content} /> : <BoardLoadingSpinner />}
      </section>
      <PaginationNumGroup totalPages={totalPages} />
    </>
  );
}
