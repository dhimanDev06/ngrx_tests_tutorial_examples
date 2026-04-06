import { Component, inject, WritableSignal, signal, input, InputSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationDataInterface, PaginationAndPagerInterface } from '../../../interfaces/pagination-and-pager.interface';
import { Store } from '@ngrx/store';
import { setCurrentPage, setDataSource } from '../../../actions/pagination.actions';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pagination',
  imports: [
    MatIconModule
],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {

  readonly page: InputSignal<string> = input<string>('');

  private _paginationData$?: Observable<PaginationDataInterface | null | undefined>;

  protected amountOfPages: WritableSignal<number> = signal(0);

  private _currentPageindex: WritableSignal<number> = signal(0);

  private store = inject(Store);

  ngOnInit(): void {  
    // From store.  
    this._paginationData$ = this.store.select(state => state.pagination);  

    if (this._paginationData$ != undefined) {  
      this._paginationData$.subscribe((pagination: PaginationDataInterface | null | undefined) => {    
        let item: PaginationAndPagerInterface | undefined = pagination?.data.find(element => element.page === this.page());  
    
        if (item != undefined && this.amountOfPages() != item.totalPages) {  
          this.amountOfPages.set(item.totalPages);  
          this._currentPageindex.set(item.currentPage);  
        }  
    
        if (item != undefined && this._currentPageindex() != item.currentPage) {  
          this._currentPageindex.set(item.currentPage);  
        }  
      });  
    }  
  }

  getPagination() : string[] {
    let start: number = 0;
    let end: number = 0;

    if(this._currentPageindex() - 1 <= 0) {
      start = 1;      
    } else {
      start = this._currentPageindex() - 1;
    }

    if(this._currentPageindex() + 1 < this.amountOfPages()) {
      end = this._currentPageindex() + 1;
    } else {
      end = this.amountOfPages();
    }

    let arr: string[] = [];
   
    for(let i = start; i <= end; i++) {
      arr.push(i + "");
    }

    return arr;
  }

  isCurrentPageIndex(value: string) : boolean {
    let parsed: number = parseInt(value);
    return (parsed == this._currentPageindex()) ? true : false;
  }

  setPageIndex(value: string) : void {
    let parsed: number = parseInt(value);
    this._currentPageindex.set(parsed);
    const page = this.page();
    this.store.dispatch(setCurrentPage({currentPage: this._currentPageindex(), totalPages: this.amountOfPages(), page: page}));
    this.store.dispatch(setDataSource({page: page}));
  }

  previousPage() : void {
    if(this._currentPageindex() - 1 > 0) {
      this._currentPageindex.update(() => this._currentPageindex() - 1) ;
      const page = this.page();
      this.store.dispatch(setCurrentPage({currentPage: this._currentPageindex(), totalPages: this.amountOfPages(), page: page}));
      this.store.dispatch(setDataSource({page: page}));
    }
  }

  nextPage() : void {
    if(this._currentPageindex() + 1 <= this.amountOfPages()) {
      this._currentPageindex.update(() => this._currentPageindex() + 1);
      const page = this.page();
      this.store.dispatch(setCurrentPage({currentPage: this._currentPageindex(), totalPages: this.amountOfPages(), page: page}));
      this.store.dispatch(setDataSource({page: page}));
    }
  }

}