export class OrderHistory{
    id: string;
    trackingNumber: string;
    totalPrice: number;
    totalQuantity: number;
    dateCreated: Date;

    constructor(){
        this.id = "";
        this.trackingNumber = "";
        this.totalPrice = 0;
        this.totalQuantity = 0;
        this.dateCreated = new Date;
    }
}
