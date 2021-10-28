import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/product.model';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public totalItem: number = 0;
  public searchTerm:string = '';
  constructor(private cartService: CartService) { }

  ngOnInit(){
    this.cartService.getProductsUpdatedListener().subscribe((products:Products[]) => {
      this.totalItem = products.length;
    })
  }
  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);
  }

}
