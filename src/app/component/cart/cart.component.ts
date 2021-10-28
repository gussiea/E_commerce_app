import { Component, OnDestroy, OnInit } from '@angular/core';

import { Products } from 'src/app/product.model';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit{
  public products: Products[] = [];
  public totalPrice: number = 0;
  // private productsSub : Subscription;
  constructor(private cartService: CartService) {}

  ngOnInit() {
     this.cartService.getProductsUpdatedListener().subscribe((products: Products[]) => {
     this.products = products;
     this.totalPrice = this.cartService.getTotalPrice();
   });
  }

  onRemoveItem(item: Products) {
    this.cartService.removeCartItem(item);
  }

  onEmptyCart() {
    this.cartService.removeAllCart();
  }

  // ngOnDestroy(){
  //   this.productsSub.unsubscribe();
  // }
}
