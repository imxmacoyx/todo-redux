import { createAction, props } from '@ngrx/store';
 
export enum filtrosValidos {
        TODOS = 'todos',
        COMPLETADOS = 'completados',
        PENDIENTES = 'pendientes'
}
 
export const setFilter = createAction('[Filtro] Set Filtro',
    props<{ filter: filtrosValidos }>()    
);
