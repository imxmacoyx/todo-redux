import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { crear } from '../todo.actions';
import { AppState } from '../../app.reducer';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrl: './todo-add.component.scss'
})
export class TodoAddComponent {

  textoInputControl!: FormControl;

  constructor(private readonly store: Store<AppState>){
    this.textoInputControl = new FormControl('', [Validators.required]);
  }

  agregar(){

    if (this.textoInputControl.invalid) return;

    this.store.dispatch(crear({texto: this.textoInputControl.value }));

    this.textoInputControl.reset();
  }
  
}
