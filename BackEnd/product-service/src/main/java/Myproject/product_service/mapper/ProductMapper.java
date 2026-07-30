package Myproject.product_service.mapper;


import Myproject.product_service.entity.Product;
import Myproject.product_service.request.ProductCreationRequest;
import Myproject.product_service.request.ProductUpdateRequest;
import Myproject.product_service.response.ProductResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring", uses = {ImageMapper.class, AttributeMapper.class, ProductVariantMapper.class})
public interface ProductMapper {
    @Mapping(target = "productId" ,ignore = true)
    Product toProduct(ProductCreationRequest request);

    @Mapping(target = "productVariantResponses", source = "variants")
    @Mapping(target = "imageResponses", source = "images")
    @Mapping(target = "attributeResponses", source = "attributes")
    ProductResponse toProductResponse(Product product);
    void updateProductFromRequest(
            ProductUpdateRequest request,
            @MappingTarget Product product
    );

    List<ProductResponse> toProductResponseList(List<Product> products);

}
