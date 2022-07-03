import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product;
  currentProductId: number;

  constructor(private productService: ProductService, private route: ActivatedRoute, private cartService: CartService) {
    this.product = new Product();
    this.currentProductId = 0;
   }

  ngOnInit(): void {
    //this.route.paramMap.subscribe(() => this.showProductDetails());
    this.showProductDetails();
    
  }

  showProductDetails(){
    this.currentProductId =  +this.route.snapshot.paramMap.get("id")!;
    this.productService.getSingleProduct(this.currentProductId).subscribe(data => this.product = data);
  }

  addToCart(product: Product){
    console.log("Adding to cart: " + product.name + product.unitPrice);
    const cartItem = new CartItem(product);
    this.cartService.addToCart(cartItem);
  }

}
