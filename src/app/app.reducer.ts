import { ActionReducerMap } from "@ngrx/store";
import { Todo } from "./todos/models/todo.models";
import { todoReducer } from './todos/todo.reducer';
import { filtroReducer } from "./filtro/filtro.reducer";
import { filtrosValidos } from "./filtro/filtro.actions";

export interface AppState {
    todos: Todo[],
    filtro: filtrosValidos
}

export const appReducer: ActionReducerMap<AppState>  = {
    todos: todoReducer,
    filtro: filtroReducer
}