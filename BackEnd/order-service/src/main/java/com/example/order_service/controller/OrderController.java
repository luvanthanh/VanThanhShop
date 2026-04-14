package com.example.order_service.controller;


import com.example.order_service.dto.request.OrderCreateRequest;
import com.example.order_service.dto.request.OrderDetailCreationRequest;
import com.example.order_service.dto.response.ApiResponse;
import com.example.order_service.dto.response.OrderDetailsResponse;
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
    public ApiResponse<OrderResponse> createOrder(@RequestBody OrderCreateRequest request){
        var result =  orderService.createOrder(request);
        return ApiResponse.<OrderResponse>builder()
                .code(1000)
                .message(" create order successful ")
                .data(result)
                .build();
    }
    @PostMapping("/{orderId}")
    public ApiResponse<List<OrderDetailsResponse>> createOrderDetails(@PathVariable String  orderId){
        var result = orderService.createdOrderDetails(orderId);
        return ApiResponse.<List<OrderDetailsResponse>>builder()
                .code(1000)
                .message(" create order details successful ")
                .data(result)
                .build();
    }

    @DeleteMapping("/orderId")
    public void deleteOrder(@PathVariable("orderId") String orderId){
         orderService.deleteOrder(orderId);
    }




}
