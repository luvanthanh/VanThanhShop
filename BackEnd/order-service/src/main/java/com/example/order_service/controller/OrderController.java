package com.example.order_service.controller;


import java.util.List;

import com.example.order_service.dto.request.OrderUpdateStatusRequest;
import com.example.order_service.dto.response.OrderDetailsResponse;
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
import com.example.order_service.dto.response.ApiResponse;
import com.example.order_service.dto.response.OrderResponse;
import com.example.order_service.service.OrderService;

@RestController
@RequestMapping("/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;


//    lấy tất cả order
    @GetMapping
    public ApiResponse<List<OrderResponse>> getAllOrders() {
        var result = orderService.getAllOrder();
        return ApiResponse.<List<OrderResponse>>builder()
                .code(1000)
                .message(" get all orders successful ")
                .data(result)
                .build();
    }
//    lấy order theo userId
    @GetMapping("/{userId}")
    public ApiResponse<List<OrderResponse>> getOrderByUserId(@PathVariable("userId") String userId){
        var result =  orderService.getOrderByUserId(userId);
        return ApiResponse.<List<OrderResponse>>builder()
                .code(1000)
                .message("get orders of" + userId+ " successful ")
                .data(result)
                .build();
    }

//    lấy chi tiết đơn hàng theo orderId
    @GetMapping("/{orderId}/details")
    public ApiResponse<List<OrderDetailsResponse>> getOrderDetailsByOrderId(@PathVariable String orderId){
        var result = orderService.getOrderDetails(orderId);
        return ApiResponse.<List<OrderDetailsResponse>>builder()
                .code(1000)
                .message("get orders of" + orderId+ " successful ")
                .data(result)
                .build();
    }

//    tạo mới order
    @PostMapping
    public ApiResponse<OrderResponse> createOrder(@RequestBody OrderCreateRequest request){
        var result = orderService.createOrder(request);
        return ApiResponse.<OrderResponse>builder()
                .code(1000)
                .message(" Create order successful! ")
                .data(result)
                .build();
    }
//cập nhận trạng thái đơn hàng
    @PutMapping("/{orderId}")
    public ApiResponse<OrderResponse> updateOrderStatus (@PathVariable String orderId, @RequestBody OrderUpdateStatusRequest request){
        var result = orderService.updateOrderStatus(orderId,request);

        return ApiResponse.<OrderResponse>builder()
                .code(1000)
                .message("update order status successful! ")
                .data(result)
                .build();
    }

//  lấy đơn hàng theo tên khách hàng
    @GetMapping("/getOrderByCustomer/{customerName}")
    public ApiResponse<List<OrderResponse>> getOrderByCustomerName(@PathVariable("customerName") String customerName){
        var result = orderService.getOrderByCustomer(customerName);
        return ApiResponse.<List<OrderResponse>>builder()
                .code(1000)
                .message("get orders of" + customerName+ " successful ")
                .data(result)
                .build();
    }

    @GetMapping("/getOrderByCustomerPhoneNumber/{phoneNumber}")
    public ApiResponse<List<OrderResponse>> getOrderByCustomerPhoneNumber(@PathVariable String  phoneNumber){
        var result = orderService.getOrderByCustomerPhoneNumber(phoneNumber);
        return ApiResponse.<List<OrderResponse>>builder()
                .code(1000)
                .message("get orders of" +phoneNumber+ " successful ")
                .data(result)
                .build();
    }


    @DeleteMapping("/orderId")
    public void deleteOrder(@PathVariable("orderId") String orderId){
        orderService.deleteOrder(orderId);
    }

}
