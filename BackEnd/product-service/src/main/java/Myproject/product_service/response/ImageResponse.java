package Myproject.product_service.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class ImageResponse {
    private int productId;

    private String imageUrl;
    private String imageDescribe ;

}
