import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../../services/services';
import { ActivatedRoute, Router } from '@angular/router';
import { BookRequest, BookResponse } from '../../../../services/models';

@Component({
  selector: 'app-manage-book',
  templateUrl: './manage-book.component.html',
  styleUrl: './manage-book.component.css'
})
export class ManageBookComponent implements OnInit {

  errorMsg: Array<string> = [];
  bookRequest: BookRequest = {
    authorName: 'Mike',
    ISBN: '',
    synopsis: '',
    title: '',

  };

  selectedBookCover: any;
  selectedPicture: string | undefined;

  constructor(
    private bookService: BookService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const bookId = this.activatedRoute.snapshot.params['bookId'];
    console.log("the id of retrieved book: ", bookId);
    if (bookId) {
      this.bookService.findBookById({
        'book-id': bookId
      }).subscribe({
        // @ts-ignore
        next: (bookData: string) => { 
          const book = JSON.parse(bookData); 
          console.log('Retrieved book:', book);
  
          this.bookRequest = {
            id: book.id,
            title: book.title as string,
            authorName: book.authorName as string,
            ISBN: book.isbn as string,
            synopsis: book.synopsis as string,
            shareable: book.shareable
          };
  
          if (book.cover) {
            this.selectedPicture = 'data:image/jpg;base64,' + book.cover;
          }
        }
      });
    }
  }
  
  
  
  saveBook() {
    this.bookService.saveBook({
      body: this.bookRequest
    }).subscribe({
      next: (bookId) => {
        this.bookService.uploadBookCoverPicture({
          // @ts-ignore
          'book-id': bookId,
          body: {
            file: this.selectedBookCover
          }
        }).subscribe({
          next: () => {
            this.router.navigate(['/books/my-books']);
          }
        });
      },
      error: (err) => {
        let passedError = JSON.parse(err.error);
        this.errorMsg = passedError.validationErrors;
      }
     })
  }

  onFileSelected(event: any) {
    this.selectedBookCover = event.target.files[0];
    if (this.selectedBookCover) {

      const reader = new FileReader();
      reader.onload = () => {
        this.selectedPicture = reader.result as string;
      };
      reader.readAsDataURL(this.selectedBookCover);
    }
  }
}
