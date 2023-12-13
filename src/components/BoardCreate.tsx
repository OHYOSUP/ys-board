import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useRecoilValue, useRecoilState } from "recoil";
import { boardState } from "../atom";
import styled from "styled-components";

const BoardCreateInput = styled.input`
  width: 17vw;
  padding: 10px;
`;

function BoardCreate() {
  const [boards, setBoards] = useRecoilState(boardState);
  const { register, resetField, handleSubmit } = useForm();
  const navigage = useNavigate();
  const onValid = (data: any) => {
    setBoards((allBoard) => {
      const newBoard = {
        id: Date.now() + "",
        boardName: data.boardName,
        todoBoard: [],
      };
      return [...allBoard, newBoard];
    });
    resetField("boardName");
    navigage(`/${data.boardName}`);
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <BoardCreateInput
        {...register("boardName", { required: true })}
        placeholder="보드 이름을 입렵하세요"
      />
    </form>
  );
}

export default BoardCreate;
