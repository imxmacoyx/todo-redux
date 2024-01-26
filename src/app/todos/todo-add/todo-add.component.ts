import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { crear } from '../todo.actions';
import { AppState } from '../../app.reducer';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrl: './todo-add.component.scss',
})
export class TodoAddComponent {
  textoInputControl!: FormControl;

  constructor(private readonly store: Store<AppState>) {
    this.textoInputControl = new FormControl('', [Validators.required]);

    this.textoInputControl.valueChanges.subscribe((value) => {
      if (value && value.includes('\n')) {
        this.agregarTodo(value.replace('\n', ''));
      }
    });
  }

  agregar(event: Event) {
    if (event) {
      event.preventDefault();
    }

    if (this.textoInputControl.invalid) return;

    this.agregarTodo(this.textoInputControl.value);
  }

  private agregarTodo(value: string) {
    if (!value || !value.trim()) return;

    this.store.dispatch(crear({ texto: value.trim() }));
    this.textoInputControl.reset();
  }
}
