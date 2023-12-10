import { atom } from "recoil";

interface ITodoBoard {
  id: string;
  todoBoardTitle: string;
}

interface IBoardState {
  id: string;
  boardName: string;
  todoBoard: ITodoBoard[];
}


export const boardState = atom<IBoardState[]>({
  key: "baord",
  default: [],
});
