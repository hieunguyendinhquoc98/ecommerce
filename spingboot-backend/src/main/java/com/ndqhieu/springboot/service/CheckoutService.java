package com.ndqhieu.springboot.service;

import com.ndqhieu.springboot.dto.Purchase;
import com.ndqhieu.springboot.dto.PurchaseResponse;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);
}
