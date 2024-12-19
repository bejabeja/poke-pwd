import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Book } from '../../models/book.interface';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [
    trigger('listAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate(
          '300ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-in',
          style({ opacity: 0, transform: 'translateY(20px)' })
        ),
      ]),
    ]),
    
  ],
})
export class HomeComponent {
  books: Book[] = [];
  isLoading: boolean = true;
  isTableView: boolean = true;
  displayedColumns: string[] = ['cover', 'title', 'release_date', 'pages'];

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(): void {
    this.booksService.getBooks().subscribe((data) => {
      setTimeout(() => {
        this.books = data;
        this.isLoading = false;
      }, 1000);
    });
  }

  changeView(view: string): void {
    this.isTableView = view === 'table';
  }
}
