import { createReducer, on } from '@ngrx/store';
import { BooksActions } from '../actions/books.actions';

export const initialState: ReadonlyArray<string> = [];

export const collectionReducer = createReducer(
  initialState,
  //This first on() methode prevents duplicate ID's.
  //on() method = when an Action is sent, then all registered Reducers will receive the Action.
  //The on() method determines which Action will be handled.
  on(BooksActions.removeBook, (state, { bookId }) =>
    state.filter((id) => id !== bookId)
  ),
  on(BooksActions.addBook, (state, { bookId }) => {
    if (state.indexOf(bookId) > -1) return state;

    return [...state, bookId];
  })
);