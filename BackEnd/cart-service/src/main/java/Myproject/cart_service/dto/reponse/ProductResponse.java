package Myproject.cart_service.dto.reponse;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Slf4j
public class ProductResponse {
    private int productId;
    private String productImageUrl;
    private String productName;
    private double productPrice;
}
