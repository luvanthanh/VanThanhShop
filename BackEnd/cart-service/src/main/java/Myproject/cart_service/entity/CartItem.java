package Myproject.cart_service.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cart_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cartItemsId;

    private int cartId;

    private int productId;
    private String productName;
    private String productImage;

    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private double productPrice;
    private int quantity;
}
