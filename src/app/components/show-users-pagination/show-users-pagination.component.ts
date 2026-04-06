import { Component, OnDestroy, OnInit, inject, WritableSignal, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Store } from '@ngrx/store';
import { PaginationAndPagerInterface, PaginationDataInterface } from '../../interfaces/pagination-and-pager.interface';
import { Observable, Subject, takeUntil } from 'rxjs';
import { UserInterface } from '../../interfaces/user.interface';
import { PagerComponent } from '../shared/pager/pager.component';
import { PaginationComponent } from '../shared/pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { selectPage } from '../../selectors/pagination.selector';
import { setTotalPages } from '../../actions/pagination.actions';
import { BackToHomeComponent } from '../back-to-home/back-to-home.component';

@Component({
  selector: 'app-show-users-pagination',
  imports: [
    CommonModule,
    PagerComponent,
    PaginationComponent,
    BackToHomeComponent
  ],
  templateUrl: './show-users-pagination.component.html',
  styleUrl: './show-users-pagination.component.scss'
})
export class ShowUsersPaginationComponent implements OnInit, OnDestroy {

  usersData$?: Observable<UserInterface[]> | undefined;
  private _onDestroy: Subject<boolean> = new Subject();

  private usersService = inject(UserService);
  private store = inject(Store<{ pagination: PaginationDataInterface }>)

  protected firstItem: WritableSignal<number> = signal(-1);
  protected lastItem: WritableSignal<number> = signal(-1);
  protected totalItems: WritableSignal<number> = signal(-1);

  ngOnInit() : void {
    this.store.select(selectPage('users'))
    .pipe(takeUntil(this._onDestroy))
    .subscribe((data: PaginationAndPagerInterface | undefined) => {
      if(data) {
        this.getData(data);
      }
    });
  }

  ngOnDestroy(): void {
    this._onDestroy.next(true);
    this._onDestroy.unsubscribe();
  }

  createObservable(data: UserInterface[]) : Observable<UserInterface[]> {
    return new Observable<UserInterface[]>(observer => {
      observer.next(data);
      observer.complete();
    });
  }

  private getData(pagination: PaginationAndPagerInterface) : void {
    this.usersService.getUsersPage(pagination.currentPage, pagination.itemsPerPage).subscribe({
      next: (result) => {
        this.usersData$ = this.createObservable(result.items);

        this.firstItem.set(result.from);
        this.lastItem.set(result.to);
        this.totalItems.set(result.totalCount);

        this.store.dispatch(setTotalPages({totalPages: result.totalPages, itemsPerPage: result.pageSize, page: 'users'}));
      }
    })
  }

}