import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { filtrosValidos, setFilter } from '../../filtro/filtro.actions';
import { borrarCompletados } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrl: './todo-footer.component.scss'
})
export class TodoFooterComponent implements OnDestroy{

  private filtroSubscription!: Subscription;
  private todosSubscription!: Subscription;
  filtroActual: filtrosValidos = filtrosValidos.TODOS;
  filtros: filtrosValidos[] = [ filtrosValidos.TODOS, filtrosValidos.COMPLETADOS, filtrosValidos.PENDIENTES];
  pendientes: number = 0;

  constructor(private readonly store: Store<AppState>){
    this.filtroSubscription = this.store.select('filtro').subscribe( filtro => {
      this.filtroActual = filtro;
    });

    this.todosSubscription = this.store.select('todos').subscribe( todos => {
      this.pendientes = todos.filter( todo => !todo.completado).length
    });
  }

  setFiltro(filtro: filtrosValidos){
    this.store.dispatch(setFilter({ filter: filtro}));
  }

  borrarCompletados(){
    this.store.dispatch(borrarCompletados());
  }

  ngOnDestroy(): void {
    if(this.filtroSubscription){
      this.filtroSubscription.unsubscribe();
    }

    if(this.todosSubscription){
      this.todosSubscription.unsubscribe();
    }
  }
}
