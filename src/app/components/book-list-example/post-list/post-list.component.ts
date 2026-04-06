import { Component, inject, input, InputSignal, OnInit } from '@angular/core';
import { PostInterface } from '../../../interfaces/book.interface';
import { Observable } from 'rxjs';
import { selectPosts } from '../../../selectors/books.selectors';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-list',
  imports: [
    CommonModule
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent implements OnInit {
  posts$?: Observable<readonly PostInterface[]>;
  private store = inject(Store);

  ngOnInit(): void {
        this.posts$ = this.store.select(selectPosts);
  }
}
