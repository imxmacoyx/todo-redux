import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { toggleAll } from '../todo.actions';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrl: './todo-page.component.scss'
})
export class TodoPageComponent {

  completado: boolean = false;

  constructor(private  readonly store: Store<AppState>){}

  toggleAll(){
    this.completado = !this.completado;
    this.store.dispatch(toggleAll({completado: this.completado}));
  }
}
