package Myproject.product_service.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class ProductVariantCreationRequest {

    private int productRam;
    private int productRom;
    private String productColor;

    private int productStockQuantity;
    private BigDecimal productPrice;
}
