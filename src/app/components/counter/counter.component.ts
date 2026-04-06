import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { decrement, increment, reset } from '../../actions/counter.actions';
import { CommonModule } from '@angular/common';
import { BackToHomeComponent } from '../back-to-home/back-to-home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-counter',
  imports: [
    CommonModule,
    BackToHomeComponent,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent implements OnInit {

  //data-stream undefined, initialState from Reducer.
  count$?: Observable<number>; 

  //Inject the store here, 1) to dispatch Actions and 2) to select the current state of 'count'.
  private store = inject(Store<{ count: number }>);

  ngOnInit() : void {
    this.count$ = this.store.select(store => store.count);
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