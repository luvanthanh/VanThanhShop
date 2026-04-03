package com.example.order_service.dto.request;

import jakarta.persistence.Column;
import lombok.*;

import java.time.LocalDateTime;
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

    private String userId;
    private int cartId;
}
