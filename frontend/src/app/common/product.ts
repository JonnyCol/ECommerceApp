export class Product {
   
    id: number;
    sku: string;
    name: string;
    description: string;
    unitPrice: number;
    imageUrl: string;
    active: boolean;
    unitsInStock: number;
    dateCreated: Date;
    lastUpdated: Date;

    constructor(){
        this.id = 0;
        this.sku = "";
        this.name = "";
        this.description = "";
        this.unitPrice = 0;
        this.imageUrl = "";
        this.active = false;
        this.unitsInStock = 0;
        this.dateCreated = new Date;
        this.lastUpdated = new Date;  
    }
}