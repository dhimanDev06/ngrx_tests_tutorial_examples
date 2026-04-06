import { createSelector, createFeatureSelector } from '@ngrx/store';
import { BookInterface, PostInterface } from '../interfaces/book.interface';

export const selectBooks = createFeatureSelector<ReadonlyArray<BookInterface>>('books');

export const selectCollectionState = createFeatureSelector<ReadonlyArray<string>>('collection');

export const selectPosts = createFeatureSelector<ReadonlyArray<PostInterface>>('posts');
//Note: when using createSelector() or createFeatureSelector(), then @ngrx/store keeps the last 
//arguments in the memory with which the the Selector-function was called. This is: 'memoization'.

//The method createSelector() is used to select data/slices of the state. This method accepts 8 other
//Selector-functions. Selector-functions produce up-to-date data.
export const selectBookCollection = createSelector(
  selectBooks,
  selectCollectionState,
  (books, collection) => {
    return collection.map((id) => books.find((book) => book.id === id)!);
  }
);
