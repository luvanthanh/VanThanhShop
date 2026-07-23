package Myproject.product_service.request;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class ProductUpdateRequest {

    private String productBrand;
    private String productName;
    private float productScreenSize;

    private String productDescription;
    private Date productReleaseDate;
    private int productStockQuantity;
    private int productWarranty;

    private String productImageThumbnail;

}
