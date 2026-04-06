import { Routes } from '@angular/router';
import { CounterComponent } from './components/counter/counter.component';
import { LinksComponent } from './components/links/links.component';
import { BookOverviewComponent } from './components/book-list-example/book-overview/book-overview.component';
import { EvenOrOddComponent } from './components/even-or-odd/even-or-odd.component';
import { ShowUsersComponent } from './components/show-users/show-users.component';
import { ShowUsersPaginationComponent } from './components/show-users-pagination/show-users-pagination.component';
import { ShowAnimalsComponent } from './components/show-animals/show-animals.component';

export const routes: Routes = [
    { path: '', component: LinksComponent },
    { path: 'counter-example', component: CounterComponent },
    { path: 'book-list-example', component: BookOverviewComponent },
    { path: 'even-or-odd-example', component: EvenOrOddComponent },
    { path: 'show-users-example', component: ShowUsersComponent },
    { path: 'show-users-pagination-example', component: ShowUsersPaginationComponent },
    { path: 'show-animals', component: ShowAnimalsComponent }
];
