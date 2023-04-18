import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { CartService } from 'src/app/services/cart.service';
import { Book } from 'src/app/shared/models/Book';

@Component({
  selector: 'app-book-pages',
  templateUrl: './book-pages.component.html',
  styleUrls: ['./book-pages.component.css']
})
export class BookPagesComponent {
  book!: Book
  constructor(activateRoute:ActivatedRoute, bookservice:BookService, private cartService:CartService, private router:Router){
    activateRoute.params.subscribe((params)=>{
      if(params["id"]){
        bookservice.getBookById(params["id"]).subscribe(serverBook =>{
          this.book = serverBook
        })
      }
    })
  }

  addToCart(){
    this.cartService.addToCart(this.book)
    this.router.navigateByUrl("/cart-page")
  }

}
