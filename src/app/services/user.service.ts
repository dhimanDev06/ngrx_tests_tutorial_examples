import { Injectable } from '@angular/core';
import { UserInterface } from '../interfaces/user.interface';
import { Observable, delay } from 'rxjs';
import { ItemList } from '../interfaces/item-list';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _users: UserInterface[] = [
    { id: '1', name: 'Saskia', age: 24 },
    { id: '2', name: 'Matilda', age: 27 },
    { id: '3', name: 'Victoria', age: 29 },
    { id: '4', name: 'Jane', age: 28 },
    { id: '5', name: 'Abigaïl', age: 21 },
    { id: '6', name: 'Joyce', age: 25 },
    { id: '7', name: 'Tess', age: 31 },
    { id: '8', name: 'Juliette', age: 23 },
    { id: '9', name: 'Caitlin', age: 25 },
    { id: '10', name: 'Serana', age: 31 },
    { id: '11', name: 'Lydia', age: 33 },
  ];

  getAllUsers() : Observable<UserInterface[]> {
    return new Observable<UserInterface[]>(observer => {
      observer.next(this._users);
      observer.complete();
    })
    .pipe(delay(3500));
  }

  getUsersPage(page: number, pageSize: number) :  Observable<ItemList<UserInterface>> {
    let start: number = (page - 1) * pageSize;
    let end: number = (start + pageSize < this._users.length) ? start + pageSize : this._users.length;
    let totalPages: number = (this._users.length % pageSize > 0) ? (this._users.length / pageSize) + 1 : this._users.length / pageSize;

    let users: UserInterface[] = [];

    for(let i = start; i < end; i++) {
      users.push(this._users[i]);
    }

    const list: ItemList<UserInterface> = new ItemList();
    list.currentPage = page;
    list.pageSize = pageSize;
    list.from = start;
    list.to = end;
    list.totalPages = totalPages;
    list.totalCount = this._users.length;
    list.items = users;    

    return new Observable<ItemList<UserInterface>>(observer => {
      observer.next(list);
      observer.complete();
    })
    .pipe(delay(1000));
  }

}
