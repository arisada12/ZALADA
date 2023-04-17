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
        this.book = bookservice.getBookById(params["id"])
      }
    })
  }

  addToCart(){
    this.cartService.addToCart(this.book)
    this.router.navigateByUrl("/cart-page")
  }

}
