package com.example.order_service.mapper;


import com.example.order_service.dto.request.OrderCreateRequest;
import com.example.order_service.dto.response.OrderResponse;
import com.example.order_service.entity.Order;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Optional;

@Mapper(componentModel = "Spring")
public interface OrderMapper {
    @Mapping(target = "orderId", ignore = true)
    Order toOrder(OrderCreateRequest request);
    OrderResponse toOrderResponse(Order order);


}
