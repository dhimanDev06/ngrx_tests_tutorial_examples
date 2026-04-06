import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { BookInterface, PostInterface } from '../../../interfaces/book.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-book-list',
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent {

  readonly books: InputSignal<ReadonlyArray<BookInterface>> = input<ReadonlyArray<BookInterface>>([]);
  readonly add: OutputEmitterRef<string> = output<string>();
  
}