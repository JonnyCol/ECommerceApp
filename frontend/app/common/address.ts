export class Address {
    id: number;
    country: string;
    city: string;
    state: string;
    street: string;
    zipCode: string;

    constructor(){
        this.id = 0;
        this.country = "";
        this.city = "";
        this.state = "";
        this.street = "";
        this.zipCode = "";
    }
}