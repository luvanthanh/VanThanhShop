package com.example.order_service.mapper;


import com.example.order_service.dto.request.OrderDetailCreationRequest;
import com.example.order_service.dto.response.OrderDetailsResponse;
import com.example.order_service.entity.OrderDetails;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface OrderDetailMapper {

    OrderDetails toOrderDetail (OrderDetailCreationRequest request);

    OrderDetailsResponse toOrderDetailsResponse (OrderDetails orderDetails);
}
