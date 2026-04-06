//Import from '@ngrx/store';
import { createAction } from '@ngrx/store';

//createAction() : parameter: string = a name for the Action.
export const increment = createAction('[Counter Component] Increment');
export const decrement = createAction('[Counter Component] Decrement');
export const reset = createAction('[Counter Component] Reset');