package Myproject.cart_service.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "cart_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cartItemsId;

    private int cartId;

    private int productId;
    private String productName;
    private String productImage;

    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private BigDecimal productPrice;
    private int quantity;
}
