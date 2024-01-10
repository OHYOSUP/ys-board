import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { boardState } from "../atom";
import { useParams } from "react-router-dom";

function TodoBoardForm({ todoBoard }: any) {
  const { boardName } = useParams();

  const { register, handleSubmit, resetField } = useForm();
  const [boards, setBoards] = useRecoilState(boardState);
  const onValid = (data: any, todoBoardId: string) => {
    console.log("onvalid", todoBoardId);
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
      <ul>
        {todoBoard.todos.map((todo: any) => (
          <li key={todo.id}>{todo.todoText}</li>
        ))}
      </ul>
    </>
  );
}

export default TodoBoardForm;
