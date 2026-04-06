import { createAction, props } from "@ngrx/store";
import { NumbersInterface } from "../interfaces/numbers.interface";

//props<>() = defines all other meta-data to describe the Action.
//Here: it passes the 'payload' to the Reducer-function.
//createAction() returns an Action-Interface when called with property: { type: string }
export const setData = createAction('[EvenOrOdd Component] Set Data', props<{ payload: NumbersInterface }>());

export const showEven = createAction('[EvenOrOdd Component] Show Even');
export const showOdd = createAction('[EvenOrOdd Component] Show Odd');
