package com.example.order_service.mapper;


import com.example.order_service.dto.request.OrderCreateRequest;
import com.example.order_service.entity.Order;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "Spring")
public interface OrderMapper {
    @Mapping(target = "orderId", ignore = true)
    Order toOrder(OrderCreateRequest request);
}
