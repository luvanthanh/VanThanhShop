package Myproject.cart_service.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartItemCreationRequest {
    private int cartId;
    private int productId;
    private int quantity;
}
