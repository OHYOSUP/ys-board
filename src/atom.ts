import { atom } from "recoil";

interface ITodos {
    id: string
    todoText: string
}

interface ITodoBoard {
  id: string;
  todoBoardTitle: string;
  todos: ITodos[]
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
