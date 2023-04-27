import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Book } from '../shared/models/Book';
import { CartItem } from '../shared/models/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart:Cart = this.getCartFromLocalStorage()
  private cartSubject:BehaviorSubject<Cart> = new BehaviorSubject(this.cart)
  constructor() { }

  addToCart(book:Book):void{
    let cartItem = this.cart.item.find(item => item.book.id === book.id)
    if (cartItem) return
    this.cart.item.push(new CartItem(book))
    this.setCartToLocalStorage()
  }
  removeFromCart(bookId:string):void{
    this.cart.item = this.cart.item.filter(item => item.book.id != bookId)
    this.setCartToLocalStorage()
  }
  changeQuantity(foodId:string, quantity:number){
    let cartItem = this.cart.item.find(item => item.book.id === foodId)
    if(!cartItem) return

    cartItem.quantity = quantity
    cartItem.price = cartItem.book.price * quantity
    this.setCartToLocalStorage()
  }
  clearCart(){
    this.cart = new Cart()
    this.setCartToLocalStorage()
  }
  getCartObservable():Observable<Cart>{
    return this.cartSubject.asObservable()
  }

  getCart():Cart{
    return this.cartSubject.value
  }

  private setCartToLocalStorage():void{
    this.cart.totalPrice = this.cart.item.reduce((a,b)=> a + b.price, 0)
    this.cart.totalCount = this.cart.item.reduce((a,b)=> a + b.quantity,0)

    const cartJson = JSON.stringify(this.cart)
    localStorage.setItem("Cart", cartJson)
    this.cartSubject.next(this.cart)
  }
  private getCartFromLocalStorage():Cart{
    const cartJson = localStorage.getItem("Cart")
    return cartJson? JSON.parse(cartJson): new Cart()
  }
}
