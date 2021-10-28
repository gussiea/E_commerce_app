import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/product.model';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public products: any;
  searchKey:string="";
  public filterCategory:any;

  constructor(private apiService: ApiService, private cartService: CartService) { }

  ngOnInit() {
    this.apiService.getProduct()
    .subscribe(res => {
      this.products = res;
      this.filterCategory = res;
      //只有服装是两个类放在一起的类
      this.products.forEach((a:any) => {
        if(a.category === "women's clothing" || a.category === "men's clothing"){
          a.category = "fashion"
        }
        Object.assign(a, {quantity:1, total:a.price})
      });
    })

    this.cartService.search.subscribe((value: any)=> {
      this.searchKey = value;
    });

  }

  onAddToCart(item: Products){
    this.cartService.addToCart(item);
  }

  filter(category:string){
    //遍历所有的products 然后用filter函数 返回想要的key的值的key
    this.filterCategory = this.products.filter((a:any) => {
      if(a.category == category || category==""){
        return a
      }
    })
  }

}
