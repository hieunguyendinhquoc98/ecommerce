package com.ndqhieu.springboot.repository;

import com.ndqhieu.springboot.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Customer findByEmail(String theEmail);
}
