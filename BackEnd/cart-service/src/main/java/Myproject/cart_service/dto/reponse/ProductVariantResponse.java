package Myproject.cart_service.dto.reponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductVariantResponse {
    private int productRam;
    private int productRom;
    private String productColor;
    private double productPrice;
    private int productStockQuantity;

    public double getProductPrice() {
        return productPrice;
    }

    public int getProductStockQuantity() {
        return productStockQuantity;
    }
}
