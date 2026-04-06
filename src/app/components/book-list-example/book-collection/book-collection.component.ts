import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { BookInterface } from '../../../interfaces/book.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-book-collection',
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './book-collection.component.html',
  styleUrl: './book-collection.component.scss'
})
export class BookCollectionComponent {

  readonly books: InputSignal<ReadonlyArray<BookInterface>> = input<ReadonlyArray<BookInterface>>([]);
  readonly remove: OutputEmitterRef<string> = output<string>();

}