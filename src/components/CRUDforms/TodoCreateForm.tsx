import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { boardState } from "../../atom";
import { useParams } from "react-router";

function TodoCreateForm({ todoBoard }: any) {
  const {
    handleSubmit,
    register,
    resetField,
    formState: { errors },
  } = useForm();
  const { boardName } = useParams();  
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
  console.log(errors[`todo${todoBoard.id}`]?.message);
  return (
    <>
      <form onSubmit={handleSubmit((data) => onValid(data, todoBoard.id))}>
        <input
          {...register(`todo${todoBoard.id}`, {
            required: "할 일을 한 글자 이상 입력하세요",
          })}
          placeholder="할 일을 입력하세요"
        />
        <button type="submit">Enter</button>
      </form>
      {errors[`todo${todoBoard.id}`]?.message}
    </>
  );
}

export default TodoCreateForm;
