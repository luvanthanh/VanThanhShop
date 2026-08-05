package Myproject.cart_service.dto.reponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Slf4j
public class ProductResponse {
    private int productId;
    private String productBrand;
    private String productName;
    private float productScreenSize;
    private String productDescription;
    private Date productReleaseDate;
    private int productWarranty;
    private String productImageThumbnail;
    private List<ProductVariantResponse> productVariantResponses;
    private List<ImageResponse> imageResponses;
    private List<AttributeResponse> attributeResponses;
}
