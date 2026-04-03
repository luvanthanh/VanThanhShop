package Myproject.product_service.request;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class ProductCreationRequest {
    private String productBrand;
    private String productName;
    private float productScreenSize;
    private String productColor;
    private int productRam;
    private int productRom;
    private String productDescription;
    private Date productReleaseDate;
    private int productStockQuantity;
    private int productWarranty;
    private long productPrice;
    private String productFormattedPrice;
    private String productImageUrl;
    private String productImageUrl1;
    private String productImageUrl2;
    private String productImageUrl3;
}
