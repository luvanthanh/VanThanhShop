package com.example.order_service.service;


import com.example.order_service.dto.request.OrderCreateRequest;
import com.example.order_service.entity.Order;
import com.example.order_service.mapper.OrderMapper;
import com.example.order_service.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;


    @Autowired
    private OrderMapper orderMapper;
    public List<Order> getAllOrder(){
        return orderRepository.findAll();
    }

    public List<Order> getOrderByUserId(String userId){
        return orderRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("không timg thấy"));
    }

    public Order createOrder(OrderCreateRequest request){
        Order order = orderMapper.toOrder(request);
        order.setPaymentMethod(request.getPaymentMethod());
        order.setTotalMoney(request.getTotalMoney());
        return orderRepository.save(order);
    }

    public void deleteOrder(String orderId){
        orderRepository.deleteById(orderId);
    }
}
