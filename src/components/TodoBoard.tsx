import styled from "styled-components";
import { boardState } from "../atom";
import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
const TodoBoardWrapper = styled.div`
  margin: 20px;
  width: 300px;
  height: 400px;
  background-color: #777;
`;
const TodoBoardGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;
function TodoBoard() {
  const { register, handleSubmit, resetField } = useForm();
  const { boardName } = useParams();
  const [boards, setBoards] = useRecoilState(boardState);

  const onValid = (data: any, todoBoardId: string) => {
    const newTodo = {
      id: Date.now() + "",
      todoText: data[`todoItem-${todoBoardId}`],
    };
    boards.map((board) =>
      board.todoBoard.map((todoBoard) => {
        console.log(todoBoard.id, todoBoardId);
      })
    );
    console.log(data);
    setBoards((prevBoards) => {
      return prevBoards.map((board) =>
        board.boardName === boardName
          ? {
              ...board,
              todoBoard: board.todoBoard.map((todoBoard) =>
                //! todoItem 생성 오류
                todoBoard.id === todoBoardId
                  ? { ...todoBoard, todos: [...todoBoard.todos, newTodo] }
                  : todoBoard
              ),
            }
          : board
      );
    });

    resetField("todoItem");
  };
  return (
    <div>
      {boards
        .filter((v) => v.boardName === boardName)
        .map((board) => (
          <TodoBoardGridContainer key={board.id}>
            {board.todoBoard.map((todoBoard) => (
              <TodoBoardWrapper key={todoBoard.id}>
                <form
                  onSubmit={handleSubmit((data) => onValid(data, todoBoard.id))}
                >
                  <input
                    {...register(`todoItem-${todoBoard.id}`, {
                      required: true,
                    })}
                    placeholder="할 일을 입력하세요"
                  />
                  <button type="submit">Enter</button>
                </form>
                {todoBoard.todoBoardTitle}
                <ul>
                  {todoBoard.todos.map((todo) => (
                    <li key={todo.id}>{todo.todoText}</li>
                  ))}
                </ul>
              </TodoBoardWrapper>
            ))}
          </TodoBoardGridContainer>
        ))}
    </div>
  );
}

export default TodoBoard;
