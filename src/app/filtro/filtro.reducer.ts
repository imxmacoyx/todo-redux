import { createReducer, on } from '@ngrx/store';
import {  filtrosValidos, setFilter } from './filtro.actions';

export const initialState: filtrosValidos = filtrosValidos.TODOS;

export const filtroReducer = createReducer<filtrosValidos>(
  initialState,
  on(setFilter, ( state, { filter }) => {
        
    let returnValue;
    if( filtrosValidos.COMPLETADOS === filter ||
         filtrosValidos.PENDIENTES === filter ||
         filtrosValidos.TODOS === filter ) {
        returnValue = filter;
    } else {
        returnValue = filtrosValidos.TODOS;
    }
    return returnValue;
})
);