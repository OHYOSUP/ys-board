import { useEffect } from "react";
import { FieldError, useForm } from "react-hook-form";
import { boardState } from "../../atom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useParams } from "react-router";

function TodoEditForm({ todoBoardId, todoId, onTodoEdit, todoText }: any) {
  const { boardName } = useParams();
  const setBoards = useSetRecoilState(boardState);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      EditedTodo: todoText,
    },
  });

  // useEffect(() => {
  //   setError("EditedTodo", {
  //     type: "manual",
  //     message: "한 글자 이상 입력하세요",
  //   });
  // }, [setError]);

  const onValid = ({ EditedTodo }: any) => {
    setBoards((prevBoard) => {
      const updatedBoards = prevBoard.map((board) =>
        board.boardName === boardName
          ? {
              ...board,
              todoBoard: board.todoBoard.map((todoBoard) =>
                todoBoard.id === todoBoardId
                  ? {
                      ...todoBoard,
                      todos: todoBoard.todos.map((todo) =>
                        todo.id === todoId
                          ? {
                              ...todo,
                              todoText: EditedTodo,
                            }
                          : todo
                      ),
                    }
                  : todoBoard
              ),
            }
          : board
      );
      return updatedBoards;
    });
    onTodoEdit();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register("EditedTodo", { required: '한 글자 이상 입력하세요' })} />
      </form>
      {errors.EditedTodo ? <p>{(errors.EditedTodo as FieldError).message}</p> : null}
    </>
  );
}

export default TodoEditForm;
