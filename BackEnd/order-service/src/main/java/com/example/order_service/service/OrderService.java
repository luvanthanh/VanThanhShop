package com.example.order_service.service;


import com.example.order_service.client.CartItemClient;
import com.example.order_service.dto.request.OrderCreateRequest;
import com.example.order_service.dto.request.OrderUpdateRequest;
import com.example.order_service.dto.response.ApiResponse;
import com.example.order_service.dto.response.CartItemResponse;
import com.example.order_service.dto.response.OrderDetailsResponse;
import com.example.order_service.dto.response.OrderResponse;
import com.example.order_service.entity.Order;
import com.example.order_service.entity.OrderDetails;
import com.example.order_service.mapper.OrderMapper;
import com.example.order_service.repository.OrderDetailsRepository;
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
    CartItemClient cartItemClient;

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    OrderDetailsRepository orderDetailsRepository;
// thêm đơn hàng
    public OrderResponse createOrder(OrderCreateRequest request){
        Order order = orderMapper.toOrder(request);

        orderRepository.save(order);
        Order savedOrder = orderRepository.save(order);
        return orderMapper.toOrderResponse(savedOrder);

    }
// thêm chi tiết đơn hàng
    public List<OrderDetailsResponse> createdOrderDetails (String orderId){
        Order order =  orderRepository.findById(orderId).orElse(null);

        ApiResponse<List<CartItemResponse>> cartItemsResponse = cartItemClient.getCartItemByCartId(order.getCartId());

        List<CartItemResponse> listItems = cartItemsResponse.getData();
        List<OrderDetailsResponse> listOrderDetailsResponse = new  ArrayList<>();

        for( CartItemResponse item : listItems){
            OrderDetails orderDetails = new OrderDetails();

            orderDetails.setOrderId(orderId);
            orderDetails.setProductImage(item.getProductImage());
            orderDetails.setProductName(item.getProductName());
            orderDetails.setProductPrice(item.getProductPrice());
            orderDetails.setProductQuantity(item.getProductQuantity());
            orderDetails.setProductTotalPrice(item.getProductPrice() * item.getProductQuantity());
            System.out.println("Quantity: " + item.getProductQuantity());
            System.out.println("Price: " + item.getProductPrice());
            orderDetailsRepository.save(orderDetails);

            OrderDetailsResponse orderDetailsResponse = orderMapper.toOrderDetailsResponse(orderDetails);
            listOrderDetailsResponse.add(orderDetailsResponse);
        }
        return listOrderDetailsResponse;
    }
// lấy tất cả đơn hàng
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
// lấy danh sách đơn hàng theo user id
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


//    lấy chi tiết đơn hàng
    public List<OrderDetailsResponse> getOrderDetails(String orderId){
        List<OrderDetails> listOrderDetails = orderDetailsRepository.findByOrderId(orderId);
        List<OrderDetailsResponse> orderDetailsResponses = new ArrayList<>();
        if(listOrderDetails.isEmpty()){
            throw new RuntimeException(" don't find any order ");
        }
        else{
            for(OrderDetails orderDetails : listOrderDetails){
                OrderDetailsResponse orderDetailsResponse = orderMapper.toOrderDetailsResponse(orderDetails);
                orderDetailsResponses.add(orderDetailsResponse);
            }
        }
        return orderDetailsResponses;
    }

    public OrderResponse updateOrder (String orderId, OrderUpdateRequest request){
        Order  order = orderRepository.findByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("order not found"));
        order = orderMapper.toOrderUpdate(request);
        return orderMapper.toOrderResponse(orderRepository.save(order));
    }

//    xóa đơn hàng
    public void deleteOrder(String orderId){
        orderRepository.deleteById(orderId);
    }
}
