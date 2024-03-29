import PostDetailButton from "@/components/postDetail/atom/PostDetailButton";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import PostEditor from "../atom/PostEditor";
import { SetStateBoolean } from "@/types/type/utilityTypes";
import { extractImages, replaceImgTagWithTempTag } from "@/util/ckeditorImageTransformer";
import useCreatePostController from "@/controller/postController/useCreatePostController";

export default function PostForm({ setIsLoading }: { setIsLoading: SetStateBoolean }) {
  const [title, setTitle] = useState("");
  const [ckEditorData, setCkEditorData] = useState("");
  const router = useRouter();

  const { mutate } = useCreatePostController();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const contents = replaceImgTagWithTempTag(ckEditorData);
    const images = extractImages(ckEditorData);
    if (!window.confirm("글을 게시하시겠습니까?")) return;
    mutate({ title, contents, images });
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <form className={`w-full h-full`} onSubmit={handleSubmit}>
      <div className={`flex justify-between mb-10`}>
        <div className="w-[70%]">
          <input
            className={`w-full px-1 pb-3 border-b-2 text-xl focus:outline-none`}
            placeholder="제목을 입력해주세요."
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex gap-8">
          <PostDetailButton type="button" onClick={() => router.back()}>
            뒤로가기
          </PostDetailButton>
          <PostDetailButton>완료</PostDetailButton>
        </div>
      </div>
      <PostEditor ckEditorData={ckEditorData} setCkEditorData={setCkEditorData} />
    </form>
  );
}