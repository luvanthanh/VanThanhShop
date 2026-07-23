package Myproject.product_service.mapper;

import Myproject.product_service.entity.ProductVariant;
import Myproject.product_service.request.ProductVariantCreationRequest;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProductVariantMapper {
    ProductVariant toProductVariant(ProductVariantCreationRequest request);

}
