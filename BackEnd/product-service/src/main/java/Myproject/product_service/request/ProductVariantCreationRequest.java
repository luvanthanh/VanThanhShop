package Myproject.product_service.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class ProductVariantCreationRequest {
    private int productId;

    private int productRam;
    private int productRom;
    private String productColor;
    private int productStockQuantity;
    private double  productPrice;
}
