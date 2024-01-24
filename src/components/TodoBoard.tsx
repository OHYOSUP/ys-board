import styled from "styled-components";
import { boardState } from "../atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";
import TodoBoardForm from "./TodoBoardForm";

const TodoBoardWrapper = styled.div`
  margin: 20px;
  width: 300px;
  height: 400px;
  background-color: #777;
`;
const TodoBoardGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;
function TodoBoard() {
  const { boardName } = useParams();
  const boards = useRecoilValue(boardState);  

  return (
    <div>
      {boards
        .filter((v) => v.boardName === boardName)
        .map((board) => (
          <TodoBoardGridContainer key={board.id}>
            {board.todoBoard.map((todoBoard) => (
              <TodoBoardWrapper key={todoBoard.id}>
                <TodoBoardForm todoBoard={todoBoard} />
              </TodoBoardWrapper>
            ))}
          </TodoBoardGridContainer>
        ))}
    </div>
  );
}

export default TodoBoard;
