import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { boardState } from "../../atom";
import styled from "styled-components";
import { useNavigate } from "react-router";

const BoardEditInput = styled.input`
  width: 100%;
  padding: 5px;
`;

function BoardEditForm({ boardName, toggleBoardEdit }: any) {
  const { register, handleSubmit } = useForm();
  const [boards, setBoards] = useRecoilState(boardState);
  const navigate = useNavigate();
  const onValid = ({ editBaord }: any) => {
    setBoards((prevBoard) => {
      return prevBoard.map((board) =>
        board.boardName === boardName
          ? {
              ...board,
              boardName: editBaord,
            }
          : board
      );
    });
    navigate(`/${editBaord}`);
    toggleBoardEdit();
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <BoardEditInput {...register(`editBaord`)} />
    </form>
  );
}

export default BoardEditForm;
