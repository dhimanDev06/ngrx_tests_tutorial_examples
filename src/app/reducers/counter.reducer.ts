//Import from '@ngrx/store';
import { createReducer, on } from '@ngrx/store';
//increment, decrement, reset => this are consts/actions from file: counter.action.ts
import { increment, decrement, reset } from '../actions/counter.actions';

//default/initial-state of the counter
export const initialState = 0;

//Create reducer with createReducer() method.
//With on() method Actions (first parameter) are associated with a specific state-change-function (that is the last parameter).
export const counterReducer = createReducer(
  initialState,
  on(increment, (state) => state + 1),
  on(decrement, (state) => state - 1),
  on(reset, (state) => 0)
);