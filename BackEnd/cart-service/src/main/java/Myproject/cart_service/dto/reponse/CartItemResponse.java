package Myproject.cart_service.dto.reponse;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartItemResponse {
    private int cartItemsId;
    private int productId;
    private String productImage;
    private String productName;

    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private  double productPrice;
    private int quantity;
}
