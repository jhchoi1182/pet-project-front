import { Comment } from "@/types/model/comment";
import React from "react";
import PostDetailButton from "./PostDetailButton";
import useUpdateCommentController from "@/controller/commentController/useUpdateCommentController";
import CommentForm from "../molecules/CommentForm";
import useDeleteCommentController from "@/controller/commentController/useDeleteCommentController";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { setOpenCommentEditor } from "@/redux/modules/commentSlice";

interface CommentItemProps {
  postId: number;
  comment: Comment;
}

export default function CommentItem({ postId, comment: { commentId, nickname, createdAt, comment } }: CommentItemProps) {
  const openCommentEditor = useSelector(({ commentSlice }: RootState) => commentSlice.openCommentEditor);
  const dispatch = useDispatch();
  const { mutate: updateMutate } = useUpdateCommentController(postId, commentId);
  const { mutate: deleteMutate } = useDeleteCommentController(postId, commentId);

  const editComment = (editedComment: string) => {
    updateMutate(editedComment);
    dispatch(setOpenCommentEditor(null));
  };

  const deleteComment = () => {
    if (!window.confirm("댓글을 삭제하시겠습니까?")) return;
    deleteMutate();
  };

  return (
    <div className="relative">
      <div className="absolute top-0 right-0 flex gap-3">
        {openCommentEditor !== commentId && <PostDetailButton onClick={() => dispatch(setOpenCommentEditor(commentId))}>수정</PostDetailButton>}
        <PostDetailButton onClick={deleteComment}>삭제</PostDetailButton>
      </div>
      <div className={`flex gap-5 mt-6 text-body04`}>
        <span>{nickname}</span>
        <span>{createdAt}</span>
      </div>
      <div className={`mt-10 ml-[6px] leading-6`}>
        {openCommentEditor === commentId ? <CommentForm type="update" onSubmit={editComment} initialComment={comment} /> : <span>{comment}</span>}
      </div>
      <hr className={`mt-10 bg-primary`} />
    </div>
  );
}
