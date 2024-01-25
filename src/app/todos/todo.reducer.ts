import { createReducer, on } from '@ngrx/store';
import { borrar, borrarCompletados, crear, editar, toggle, toggleAll } from './todo.actions';
import { Todo } from './models/todo.models';

export const initialState: Todo[] = [];

export const todoReducer = createReducer(
  initialState,
  on(crear, (state, { texto }) => [...state, new Todo(texto)]),
  on(toggle, (state, { id }) => {
    return state.map( (todo) => {
      if ( todo.id === id ){
        return {
          ...todo,
          completado: !todo.completado
        }
      }else{
        return todo;
      }
    });
  }),
  on(editar, (state, { id, texto }) => {
    return state.map( (todo) => {
      if ( todo.id === id ){
        return {
          ...todo,
          texto: texto
        }
      }else{
        return todo;
      }
    });
  }),
  on(borrar, (state, { id }) => state.filter( todo => todo.id !== id)),
  on ( toggleAll, ( state, { completado } ) => state.map( todo => {    
    return {
      ...todo,
      completado: completado,
    };
  }) ) ,
  on(borrarCompletados, (state) => state.filter( todo => !todo.completado)),
);