package com.example.order_service.dto.request;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderUpdateStatusRequest {
    private  String status;
}
