import { CartItem } from "./cart-item";

export class OrderContents {
    id: number;
    quantity: number;
    unitPrice: number;
    imageUrl: string;
    productId: number;

    constructor(cartItem: CartItem){
        this.id = 0;
        this.quantity = cartItem.quantity;
        this.unitPrice = cartItem.unitPrice;
        this.imageUrl = cartItem.imageUrl;
        this.productId = cartItem.id;
    }
}