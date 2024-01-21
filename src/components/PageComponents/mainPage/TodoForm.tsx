"use client";

import { TodoContext } from "@/context/TodoContextProvider";
import { Todos } from "@/types/model/todo";
import { todoApi } from "@/api/todoApi";
import useUpdateFetch from "@/hooks/useUpdateFetch";
import { useContext, useState } from "react";
import Button from "../../base/Button";
import Input from "../../base/Input";

export default function TodoForm() {
  const { setTotalTodo } = useContext(TodoContext);
  const [enteredTodo, setEnteredTodo] = useState({ contents: "", dueDate: "" });
  const { contents, dueDate } = enteredTodo;

  const { mutate } = useUpdateFetch({
    queryKey: "todos",
    queryFn: ({ contents, dueDate }) => todoApi.post(contents, dueDate),
    onSuccess: (data) => {
      setTotalTodo((prev: Todos | undefined) => ({
        ...prev,
        todos: data,
      }));
    },
  });

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (contents === "" || dueDate === "") return;
    const todo = {
      contents,
      dueDate,
    };
    mutate(todo);
    setEnteredTodo({ contents: "", dueDate: "" });
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "dueDate" && isPastDate(value)) {
      alert("과거의 날짜는 선택할 수 없습니다.");
    } else {
      setEnteredTodo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const isPastDate = (value: string) => {
    const selectedDate = new Date(value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return selectedDate < currentDate;
  };

  return (
    <form
      className="flex items-center justify-between h-24 bg-slate-300 rounded-md px-5"
      onSubmit={onSubmitHandler}
    >
      <div className="flex items-center gap-10">
        <Input variant="todo" label="내용" name="contents">
          <Input.TextField variant="todo" value={contents} onChange={onChangeHandler} required />
        </Input>
        <Input variant="todo" label="목표 날짜" name="dueDate">
          <Input.TextField
            variant="todo"
            type="date"
            value={dueDate}
            onChange={onChangeHandler}
            required
          />
        </Input>
      </div>
      <Button size="small">추가하기</Button>
    </form>
  );
}
