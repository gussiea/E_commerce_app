import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { Products } from '../product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItems: any = [];
  public productsUpdated = new BehaviorSubject<Products[]>([]);
  public search = new BehaviorSubject<string>("");

  constructor() { }
  getProductsUpdatedListener() {
    return this.productsUpdated.asObservable();
  }

  addToCart(product: Products){
    this.cartItems.push(product);
    this.productsUpdated.next(this.cartItems);
    // this.getTotalPrice();
    console.log(this.cartItems);

  }
  getTotalPrice(){
    let grandTotal = 0;
    this.cartItems.map((item: any)=> {
      grandTotal += item.price
    })
    return grandTotal;
  }
  removeCartItem(product:any){
    const temp = [...this.cartItems];
    const index = temp.indexOf(product);
    if (index > -1) {
      temp.splice(index, 1);
    }
    this.cartItems = temp;
    this.productsUpdated.next(this.cartItems);

  }

  removeAllCart(){
    this.cartItems = [];
    this.productsUpdated.next(this.cartItems);
    console.log(this.cartItems);
  }
}
