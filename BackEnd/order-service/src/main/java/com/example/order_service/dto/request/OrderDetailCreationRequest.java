package com.example.order_service.dto.request;

import lombok.*;

@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class OrderDetailCreationRequest {
    private String orderId;

    private String productName;
    private String productImage;
    private double productPrice;
    private int productQuantity;

    private double productTotalPrice;
}
