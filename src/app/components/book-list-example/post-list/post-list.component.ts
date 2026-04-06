import { Component, inject, input, InputSignal, OnInit } from '@angular/core';
import { PostInterface } from '../../../interfaces/book.interface';
import { Observable } from 'rxjs';
import { selectPosts } from '../../../selectors/books.selectors';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { BooksService } from '../../../services/books.service';
import { PostsApiActions } from '../../../actions/books.actions';

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
  private booksService = inject(BooksService);
  ngOnInit(): void {
    this.posts$ = this.store.select(selectPosts);
    this.posts$.subscribe(posts => {
      console.log("Posts length:", posts.length);
      if(posts.length  == 0) {
            this.booksService
          .getPosts()
          .subscribe((posts) =>{
            console.log("Posts list:",posts);
            this.store.dispatch(PostsApiActions.retrievedPostList({ posts }));
          }
        );
      }
    });
  }
}
