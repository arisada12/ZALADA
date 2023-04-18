import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/shared/models/Book';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  books:Book[] = []
  constructor(private bookService:BookService, activatedRoute:ActivatedRoute){
    let booksObservable:Observable<Book[]>
    activatedRoute.params.subscribe((params)=>{
      if(params["searchTerm"]){
        booksObservable = this.bookService.getBookBySearchTerms(params["searchTerm"])
      }else if(params["tag"]){
        booksObservable = this.bookService.getBookByTag(params["tag"])
      }else{
        booksObservable = bookService.getAll()
      }
      booksObservable.subscribe((serverBooks)=>{
        this.books = serverBooks
      })
    })
  }

}
