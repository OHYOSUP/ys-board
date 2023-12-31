import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { boardState } from "../atom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import TodoBoard from "./TodoBoard";

function Board() {
  const { register, handleSubmit, resetField } = useForm();
  const { boardName } = useParams();

  const [boards, setBoards] = useRecoilState(boardState);

  const onValid = (data: any) => {
    const newTodoBoard = {
      id: Date.now().toString(),
      todoBoardTitle: data.todoBoard,
      todos: [],
    };
    setBoards((prevBoards) => {
      return prevBoards.map((board) =>
        board.boardName === boardName
          ? { ...board, todoBoard: [...board.todoBoard, newTodoBoard] }
          : board
      );
    });
    resetField("todoBoard");
    console.log(boards, data);
  };

  return (
    <div>
      <h1>{boardName}</h1>
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register("todoBoard")} />
        <button type="submit">Enter</button>
      </form>
      <div>
        <TodoBoard />
      </div>
    </div>
  );
}

export default Board;
