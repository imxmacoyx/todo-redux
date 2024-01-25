import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';

import { Todo } from '../models/todo.models';
import { filtrosValidos } from '../../filtro/filtro.actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit, OnDestroy{

  todos$!: Observable<Todo[]>;
  filtroActual!: filtrosValidos;
  private filtroSubscription!: Subscription;

  constructor(private readonly store: Store<AppState>){
  }

  ngOnInit(): void {
    this.todos$ = this.store.select('todos');
    this.filtroSubscription = this.store.select('filtro').subscribe( filtro => {
      this.filtroActual = filtro;
    });
  }

  ngOnDestroy(): void {
    if (this.filtroSubscription){
      this.filtroSubscription.unsubscribe();
    }
  }

}
