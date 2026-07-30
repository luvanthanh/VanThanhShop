package Myproject.product_service.mapper;

import Myproject.product_service.entity.ProductVariant;
import Myproject.product_service.request.ProductVariantCreationRequest;
import Myproject.product_service.response.ProductVariantResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProductVariantMapper {
    ProductVariant toProductVariant(ProductVariantCreationRequest request);
    ProductVariantResponse toProductVariantResponse(ProductVariant productVariant);
}
