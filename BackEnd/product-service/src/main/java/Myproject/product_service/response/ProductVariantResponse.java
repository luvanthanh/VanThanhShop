package Myproject.product_service.response;

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

}
