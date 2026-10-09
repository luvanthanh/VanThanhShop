package com.example.order_service.mapper;

import com.example.order_service.dto.request.OrderCreateRequest;
import com.example.order_service.dto.request.OrderUpdateStatusRequest;
import com.example.order_service.dto.response.OrderDetailsResponse;
import com.example.order_service.dto.response.OrderResponse;
import com.example.order_service.entity.Order;
import com.example.order_service.entity.OrderDetails;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface OrderMapper {

    // Tạo Order từ OrderCreateRequest
    @Mapping(target = "orderId", ignore = true)
    Order toOrder(OrderCreateRequest request);

    // Order -> OrderResponse
    OrderResponse toOrderResponse(Order order);

    void toOrderUpdate(
            @MappingTarget Order order,
            OrderUpdateStatusRequest request
    );

}