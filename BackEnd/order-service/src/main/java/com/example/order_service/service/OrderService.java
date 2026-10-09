package com.example.order_service.service;


import com.example.order_service.client.CartItemClient;
import com.example.order_service.dto.request.OrderCreateRequest;
import com.example.order_service.dto.request.OrderUpdateStatusRequest;
import com.example.order_service.dto.response.ApiResponse;
import com.example.order_service.dto.response.CartItemResponse;
import com.example.order_service.dto.response.OrderDetailsResponse;
import com.example.order_service.dto.response.OrderResponse;
import com.example.order_service.entity.Order;
import com.example.order_service.entity.OrderDetails;
import com.example.order_service.mapper.OrderDetailMapper;
import com.example.order_service.mapper.OrderMapper;
import com.example.order_service.repository.OrderDetailsRepository;
import com.example.order_service.repository.OrderRepository;
import jakarta.transaction.Transactional;
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
    private OrderDetailMapper orderDetailMapper;

    @Autowired
    OrderDetailsRepository orderDetailsRepository;


    // thêm đơn hàng
    @Transactional
    public OrderResponse createOrder(OrderCreateRequest request){

        Order order = orderMapper.toOrder(request);
        Order savedOrder = orderRepository.save(order);

        ApiResponse<List<CartItemResponse>> cartItemsResponse = cartItemClient.getCartItemByCartId(savedOrder.getCartId());

        List<CartItemResponse> listItems = cartItemsResponse.getData();

        List<OrderDetailsResponse> listOrderDetailsResponse = new ArrayList<>();

        for( CartItemResponse item : listItems){
            OrderDetails orderDetails = new OrderDetails();

            // Liên kết Order với OrderDetails
            orderDetails.setOrder(savedOrder);

            orderDetails.setProductImage(item.getProductImage());
            orderDetails.setProductName(item.getProductName());
            orderDetails.setProductPrice(item.getProductPrice());
            orderDetails.setProductQuantity(item.getProductQuantity());
            orderDetails.setProductTotalPrice(item.getProductPrice() * item.getProductQuantity());
            // Lưu OrderDetails
            OrderDetails savedOrderDetails = orderDetailsRepository.save(orderDetails);

            // Chuyển sang Response
            OrderDetailsResponse orderDetailsResponse = orderDetailMapper.toOrderDetailsResponse(savedOrderDetails);

            listOrderDetailsResponse.add(orderDetailsResponse);

        }
        // 5. Tạo OrderResponse
        OrderResponse orderResponse = orderMapper.toOrderResponse(savedOrder);

        // 6. Gắn danh sách OrderDetails vào response
        orderResponse.setOrderDetails(listOrderDetailsResponse);

        return orderResponse;
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
        List<OrderDetails> listOrderDetails = orderDetailsRepository.findByOrder_OrderId(orderId);
        List<OrderDetailsResponse> orderDetailsResponses = new ArrayList<>();
        if(listOrderDetails.isEmpty()){
            throw new RuntimeException(" don't find any order ");
        }
        else{
            for(OrderDetails orderDetails : listOrderDetails){
                OrderDetailsResponse orderDetailsResponse = orderDetailMapper.toOrderDetailsResponse(orderDetails);
                orderDetailsResponses.add(orderDetailsResponse);
            }
        }
        return orderDetailsResponses;
    }


//    cập nhận trạng thái đơn hàng
    @Transactional
    public OrderResponse updateOrderStatus(String orderId, OrderUpdateStatusRequest request){
        Order order = orderRepository.findByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("order not found"));
        order.setOrder_status(request.getOrder_status());
        Order updatedOrder = orderRepository.save(order);
        return orderMapper.toOrderResponse(updatedOrder);
    }


//    lấy danh sách đơn hàng theo tên khách hàng
    public List<OrderResponse> getOrderByCustomer(String customerName){
        List<Order> listOrder = orderRepository.findByCustomerName(customerName)
                .orElseThrow(() -> new RuntimeException("order not found"));
        List<OrderResponse> orderResponses = new ArrayList<>();
        for( Order order : listOrder){
            OrderResponse orderResponse = orderMapper.toOrderResponse(order);
            orderResponses.add(orderResponse);
        }
        return  orderResponses;
    }

    //    lấy danh sách đơn hàng theo số điện thoại
    public List<OrderResponse> getOrderByCustomerPhoneNumber(String phoneNumber){
        List<Order> listOrder = orderRepository.findByCustomerPhoneNumber(phoneNumber)
                .orElseThrow(() -> new RuntimeException("order not found"));
        List<OrderResponse> orderResponses = new ArrayList<>();
        for( Order order : listOrder){
            OrderResponse orderResponse = orderMapper.toOrderResponse(order);
            orderResponses.add(orderResponse);
        }
        return  orderResponses;
    }


    //    xóa đơn hàng
    public void deleteOrder(String orderId){
        orderRepository.deleteById(orderId);
    }
}
