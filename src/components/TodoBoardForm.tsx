import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { ITodos, boardState } from "../atom";
import { useParams } from "react-router-dom";
import Todos from "./Todos";
import styled from "styled-components";

const TodoList = styled.ul`
  width: 100%;
  height: 100%;
  
  display: flex;
  flex-direction: column;
  align-item: center;
  gap: 10px;  
  padding: 0;
`;

function TodoBoardForm({ todoBoard }: any) {
  const { boardName } = useParams();

  const { register, handleSubmit, resetField } = useForm();
  const [boards, setBoards] = useRecoilState(boardState);
  const onValid = (data: any, todoBoardId: string) => {
    
    const newTodo = {
      id: Date.now() + "",
      todoText: data?.[`todo${todoBoardId}`],
    };

    setBoards((prevBoards) => {
      return prevBoards.map((board) =>
        board.boardName === boardName
          ? {
              ...board,
              todoBoard: board.todoBoard.map((todoBoard) =>
                todoBoard.id === todoBoardId
                  ? { ...todoBoard, todos: [...todoBoard.todos, newTodo] }
                  : todoBoard
              ),
            }
          : board
      );
    });
    resetField(`todo${todoBoard.id}`);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(
          (data) => onValid(data, todoBoard.id),
          (errors) => console.log("fail", errors)
        )}
      >
        <input
          {...register(`todo${todoBoard.id}`)}
          placeholder="할 일을 입력하세요"
        />
        <button type="submit">Enter</button>
      </form>
      <TodoList>
        {todoBoard.todos.map((todo: ITodos) => (
          <Todos key={todo.id} id={todo.id} todoBoardId={todoBoard.id} todoText={todo.todoText} />
        ))}
      </TodoList>
    </>
  );
}

export default TodoBoardForm;
