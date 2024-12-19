import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../models/book.interface';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-book',
  standalone: false,
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent {
  book!: Book;
  isLoading: boolean = true;

  constructor(
    private booksService: BooksService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const identifier = this.activateRoute.snapshot.paramMap.get('id') as string;

    if (!identifier) {
      this.router.navigateByUrl('/');
      return;
    }

    this.booksService.getBook(identifier).subscribe((book) => {
      setTimeout(() => {
        if (!book) {
          this.router.navigateByUrl('/');
        } else {
          this.book = book;
        }
        this.isLoading = false;
      }, 1000);
    });
  }
}
