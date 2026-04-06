import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserStateInterface } from '../../interfaces/user-state.interface';
import * as UserActions from '../../actions/user.actions';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BackToHomeComponent } from '../back-to-home/back-to-home.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-show-users',
  imports: [
    CommonModule,
    BackToHomeComponent,
    MatButtonModule
  ],
  templateUrl: './show-users.component.html',
  styleUrl: './show-users.component.scss'
})
export class ShowUsersComponent implements OnInit {

  data$?: Observable<UserStateInterface>;

  protected showButton: WritableSignal<boolean> = signal(true);

  private store = inject(Store<UserStateInterface>);

  ngOnInit() : void {
    this.data$ = this.store.select(store => store.users);

    this.data$.subscribe((users: UserStateInterface) => {
      if(users.data.length > 0) {
        this.showButton.set(false);
      }
    });
  }

  showUsers() : void {
    this.showButton.set(false);
    this.store.dispatch(UserActions.getUsers());
  }

}