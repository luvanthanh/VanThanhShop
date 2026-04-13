package com.example.order_service.service;


import com.example.order_service.dto.request.OrderCreateRequest;
import com.example.order_service.dto.response.OrderResponse;
import com.example.order_service.entity.Order;
import com.example.order_service.mapper.OrderMapper;
import com.example.order_service.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;


    @Autowired
    private OrderMapper orderMapper;
    public List<OrderResponse> getAllOrder(){
        List<Order> listOrder =  orderRepository.findAll();
        List<OrderResponse> orderResponses = new ArrayList<>();
        if(listOrder.isEmpty()){
            throw new RuntimeException(" don't find any order ");

        }
        else{
            for (Order order : listOrder){
                OrderResponse orderResponse = orderMapper.toOrderResponse(order);
                orderResponses.add(orderResponse);
            }
        }
        return orderResponses;
    }

    public List<OrderResponse> getOrderByUserId(String userId){
        List<Order> listOrders = orderRepository.findByUserId(userId);
        List<OrderResponse> orderResponses = new ArrayList<>();
        if(listOrders.isEmpty()){
            throw new RuntimeException(" don't find any order ");

        }
        else{
            for (Order order : listOrders){
                OrderResponse orderResponse = orderMapper.toOrderResponse(order);
                orderResponses.add(orderResponse);
            }
        }
        return orderResponses;
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
