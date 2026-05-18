package com.example.order_service.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class OrderUpdateRequest {
    private String note;
    private String customerName;
    private String deliveryAddress;
    private String customerPhoneNumber;

    private String paymentMethod;
    private Double totalMoney;
    private LocalDateTime createdAt = LocalDateTime.now();
    private String order_status;

}
