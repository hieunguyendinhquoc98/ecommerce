package com.ndqhieu.springboot.dto;

import com.ndqhieu.springboot.model.Address;
import com.ndqhieu.springboot.model.Customer;
import com.ndqhieu.springboot.model.Order;
import com.ndqhieu.springboot.model.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}
