package com.example.order_service.mapper;


import com.example.order_service.dto.request.OrderCreateRequest;
import com.example.order_service.dto.response.OrderDetailsResponse;
import com.example.order_service.dto.response.OrderResponse;
import com.example.order_service.entity.Order;
import com.example.order_service.entity.OrderDetails;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Optional;

@Mapper(componentModel = "Spring")
public interface OrderMapper {
    @Mapping(target = "orderId", ignore = true)
    Order toOrder(OrderCreateRequest request);
    @Mapping(source = "orderId", target = "orderId")
    OrderResponse toOrderResponse(Order order);

    @Mapping(source = "orderDetailId", target = "orderDetailId")
    OrderDetailsResponse toOrderDetailsResponse(OrderDetails orderDetails);

}
