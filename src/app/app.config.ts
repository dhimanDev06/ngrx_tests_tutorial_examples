import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

//When using standalone-components/bootstrap:
//Use: provideStore().
import { provideState, provideStore } from '@ngrx/store';
import { counterReducer } from './reducers/counter.reducer';
import { booksReducer, postsReducer } from './reducers/books.reducer';
import { collectionReducer } from './reducers/collection.reducer';
import { evenOrOddReducer } from './reducers/even-or-odd.reducer';
import { userReducer } from './reducers/user.reducer';
import { animalDataReducer, animalSearchReducer } from './reducers/animals.reducer';

//Note import this when using Effects: also add package: @ngrx/effects
import { provideEffects } from '@ngrx/effects';
import { UsersEffects } from './effects/user.effects';
import { paginationReducer } from './reducers/pagination.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideHttpClient(),
    provideRouter(routes),
    provideStore(),
    //Use: importProvidersFrom(). A global state-container (count) with it's Reducer (counterReducer) is defined here.
    //importProvidersFrom( StoreModule.forRoot({ count: counterReducer }) ),
    //importProvidersFrom( StoreModule.forRoot({ books: booksReducer, collection: collectionReducer }) )
    
    //When working with standalone-bootstrap/components, the lines below can be used:
    provideState({ name: 'count', reducer: counterReducer }),
    provideState({ name: 'books', reducer: booksReducer }),
    provideState({ name: 'posts', reducer: postsReducer }),
    provideState({ name: 'collection', reducer: collectionReducer }),
    provideState({ name: 'evenOdd', reducer: evenOrOddReducer }),
    provideState({ name: 'users', reducer: userReducer }),
    provideState({ name: 'pagination', reducer: paginationReducer }),
    provideState({ name: 'animals', reducer: animalDataReducer }),
    provideState({ name: 'animal_search', reducer: animalSearchReducer }),

    //Register effect.
    provideEffects([UsersEffects]),
  ]
};