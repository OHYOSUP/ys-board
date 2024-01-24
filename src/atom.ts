import { atom } from "recoil";

export interface ITodos {
  id: string;
  todoText: string;
}

export interface ITodoBoard {
  id: string;
  todoBoardTitle: string;
  todos: ITodos[];
}

export interface IBoardState {
  id: string;
  boardName: string;
  todoBoard: ITodoBoard[];
}

export const boardState = atom<IBoardState[]>({
  key: "board",
  default: [],
});
