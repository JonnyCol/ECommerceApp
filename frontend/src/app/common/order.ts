export class Order {
    id: number;
    //trackingNumber: string;
    totalPrice: number;
    totalQuantity: number;
    status: string;
    dateCreated: Date;
    lastUpdated: Date;

    constructor(){
        this.id = 0;
        //this.trackingNumber = "";
        this.totalPrice = 0.0;
        this.totalQuantity = 0;
        this.status = "";
        this.dateCreated = new Date;
        this.lastUpdated = new Date;
    }
}