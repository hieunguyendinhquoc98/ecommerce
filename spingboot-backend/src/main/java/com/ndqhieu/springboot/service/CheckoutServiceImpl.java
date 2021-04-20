package com.ndqhieu.springboot.service;

import com.ndqhieu.springboot.dto.Purchase;
import com.ndqhieu.springboot.dto.PurchaseResponse;
import com.ndqhieu.springboot.model.Customer;
import com.ndqhieu.springboot.model.Order;
import com.ndqhieu.springboot.model.OrderItem;
import com.ndqhieu.springboot.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService{

    private CustomerRepository customerRepository;

    @Autowired
    public CheckoutServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }
    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
        //retrieve the order info from dto
        Order order = purchase.getOrder();

        //generate tracking number
        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);

        //populate order with orderItems, billing & shipping Address
        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(order::add);
        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());
        //populate customer with order
        Customer customer = purchase.getCustomer();

        Customer customerFromDb = customerRepository.findByEmail(customer.getEmail());
        if(customerFromDb != null) {
            customer = customerFromDb;
        }
        customer.add(order);

        //save to the db
        customerRepository.save(customer);
        //return res
        return new PurchaseResponse(orderTrackingNumber);
    }

    private String generateOrderTrackingNumber() {
        return UUID.randomUUID().toString();
    }
}
