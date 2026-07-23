package Myproject.product_service.request;


import Myproject.product_service.entity.Attribute;
import Myproject.product_service.entity.Image;
import Myproject.product_service.entity.ProductVariant;
import jakarta.persistence.CascadeType;
import jakarta.persistence.OneToMany;
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

public class ProductUpdateRequest {

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
