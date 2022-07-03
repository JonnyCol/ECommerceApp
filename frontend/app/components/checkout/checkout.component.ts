//import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from 'src/app/common/country';
import { Order } from 'src/app/common/order';
import { OrderContents } from 'src/app/common/order-contents';
import { PaymentInfo } from 'src/app/common/payment-info';
import { Purchase } from 'src/app/common/purchase';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { FormService } from 'src/app/services/form.service';
import { FormValidators } from 'src/app/validators/form-validators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup = new FormGroup({});

  totalQuantity: number = 0;
  totalPrice: number = 0;

  creditCardMonths: number[] = [];
  creditCardYears: number[] = [];

  countries: Country[] = [];
  states: State[] = [];
  shippingStates: State[] = [];
  billingStates: State[] = [];

  storage: Storage = sessionStorage;

  // Initialize Stripe API 
  stripe = Stripe(environment.stripePublishableKey);

  paymentInfo: PaymentInfo = new PaymentInfo();
  cardElement: any;
  displayError: any ="";

  isDisabled: boolean = false;
  

  constructor(private formBuilder: FormBuilder, private formService: FormService, private cartService: CartService, private checkoutService: CheckoutService, private router: Router) { 
    //this.totalQuantity = 0;
    //this.totalPrice = 0;
    //this.creditCardMonths = [];
    //this.creditCardYears = [];
  }

  ngOnInit(): void {

    // setup Stripe payment form
    this.setupStripePaymentForm();
    
    // read user email from web browser storage
    const email = JSON.parse(this.storage.getItem("userEmail")!);

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.minLength(2), FormValidators.whiteSpace]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2), FormValidators.whiteSpace]),
        email: new FormControl(email, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      }),
      shippingAddress: this.formBuilder.group({
        country: new FormControl('', Validators.required),
        street: new FormControl('', [Validators.required, Validators.minLength(4), FormValidators.whiteSpace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2), FormValidators.whiteSpace]),
        state: new FormControl('', Validators.required),
        zipCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{5,}')])
      }),
      billingAddress: this.formBuilder.group({
        country: new FormControl('', Validators.required),
        street: new FormControl('', [Validators.required, Validators.minLength(4), FormValidators.whiteSpace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2), FormValidators.whiteSpace]),
        state: new FormControl('', Validators.required),
        zipCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{5,}')])
      }),
      creditCard: this.formBuilder.group({
         /* CREDIT CARD FIELD WITHOUT STRIPE
        nameOnCard: new FormControl('', [Validators.required, Validators.minLength(4), FormValidators.whiteSpace]),
        cardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
        securityCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
        cardType: new FormControl('', Validators.required),
        expirationMonth: new FormControl('', Validators.required),
        expirationYear: new FormControl('', Validators.required)*/
      }) 
    });

    /* CREDIT CARD MONTHS/YEARS WITHOUT STRIPE
    // populate credit card months
    //let startMonth: number = new Date().getMonth() + 1;
    const startMonth: number = new Date().getMonth()+1;
    console.log("startMonth: " + startMonth);

    this.formService.getCreditCardMonths(startMonth).subscribe(data =>{
      console.log("Retrieved credit card months: " + JSON.stringify(data));
      this.creditCardMonths = data;
    })

    // populate credit card years
    const startYear: number = new Date().getFullYear();
    console.log("startYear: " + startYear);

    this.formService.getCreditCardYears().subscribe(data =>{
      console.log("Retrieved credit card years: " + JSON.stringify(data));
      this.creditCardYears = data;
    }) */

    // populate countries
    this.showCountries();

    /*this.formService.getStates(1).subscribe(data => {
      //console.log("Retrieved States: " + JSON.stringify(data));
      //this.states = data
      this.billingStates = data;
      this.shippingStates = data;
    });*/

    this.reviewOrderTotals();
  }

  setupStripePaymentForm() {
    // get a handle to stripe elements
    var elements = this.stripe.elements();

    // create a card element and hide the zip-code field
    this.cardElement = elements.create("card", {hidePostalCode: true});

    // add an instance of card UI component into the "card-element" div
    this.cardElement.mount("#card-element");

    // add event binding for the "change"  event on the card element
    this.cardElement.on("change", (event: any) => {
      // get a handle to card-errors element
      this.displayError = document.getElementById("card-errors");

      if(event.complete){
        this.displayError.textContent = "";
      }
      else if(event.error){
        // show validation error to customer
        this.displayError.textContent = event.error.message;
      }

    });
  }

  showCountries(){
    this.formService.getCountries().subscribe(data => this.countries = data);
  }

  showStates(formGroupNameInput: string){
    let formGroupName = this.checkoutFormGroup.get(formGroupNameInput);
    //let selectedCountry = formGroupName?.value.country;
    //let currentCountryId: number = 0;
    let currentCountryId = formGroupName?.value.country.id;

    /*for(let country of this.countries){
      if(country.name === selectedCountry){
        currentCountryId = country.id;
        break;
      }
    }*/
    if(formGroupNameInput === "shippingAddress"){
      this.formService.getStates(currentCountryId).subscribe(data => this.shippingStates = data);
    }
    else{
      this.formService.getStates(currentCountryId).subscribe(data => this.billingStates = data);
    }   
  }


  onSubmit(){
    console.log("Your purchase is being processed");
    console.log(this.checkoutFormGroup.get('customer')?.value);
    console.log("Customer name: " + this.checkoutFormGroup.get("customer")?.value.firstName.trim());
    console.log("Customer last name: " + this.checkoutFormGroup.get("customer")?.value.lastName);
    console.log("Customer email: " + this.checkoutFormGroup.get('customer')?.value.email);

    if(this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }
    
    // set up order
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;
     
    // get cart items
    let cartItems = this.cartService.cartItems;

    // create orderItems from cartItems
    // - long way
    let orderItems: OrderContents[] = [];
    for(let i=0; i<cartItems.length; i++){
      orderItems[i] = new OrderContents(cartItems[i]);
    }

    // - short way
    /*
    let orderItemsShort: OrderContents[] = cartItems.map(cartItem => new OrderContents(cartItem));
    */


    // set up purchase
    let purchase = new Purchase();

    // populate purchase with customer
    purchase.customer = this.checkoutFormGroup.get('customer')?.value;
    // purchase.customer = this.checkoutFormGroup.controls['customer'].value;

    // populate purchase with shipping address
    purchase.shippingAddress.country = this.checkoutFormGroup.get('shippingAddress')?.value.country.code;
    purchase.shippingAddress.street = this.checkoutFormGroup.get('shippingAddress')?.value.street;
    purchase.shippingAddress.city = this.checkoutFormGroup.get('shippingAddress')?.value.city;
    purchase.shippingAddress.state = this.checkoutFormGroup.get('shippingAddress')?.value.state.name;
    purchase.shippingAddress.zipCode = this.checkoutFormGroup.get('shippingAddress')?.value.zipCode;

    //purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    //const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
    //const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
    //purchase.shippingAddress.state = shippingState.name;
    //purchase.shippingAddress.country = shippingCountry.name;



    // populate purchase with billing address
    purchase.billingAddress.country = this.checkoutFormGroup.get('billingAddress')?.value.country.code;
    purchase.billingAddress.street = this.checkoutFormGroup.get('billingAddress')?.value.street;
    purchase.billingAddress.city = this.checkoutFormGroup.get('billingAddress')?.value.city;
    purchase.billingAddress.state = this.checkoutFormGroup.get('billingAddress')?.value.state.name;
    purchase.billingAddress.zipCode = this.checkoutFormGroup.get('billingAddress')?.value.zipCode;

    //purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
    //const billingState: State = JSON.parse(JSON.stringify(purchase.billingAddress.state));
    //const billingCountry: Country = JSON.parse(JSON.stringify(purchase.billingAddress.country));
    //purchase.billingAddress.state = billingState.name;
    //purchase.billingAddress.country = billingCountry.name;



    // populate purchase with order and orderItems
    purchase.order = order;
    purchase.orderContents = orderItems;

    // compute payment info
    //this.paymentInfo.amount = this.totalPrice * 100;
    this.paymentInfo.amount = Math.round(this.totalPrice * 100);
    this.paymentInfo.currency = "USD";
    this.paymentInfo.receiptEmail = purchase.customer.email;

    // if valid form then
    // - create payment intent
    // - confirm card payment
    // place order

    if(!this.checkoutFormGroup.invalid && this.displayError.textContent === ""){

      this.isDisabled = true;

      this.checkoutService.createPaymentIntent(this.paymentInfo).subscribe(
        (paymentIntentResponse) => {
          this.stripe.confirmCardPayment(paymentIntentResponse.client_secret,
            {
              payment_method: {
                card: this.cardElement,
                billing_details: {
                  email: purchase.customer.email,
                  name: purchase.customer.firstName + " " + purchase.customer.lastName,
                  address: {
                    line1: purchase.billingAddress.street,
                    city: purchase.billingAddress.city,
                    state: purchase.billingAddress.state,
                    postal_code: purchase.billingAddress.zipCode,
                    country: purchase.billingAddress.country
                  }
                }
              }
            }, {handleActions: false})
          .then((result:any) =>{
            if(result.error){
              // inform the customer there was an error
              alert("There was an error " + result.error.message);
              this.isDisabled = false;
            }
            else{
              // call REST API via the CheckoutService
              this.checkoutService.placeOrder(purchase).subscribe({
                next: (response:any) => {
                  alert("Your order has been received.\nOrder tracking number: " + response.trackingNumber);

                  // reset the cart
                  this.resetCart();
                  this.isDisabled = false;
                },
                error: err => {
                  alert("There was an error: " + err.message);
                  this.isDisabled = false;
                }
              })
            }
          })
        }
      );
    }
    else{
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }


    // call REST API via checkout service without Stripe
    /*
    this.checkoutService.placeOrder(purchase).subscribe(
      {
        next: response => {
          alert(`Your order has been received.\nOrder tracking number: ${response.trackingNumber} `);

          // reset cart
          this.resetCart();
        },
        error: err => {
          alert(`There was an error: ${err.message}`);
        }
      }
      //next: this.resetCart();
      //next: response => {},
    //}
    ); */

  
    

    console.log("Customer shipping address:");
    console.log("Country: " + this.checkoutFormGroup.get('shippingAddress')?.value.country.name);
    console.log("State: " + this.checkoutFormGroup.get('shippingAddress')?.value.state.name);

    console.log("Customer billing address:");
    console.log("Country: " + this.checkoutFormGroup.get('billingAddress')?.value.country.name);
    console.log("State: " + this.checkoutFormGroup.get('billingAddress')?.value.state.name);
  }

  resetCart() {
    // reset cart data
    this.cartService.cartItems = [];
    this.cartService.totalQuantity.next(0);
    this.cartService.totalPrice.next(0);

    // reset session storage
    this.cartService.persistCartItems();

    // reset form data
    this.checkoutFormGroup.reset();

    // go back to products page
    this.router.navigateByUrl("/products");
  }

  copyAddress(event: any){
    if(event.target.checked){
       this.billingStates = this.shippingStates;
       this.checkoutFormGroup.controls.billingAddress.setValue(this.checkoutFormGroup.controls.shippingAddress.value);
    }
    else{
      this.checkoutFormGroup.controls.billingAddress.reset();
      this.billingStates = [];
    }
  }
  
  handleMonthsAndYears(){
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup?.value.expirationYear);

    // if the current year equals selected year, then start with current month
    let startMonth: number;
    if(currentYear === selectedYear){
      startMonth = new Date().getMonth() + 1;
    }
    else{
      startMonth = 1;
    }

    this.formService.getCreditCardMonths(startMonth).subscribe(data =>{
      this.creditCardMonths = data;
    })
  }
 
  // Customer Form Group
  get firstName(){
    return this.checkoutFormGroup.get("customer.firstName");
  }
  get lastName(){
    return this.checkoutFormGroup.get("customer.lastName");
  }
  get email(){
    return this.checkoutFormGroup.get("customer.email");
  }

  // Shipping address Form Group
  get shippingCountry(){
    return this.checkoutFormGroup.get("shippingAddress.country");
  }
  get shippingCountryName(){
    return this.checkoutFormGroup.get("shippingAddress")?.value.country.name;
  }
  get shippingStreet(){
    return this.checkoutFormGroup.get("shippingAddress.street");
  }
  get shippingCity(){
    return this.checkoutFormGroup.get("shippingAddress.city");
  }
  get shippingState(){
    return this.checkoutFormGroup.get("shippingAddress.state");
  }
  get shippingZipCode(){
    return this.checkoutFormGroup.get("shippingAddress.zipCode");
  }

  // Billing address Form Group
  get billingCountry(){
    return this.checkoutFormGroup.get("billingAddress.country");
  }
  get billingCountryName(){
    return this.checkoutFormGroup.get("billingAddress")?.value.country.name;
  }
  get billingStreet(){
    return this.checkoutFormGroup.get("billingAddress.street");
  }
  get billingCity(){
    return this.checkoutFormGroup.get("billingAddress.city");
  }
  get billingState(){
    return this.checkoutFormGroup.get("billingAddress.state");
  }
  get billingZipCode(){
    return this.checkoutFormGroup.get("billingAddress.zipCode");
  }

  // Credit Card Form Group
  get nameOnCard(){
    return this.checkoutFormGroup.get("creditCard.nameOnCard");
  }
  get cardNumber(){
    return this.checkoutFormGroup.get("creditCard.cardNumber");
  }
  get securityCode(){
    return this.checkoutFormGroup.get("creditCard.securityCode");
  }
  get cardType(){
    return this.checkoutFormGroup.get("creditCard.cardType");
  }
  get expirationMonth(){
    return this.checkoutFormGroup.get("creditCard.expirationMonth");
  }
  get expirationYear(){
    return this.checkoutFormGroup.get("creditCard.expirationYear");
  }

  reviewOrderTotals(){
    this.cartService.totalQuantity.subscribe(data => this.totalQuantity = data);
    this.cartService.totalPrice.subscribe(data => this.totalPrice = data);
    //this.cartService.computeCartTotals();
  }
}