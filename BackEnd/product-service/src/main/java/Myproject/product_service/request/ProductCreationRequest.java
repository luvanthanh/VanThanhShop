package Myproject.product_service.request;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class ProductCreationRequest {
    private String productBrand;
    private String productName;
    private float productScreenSize;
    private String productDescription;
    private Date productReleaseDate;
    private int productWarranty;
    private String productImageThumbnail;

    private List<ProductVariantCreationRequest> variants;

    private List<ImageCreationRequest> images;

    private List<AttributeCreationRequest> attributes;
}
