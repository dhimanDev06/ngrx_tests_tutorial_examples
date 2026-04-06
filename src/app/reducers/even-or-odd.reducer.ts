import { createReducer, on } from "@ngrx/store";
import { setData, showEven, showOdd } from "../actions/even-or-odd.actions";
import { NumbersInterface } from "../interfaces/numbers.interface";

export const initialState: NumbersInterface = { 
    minimum: 0, 
    maximum: 10, 
    numbers: [],
    isEven: true 
}

//Below: the on() method determines which Action will be handled.
export const evenOrOddReducer = createReducer(
    initialState,
    on(setData, (state, {payload}) => 
        ({...state, minimum: payload.minimum, maximum: payload.maximum, numbers: payload.numbers, isEven: payload.isEven})
    ),
    on(showEven, (state) => {
        return state = { ...state, numbers: state.numbers.filter((item: number) => item % 2 === 0) };
    }),
    on(showOdd, (state => {
        return state = { ...state, numbers: state.numbers.filter((item: number) => item % 2 === 1) };
    }))
);
