import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;
  //unitPrice: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.shoppingList();
  }


  shoppingList() {
    // get a handle to the cart items
    this.cartItems = this.cartService.cartItems;

    // subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe(data => this.totalPrice = data);

    // subscribe to the cart totalQuantity
    this.cartService.totalQuantity.subscribe(data => this.totalQuantity = data);

    // compute cart total price and quantity
    this.cartService.computeCartTotals();   
  }

  incrementQuantity(item: CartItem){
    //item.quantity++;
    //this.totalQuantity++;
    //this.totalPrice += item.unitPrice;
    this.cartService.addToCart(item);
  }
  /*
  decreaseQuantity(item: CartItem){
    item.quantity--;
    this.totalQuantity--;
    this.totalPrice -= item.unitPrice;

    if(item.quantity == 0){
      this.removeItem(item.quantity);
    }
  }*/

  decreaseQuantity(item: CartItem){
    this.cartService.removeFromCart(item);

  }
  /*
  removeItem(quantity: number){
    this.cartItems.forEach((value, index) => {
      if(value.quantity == quantity){
        this.cartItems.splice(index, 1);
      }
    });    
  }*/

  emptyCart(item: CartItem){
    this.cartService.emptyCart(item);
  }
}