import { Component } from '@angular/core';
import { decrement, increment, reset } from '../../../store/counter/counter.actions';
import { Store } from '@ngrx/store';
import { selectCounter } from '../../../store/counter/counter.selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-counter-component',
  imports: [AsyncPipe],
  template: `
    <div class="counter-container">
      <h1>Counter: {{ counter$ | async }}</h1>
      <button (click)="increment()">Increment</button>
      <button (click)="decrement()">Decrement</button>
      <button (click)="reset()">Reset</button>
    </div>
  `,
  styleUrl: './counter-component.css'
})
export class CounterComponent {
  counter$;
  constructor(private store: Store) {
    this.counter$ = this.store.select(selectCounter);
  }


  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }

}
