package com.example.order_service.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Slf4j
public class OrderResponse {
    private String shopAddress;

    private String note;
    private String customerName;
    private String deliveryAddress;
    private String customerPhoneNumber;

    private String paymentMethod;
    private Double totalMoney;
    private LocalDateTime createdAt = LocalDateTime.now();
    private String order_status;

    private String userId; // lấy danh sách order
    private int cartId; // sẽ lấy listCartItem bằng CartID

}
