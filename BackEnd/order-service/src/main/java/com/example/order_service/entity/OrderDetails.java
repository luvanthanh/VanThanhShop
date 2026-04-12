package com.example.order_service.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.annotation.Id;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Slf4j
@Table(name = "order_details")
public class OrderDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String orderDetailId;
    private String orderId;

    private String productName;
    private String productImage;
    private double productPrice;
    private int productQuantity;

    private double productTotalPrice;

}
