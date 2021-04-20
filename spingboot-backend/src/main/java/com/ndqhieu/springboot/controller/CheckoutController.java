package com.ndqhieu.springboot.controller;

import com.ndqhieu.springboot.dto.Purchase;
import com.ndqhieu.springboot.dto.PurchaseResponse;
import com.ndqhieu.springboot.service.CheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/checkout")
public class CheckoutController {

    private final CheckoutService checkoutService;

    @Autowired
    public CheckoutController(CheckoutService checkoutService){
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase){
        return checkoutService.placeOrder(purchase);//purchase response
    }

}
