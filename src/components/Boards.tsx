import { useRecoilValue, useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { boardState } from "../atom";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function Boards() {
  const [boards, setBoards] = useRecoilState(boardState);
  const { register, resetField, handleSubmit } = useForm();
  const navigage = useNavigate();
  const onValid = (data: any) => {
    setBoards((allBoard) => {
      const newBoard = {
        id: Date.now() + "",
        boardName: data.boardName,
        todoBoard:[]
      };
      return [...allBoard, newBoard];
    });
    resetField("boardName");
    navigage(`/${data.boardName}`)
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("boardName", { required: true })}
          placeholder="보드 이름을 입렵하세요"
        />
        <button type="submit">엔터</button>
      </form>

      <ul>
        {boards.map((board, index) => (
          <Link key={index} to={`/${board.boardName}`}>
            <li>{board.boardName}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Boards;
