import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  //totalPriceAmount: number = 0;
  //totalQuantityAmount: number = 0;

  storage: Storage = sessionStorage;
  //storage: Storage = localStorage;
  
  constructor() {
    //this.cartItems = JSON.parse(sessionStorage.getItem('cartItems')!) != null ? JSON.parse(sessionStorage.getItem('cartItems')!): [];

    //read data from storage
    let data = JSON.parse(this.storage.getItem('cartItems')!);

    if(data != null){
      this.cartItems = data;

      // compute totals based on the data that is read from storage
      this.computeCartTotals();
    }
    
   }

  addToCart(cartItem: CartItem){

    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined!;

    if(this.cartItems.length > 0){
      // find the item in the cart based on item id
      /*for(let item of this.cartItems){
        if(item.id === cartItem.id){
          existingCartItem = item;
          alreadyExistsInCart = true;
          break;
        }      
      }*/
      // refactoring for previous for-loop:
         existingCartItem = this.cartItems.find(item => item.id === cartItem.id)!;
         alreadyExistsInCart = (existingCartItem != undefined);
    }

    if(alreadyExistsInCart){
      // increment quantity of item
      existingCartItem.quantity++;
    }
    else{
      // add new item to cartItems array
      this.cartItems.push(cartItem);
    }

    // compute cart total price and total quantity
    this.computeCartTotals();
  }

  removeFromCart(cartItem: CartItem){
    cartItem.quantity--;
    this.computeCartTotals();

    if(cartItem.quantity === 0){
      this.updateEmptyCart2(cartItem);
    }
  }

  emptyCart(cartItem: CartItem){
    cartItem.quantity = 0;
    this.computeCartTotals();
    if(cartItem.quantity == 0){
      this.updateEmptyCart2(cartItem);
    }
  }
  
  /*
  updateEmptyCart(quantity: number){
    this.cartItems.forEach((value, index) => {
      if(value.quantity == quantity){
        this.cartItems.splice(index, 1)
      }
    });
  }*/

  updateEmptyCart2(cartItem: CartItem){
    // get index of item in the array
    const itemIndex = this.cartItems.findIndex(item => item.id == cartItem.id);
    // if found, remove item at specified item index location
    if(itemIndex > -1){
      this.cartItems.splice(itemIndex, 1);
    }

  }

  computeCartTotals(){
    let totalQuantityAmount: number = 0;
    let totalPriceAmount: number = 0;

    for(let item of this.cartItems){
      totalQuantityAmount += item.quantity;
      totalPriceAmount += item.unitPrice * item.quantity;
    }

    // publish the new values... all subscribers will receive new data
    this.totalQuantity.next(totalQuantityAmount);
    this.totalPrice.next(totalPriceAmount);

    //log cart data for debugging purposes
    this.logCartData(totalPriceAmount, totalQuantityAmount);

    this.persistCartItems();
  }

  logCartData(totalPriceAmount: number, totalQuantityAmount: number) {
    console.log("Contents of cart:");
    for(let item of this.cartItems){
      const subTotalPrice = item.quantity * item.unitPrice;
      console.log(`name: ${item.name}, quantity=${item.quantity}, unitPrice=${item.unitPrice}, subtotalPrice=${subTotalPrice}`);
    }
    console.log(`totalPrice= ${totalPriceAmount.toFixed(2)}, totalQuantity= ${totalQuantityAmount}`);
    console.log("----------------------------------");
  }

  persistCartItems(){
    //sessionStorage.setItem('cartItems', JSON.stringify(this.cartItems));

    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
  
}
