package com.example.order_service.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.order_service.dto.request.OrderCreateRequest;
import com.example.order_service.dto.request.OrderUpdateRequest;
import com.example.order_service.dto.response.ApiResponse;
import com.example.order_service.dto.response.OrderDetailsResponse;
import com.example.order_service.dto.response.OrderResponse;
import com.example.order_service.service.OrderService;

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

    @GetMapping("/{userId}")
    public ApiResponse<List<OrderResponse>> getOrderByUserId(@PathVariable("userId") String userId){
        var result =  orderService.getOrderByUserId(userId);
        return ApiResponse.<List<OrderResponse>>builder()
                .code(1000)
                .message("get orders of" + userId+ " successful ")
                .data(result)
                .build();
    }

    @PostMapping
    public ApiResponse<OrderResponse> createOrder(@RequestBody OrderCreateRequest request){
        var result = orderService.createOrder(request);
        return ApiResponse.<OrderResponse>builder()
                .code(1000)
                .message(" Create order successful! ")
                .data(result)
                .build();
    }

    @PutMapping("/{orderID}")
    public ApiResponse<OrderResponse> updateOrder(@PathVariable String orderID, @RequestBody OrderUpdateRequest request){
        var result = orderService.updateOrder(orderID, request);
        return ApiResponse.<OrderResponse>builder()
                .code(1000)
                .message(" update order successful ")
                .data(result)
                .build();
    }

    @DeleteMapping("/orderId")
    public void deleteOrder(@PathVariable("orderId") String orderId){
        orderService.deleteOrder(orderId);
    }

}
