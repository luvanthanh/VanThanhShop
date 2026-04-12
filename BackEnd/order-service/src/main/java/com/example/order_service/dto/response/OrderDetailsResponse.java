package com.example.order_service.dto.response;


import jakarta.persistence.Table;
import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder


public class OrderDetailsResponse {

    private String orderDetailId;
    private String orderId;

    private String productName;
    private String productImage;
    private double productPrice;
    private int productQuantity;

    private double productTotalPrice;
}
