import { Address } from "./address";
import { Customer } from "./customer";
import { Order } from "./order";
import { OrderContents } from "./order-contents";

export class Purchase {
    customer: Customer;
    billingAddress: Address;
    shippingAddress: Address;
    order: Order;
    orderContents: OrderContents[];

    constructor(){
        this.customer = new Customer;
        this.billingAddress = new Address;
        this.shippingAddress = new Address;
        this.order = new Order;
        this.orderContents = [];
    }
}