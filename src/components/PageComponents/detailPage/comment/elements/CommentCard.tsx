import React, { useState } from "react";
import CommentUpdateButton from "./CommentUpdateButton";
import { Comment } from "@/types/model/comment";
import CommentDeleteButton from "./CommentDeleteButton";

interface CommentListProps {
  todoId: number;
  comment: Comment;
}

export default function CommentCard({
  todoId,
  comment: { commentId, comment, registeredAt },
}: CommentListProps) {
  const [editableComment, setEditableComment] = useState(comment);
  const [toggleEditMode, setToggleEditMode] = useState(false);

  const CommentUpdateButtonProps = {
    todoId,
    commentId,
    commentContents: editableComment,
    toggleEditMode,
    setToggleEditMode,
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEditableComment(value);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <time>{`작성 날짜 : ${registeredAt}`}</time>
        <div className="flex gap-10">
          <CommentUpdateButton {...CommentUpdateButtonProps} />
          <CommentDeleteButton todoId={todoId} commentId={commentId} />
        </div>
      </div>
      {toggleEditMode ? (
        <input
          className="my-5 w-full border border-teal-500 rounded-lg"
          name="comment"
          value={editableComment}
          onChange={onChangeHandler}
        />
      ) : (
        <p className="my-5">{comment}</p>
      )}
    </>
  );
}