import { createReducer, on } from '@ngrx/store';
import { BooksApiActions, PostsApiActions } from '../actions/books.actions';
import { BookInterface, PostInterface } from '../interfaces/book.interface'; 

//initialState is an empty array.
export const initialState: ReadonlyArray<BookInterface> = [];

export const booksReducer = createReducer(
  initialState,
  on(BooksApiActions.retrievedBookList, (_state, { books }) => books)
);

export const postsInitialState: ReadonlyArray<PostInterface> = [];
export const postsReducer = createReducer(
  postsInitialState,
  on(PostsApiActions.retrievedPostList, (_state, { posts }) => posts)
);
