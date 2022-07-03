package com.useche.jonathan.ecommerce.service;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.useche.jonathan.ecommerce.dto.PaymentInfo;
import com.useche.jonathan.ecommerce.dto.Purchase;
import com.useche.jonathan.ecommerce.dto.PurchaseResponse;

public interface CheckoutService 
{
	PurchaseResponse customerOrder(Purchase purchase);
	PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException;
}
