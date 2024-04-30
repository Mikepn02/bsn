import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../../services/services';
import { Router } from '@angular/router';
import { BookResponse, PageResponseBookResponse } from '../../../../services/models';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit{

  bookResponse: PageResponseBookResponse = {};
  page = 0;
  size = 5;
  pages: any = [];
  message = '';
  level: 'success' |'error' = 'success';

  constructor(
    private bookService: BookService,
    private router: Router
  ){}

  ngOnInit(): void {
      this.findAllBooks();
  }

  private findAllBooks(){
     this.bookService.findAllBooks({
      page: this.page,
      size: this.size
     }).subscribe({
      next: (books: any) => {
        let allBooks= JSON.parse(books)
        this.bookResponse = allBooks;
        console.log("All the books: ", this.bookResponse);
        this.pages = Array(this.bookResponse.totalPages)
              .fill(0)
              .map((x, i) => i);
      }
    });
  }

  gotToPage(page: number) {
    this.page = page;
    this.findAllBooks();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllBooks();
  }

  goToPreviousPage() {
    this.page --;
    this.findAllBooks();
  }

  goToLastPage() {
    this.page = this.bookResponse.totalPages as number - 1;
    this.findAllBooks();
  }

  goToNextPage() {
    this.page++;
    this.findAllBooks();
  }

  get isLastPage() {
    return this.page === this.bookResponse.totalPages as number - 1;
  }


  borrowBook(book: BookResponse) {
    this.message = '';
     this.bookService.borrowBook({
      "book-id" : book.id as number
     }).subscribe({
      next: () => {
         this.level = 'success';
         this.message = "Book Successfully added to your list";
      },
      error: (err) => {
        console.log(err);
        let borrowError = JSON.parse(err.error);
        this.level = 'error';
        this.message = borrowError.error;
      }
     })
  }

  displayBookDetails(book: BookResponse) {
 
  }

}
