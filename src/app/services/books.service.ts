import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Book } from '../models/book.interface';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private booksUrl = 'https://api.potterdb.com/v1/books/';

  constructor(private http: HttpClient) {}

  getBooks(limit: number = 20): Observable<Book[]> {
    const url = `${this.booksUrl}?limit=${limit}`;
    return this.http.get<any>(url).pipe(
      map((response) =>
        response.data.map((item: any) => ({
          id: item.id,
          cover: item.attributes.cover,
          pages: item.attributes.pages,
          release_date: item.attributes.release_date,
          title: item.attributes.title,
          summary: item.attributes.summary,
        }))
      )
    );
  }

  getBook(id: string): Observable<Book> {
    const url = `${this.booksUrl}/${id}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        const item = response.data;
        return {
          id: item.id,
          cover: item.attributes.cover,
          pages: item.attributes.pages,
          release_date: item.attributes.release_date,
          title: item.attributes.title,
          summary: item.attributes.summary,
        };
      })
    );
  }
}
