package com.example.order_service.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;


@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name ="orders")
public class Order{
    @Id
    @GeneratedValue(strategy= GenerationType.UUID)
    private String orderId;
    private String shopAddress;

    private String note;
    private String customerName;
    private String deliveryAddress;
    private String customerPhoneNumber;

    private String paymentMethod;
    private Double totalMoney;
    private LocalDateTime createdAt = LocalDateTime.now();

    private String userId; // lấy danh sách order
    private int cartId; // sẽ lấy listCartItem bằng CartID

}
