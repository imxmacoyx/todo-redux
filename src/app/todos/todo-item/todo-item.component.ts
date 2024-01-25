import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import * as actions from '../todo.actions';

import { Subscription, filter, map } from 'rxjs';
import { AppState } from '../../app.reducer';
import { Todo } from '../models/todo.models';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent implements OnInit, OnDestroy {

  @Input({ required: true }) todo!: Todo;
  @ViewChild('inputFisico') txtInputFisico!: ElementRef;
  private todoSubscription!: Subscription;


  chkCompletado!: FormControl;
  txtInput!: FormControl;

  editando: boolean = false;

  constructor( private readonly store: Store<AppState>) { }

  ngOnInit(): void {

    this.chkCompletado = new FormControl( this.todo.completado );
    this.txtInput = new FormControl( this.todo.texto, Validators.required );

    this.chkCompletado.valueChanges.subscribe( valor => {
      this.store.dispatch( actions.toggle({ id: this.todo.id }) );
    });

    this.todoSubscription = this.store.select('todos').pipe(
      map(todos => todos.find(t => t.id === this.todo.id)),
      filter(todo => !!todo)
    ).subscribe(todo => {
      if (this.chkCompletado.value !== todo?.completado) {
        this.chkCompletado.setValue(todo?.completado, { emitEvent: false });
      }
    });

  }

  editar() {

    this.editando = true;
    this.txtInput.setValue( this.todo.texto );

    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();
    }, 1);

    
  }

  terminarEdicion() {
    this.editando = false;

    if( this.txtInput.invalid ) { return; }
    if( this.txtInput.value === this.todo.texto ) { return; }


    this.store.dispatch( 
      actions.editar({
        id: this.todo.id,
        texto: this.txtInput.value
      })
    );

    
  }

  borrar() {

    this.store.dispatch( actions.borrar({ id: this.todo.id }) );

    
  }

  ngOnDestroy(): void {
    if (this.todoSubscription) {
      this.todoSubscription.unsubscribe();
    }
  }



}
