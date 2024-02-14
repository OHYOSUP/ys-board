import { useState } from "react";
import { useForm } from "react-hook-form";
import { boardState } from "../../atom";
import { useRecoilState } from "recoil";
import { useParams } from "react-router";
import TodoBoard from "../TodoBoard";

function TodoEditForm({ todoBoardId, todoId, onTodoEdit }: any) {
  const [boards, setBoards] = useRecoilState(boardState);
  const { register, handleSubmit } = useForm();
  // const [toggleTodoEdit, setToggleTodoEdit] = useState(todoEdit)
  
  const { boardName } = useParams();
  

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
      return updatedBoards
    });
    console.log(EditedTodo, boards);
    onTodoEdit()
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input {...register("EditedTodo")} />
    </form>
  );
}

export default TodoEditForm;
