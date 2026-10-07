package com.example.order_service.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


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
    private String userId; // lấy danh sách order
    private int cartId;

    private String shopAddress;

    private String note;
    private String customerName;
    private String deliveryAddress;
    private String customerPhoneNumber;

    private String paymentMethod;
    private Double totalMoney;
    private LocalDateTime createdAt = LocalDateTime.now();
    private String order_status;


    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderDetails> orderDetails = new ArrayList<>();

}
