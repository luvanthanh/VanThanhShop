package Myproject.cart_service.dto.reponse;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartItemResponse {
    private int cartItemId;
    private int productId;
    private String imageUrl;
    private String productName;
    private  double productPrice;
    private int quantity;
}
