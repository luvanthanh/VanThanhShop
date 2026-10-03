package com.example.order_service.dto.request;


import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderCreateRequest {
    private String shopAddress;

    private String note;
    private String customerName;
    private String deliveryAddress;
    private String customerPhoneNumber;

    private String paymentMethod;
    private Double totalMoney;
    private LocalDateTime createdAt = LocalDateTime.now();
    private String order_status;

    private String userId;
    private int cartId;

    private List<OrderDetailCreationRequest> orderDetails;
}
