import { Component, OnDestroy, OnInit, inject, WritableSignal, signal, ModelSignal, model } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PaginationAndPagerInterface, PaginationDataInterface } from '../../../interfaces/pagination-and-pager.interface';
import { setPager, setDataSource } from '../../../actions/pagination.actions';

@Component({
  selector: 'app-pager',
  imports: [],
  templateUrl: './pager.component.html',
  styleUrl: './pager.component.scss'
})
export class PagerComponent implements OnInit, OnDestroy {

  readonly page: ModelSignal<string> = model<string>('');

  private _paginationData$?: Observable<PaginationDataInterface>;

  public itemsPerPage?: number;

  protected options: WritableSignal<number[]> = signal([1, 2, 3, 4, 5, 10, 25]);

  private store = inject(Store);

  ngOnInit() : void {
    //From store.
    this.store.dispatch(setDataSource({page: this.page()}));
    this._paginationData$ = this.store.select(state => state.pagination);

    if(this._paginationData$ != undefined)  {
      this._paginationData$.subscribe((pagination: PaginationDataInterface) => {
        let item: PaginationAndPagerInterface | undefined = pagination.data.find(element => element.page === this.page());

        if(item != undefined && this.itemsPerPage != item.itemsPerPage) {   
          this.itemsPerPage = item.itemsPerPage;
        }
      });
    }
  }

  ngOnDestroy() : void {
    this.page.set('');
    this.itemsPerPage = undefined; 
    this._paginationData$ = new Observable<PaginationDataInterface>();
  }

  changePageSize(size: string) {
    let parsed = parseInt(size);

    if(this.itemsPerPage != parsed) {
      this.itemsPerPage = parsed;

      const page = this.page();
      this.store.dispatch(setPager({itemsPerPage: this.itemsPerPage, page: page}));      
      this.store.dispatch(setDataSource({page: page}));
    }    
  }

}