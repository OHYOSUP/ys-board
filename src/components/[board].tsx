import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { boardState } from "../atom";
import { useRecoilState } from "recoil";
import styled from "styled-components";

const TodoBoardGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

const TodoBoard = styled.div`
  margin: 20px;
  width: 300px;
  height: 400px;
  background-color: #777;
`;

function Board() {
  const { register, handleSubmit, resetField } = useForm();
  const { boardName } = useParams();

  const [boards, setBoards] = useRecoilState(boardState);

  const onValid = (data: any) => {
    const newTodoBoard = {
      id: Date.now().toString(),
      todoBoardTitle: data.todoBoard,
    };
    setBoards((prevBoards) => {        
        return prevBoards.map((board) =>
          board.boardName === boardName
            ? { ...board, todoBoard: [...board.todoBoard, newTodoBoard] }
            : board
        );
      });
    resetField("todoBoard");
    console.log(boards)
  };

  return (
    <div>
      <h1>{boardName}</h1>
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register("todoBoard")} />
        <button type="submit">Enter</button>
      </form>
      <TodoBoardGridContainer>
        <div>
        
        </div>
      </TodoBoardGridContainer>
    </div>
  );
}

export default Board;
