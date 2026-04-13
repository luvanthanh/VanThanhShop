package com.example.order_service.controller;


import com.example.order_service.dto.request.OrderCreateRequest;
import com.example.order_service.dto.response.ApiResponse;
import com.example.order_service.dto.response.OrderResponse;
import com.example.order_service.entity.Order;
import com.example.order_service.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping
    public ApiResponse<List<OrderResponse>> getAllOrders() {
        var result = orderService.getAllOrder();
        return ApiResponse.<List<OrderResponse>>builder()
                .code(1000)
                .message(" get all orders successful ")
                .data(result)
                .build();
    }

    @GetMapping("getOrderByUserId/{userId}")
    public ApiResponse<List<OrderResponse>> getOrderByUserId(@PathVariable("userId") String userId){
        var result =  orderService.getOrderByUserId(userId);
        return ApiResponse.<List<OrderResponse>>builder()
                .code(1000)
                .message(" get orders successful ")
                .data(result)
                .build();
    }

    @PostMapping
    public Order createOrder(@RequestBody OrderCreateRequest request){
        return  orderService.createOrder(request);
    }

    @DeleteMapping("/orderId")
    public void deleteOrder(@PathVariable("orderId") String orderId){
         orderService.deleteOrder(orderId);
    }

}
