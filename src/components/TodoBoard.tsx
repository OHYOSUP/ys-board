import styled from "styled-components";
import { ITodos, boardState } from "../atom";
import { selector, useRecoilState, useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";
import Todos from "./Todos";
import TodoCreateForm from "./CRUDforms/TodoCreateForm";

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
const TodoList = styled.ul`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-item: center;
  gap: 10px;
  padding: 0;
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
                <p>{todoBoard.todoBoardTitle}</p>
                <TodoCreateForm todoBoard={todoBoard} />

                <TodoList>
                  {todoBoard.todos.map((todo: ITodos) => (
                    <Todos
                      key={todo.id}
                      id={todo.id}
                      todoBoardId={todoBoard.id}
                      todoText={todo.todoText}
                    />
                  ))}
                </TodoList>
              </TodoBoardWrapper>
            ))}
          </TodoBoardGridContainer>
        ))}
    </div>
  );
}

export default TodoBoard;
