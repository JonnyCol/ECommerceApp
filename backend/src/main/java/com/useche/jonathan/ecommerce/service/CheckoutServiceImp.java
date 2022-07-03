package com.useche.jonathan.ecommerce.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.useche.jonathan.ecommerce.dao.CustomerRepository;
import com.useche.jonathan.ecommerce.dto.PaymentInfo;
import com.useche.jonathan.ecommerce.dto.Purchase;
import com.useche.jonathan.ecommerce.dto.PurchaseResponse;
import com.useche.jonathan.ecommerce.entity.Customer;
import com.useche.jonathan.ecommerce.entity.Order;
import com.useche.jonathan.ecommerce.entity.OrderContents;


@Service   //this is a service implementation
public class CheckoutServiceImp implements CheckoutService
{
	private CustomerRepository customerRepository;
	

	public CheckoutServiceImp(CustomerRepository customerRepository, @Value("${stripe.key.secret}") String secretKey)
	{
		this.customerRepository = customerRepository;	
		
		// Initialize Stripe API with secret key
		Stripe.apiKey = secretKey;	
	}
	
	
	@Override
	@Transactional
	public PurchaseResponse customerOrder(Purchase purchase)
	{
		// retrieve the order info from dto
		Order order = purchase.getOrder();
		
		// generate tracking number
		String trackingNumber = generateOrderTrackingNumber();
		order.setTrackingNumber(trackingNumber);
		
		// populate order with orderItems
		Set<OrderContents> orderContents = purchase.getOrderContents();
		//loop through items in orderContents and add each of those items to order
		orderContents.forEach(item -> order.add(item));
		
		
		// populate order with billingAddress and shippingAddress
		order.setBillingAddress(purchase.getBillingAddress());
		order.setShippingAddress(purchase.getShippingAddress());
	
		
		// populate customer with order
		Customer customer = purchase.getCustomer();
		
		// check if customer already exists
		String email = customer.getEmail();
		Customer DBCustomer = customerRepository.findByEmail(email);
		
		/*
		if(DBCustomer != null)
		{
			DBCustomer.addOrder(order);
		}
		else
		{
			customer.addOrder(order);
		}*/
		
		
		if(DBCustomer != null)
		{
		   customer = DBCustomer;
		}
		 
		customer.addOrder(order);
		 
		
		
		// save to the database
		customerRepository.save(customer);
		
		// return a response
		return new PurchaseResponse(trackingNumber);
	}


	private String generateOrderTrackingNumber() 
	{
		// generate a random UUID number (UUID version-4)
		// check details at: https://en.wikipedia.org/wiki/Universally_unique_identifier
		return UUID.randomUUID().toString();	
	}


	@Override
	public PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException
	{
		// set up payment method types
		List<String> paymentMethodTypes = new ArrayList<>();
		paymentMethodTypes.add("card");
		
		Map<String, Object> params = new HashMap<>();
		params.put("amount", paymentInfo.getAmount());
		params.put("currency", paymentInfo.getCurrency());
		params.put("payment_method_types", paymentMethodTypes);
		params.put("description", "Purchase");
		params.put("receipt_email", paymentInfo.getReceiptEmail());
		
		return PaymentIntent.create(params);		
	}
}
