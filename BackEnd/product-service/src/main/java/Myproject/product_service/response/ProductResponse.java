package Myproject.product_service.response;

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
public class ProductResponse {
    private int productId;

    private String productBrand;
    private String productName;
    private float productScreenSize;
    private String productDescription;
    private Date productReleaseDate;
    private int productWarranty;
    private String productImageThumbnail ;

    private List<ProductVariantResponse> productVariantResponses;
    private List<ImageResponse> imageResponses;
    private List<AttributeResponse> attributeResponses;
}
