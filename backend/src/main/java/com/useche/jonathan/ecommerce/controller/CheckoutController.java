package com.useche.jonathan.ecommerce.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.useche.jonathan.ecommerce.dto.PaymentInfo;
import com.useche.jonathan.ecommerce.dto.Purchase;
import com.useche.jonathan.ecommerce.dto.PurchaseResponse;
import com.useche.jonathan.ecommerce.service.CheckoutService;

@RestController
//@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/checkout")
public class CheckoutController 
{
	private CheckoutService checkoutService;
	
	
	public CheckoutController(CheckoutService checkoutService)
	{
		this.checkoutService = checkoutService;
	}
	
	
	@PostMapping("/purchase")
	public PurchaseResponse placeOrder(@RequestBody Purchase purchase)
	{
		PurchaseResponse purchaseResponse = checkoutService.customerOrder(purchase);
		return purchaseResponse;	
	}
	
	@PostMapping("/payment-intent")
	public ResponseEntity<String> createPaymentIntent(@RequestBody PaymentInfo paymentInfo) throws StripeException
	{
		PaymentIntent paymentIntent = checkoutService.createPaymentIntent(paymentInfo);
		String paymentStr = paymentIntent.toJson();
		
		return new ResponseEntity<>(paymentStr, HttpStatus.OK);	
	}

}
