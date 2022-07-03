export class PaymentInfo {
    amount: number;
    currency: string;
    receiptEmail: string;

    constructor(){
        this.amount = 0;
        this.currency  = "";
        this.receiptEmail = "";
    }

}
