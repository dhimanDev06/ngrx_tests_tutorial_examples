import { Component, OnInit, inject } from '@angular/core';
import { BookListComponent } from '../book-list/book-list.component';
import { BookCollectionComponent } from '../book-collection/book-collection.component';
import { CommonModule } from '@angular/common';
import { selectBookCollection, selectBooks, selectPosts } from '../../../selectors/books.selectors';
import { BooksActions, BooksApiActions, PostsApiActions } from '../../../actions/books.actions';
import { BooksService } from '../../../services/books.service';
import { Store } from '@ngrx/store';
import { BackToHomeComponent } from '../../back-to-home/back-to-home.component';
import { Observable } from 'rxjs';
import { BookInterface, PostInterface } from '../../../interfaces/book.interface';
import { PostListComponent } from '../post-list/post-list.component';

@Component({
  selector: 'app-book-overview',
  imports: [
    BookListComponent,
    BookCollectionComponent,
    PostListComponent,
    CommonModule,
    BackToHomeComponent
  ],
  templateUrl: './book-overview.component.html',
  styleUrl: './book-overview.component.scss'
})
export class BookOverviewComponent implements OnInit {

  private booksService = inject(BooksService);
  private store = inject(Store);

  books$?: Observable<readonly BookInterface[]>;
  bookCollection$?: Observable<BookInterface[]>;
  // posts$?: Observable<readonly PostInterface[]>;

  ngOnInit() : void {
    this.booksService
    .getBooks()
    .subscribe((books) =>
      this.store.dispatch(BooksApiActions.retrievedBookList({ books }))
    );

    this.books$ = this.store.select(selectBooks);
    this.bookCollection$ = this.store.select(selectBookCollection);

    // this.posts$ = this.store.select(selectPosts);
    // this.posts$.subscribe(posts => {
    //   console.log("Posts length:", posts.length);
    //   if(posts.length  == 0) {
    //         this.booksService
    //       .getPosts()
    //       .subscribe((posts) =>{
    //         console.log("Posts list:",posts);
    //         this.store.dispatch(PostsApiActions.retrievedPostList({ posts }));
    //       }
    //     );
    //   }
    // });
  }

  onAdd(bookId: string) {
    this.store.dispatch(BooksActions.addBook({ bookId }));
  }

  onRemove(bookId: string) {
    this.store.dispatch(BooksActions.removeBook({ bookId }));
  }

}