package com.example.order_service.repository;

import com.example.order_service.entity.OrderDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderDetailsRepository extends JpaRepository<OrderDetails, String> {
    Optional<OrderDetails> findById(String id);
    List<OrderDetails> findByOrderId(String orderId);

}
