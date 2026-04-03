package Myproject.product_service.mapper;


import Myproject.product_service.entity.Product;
import Myproject.product_service.request.ProductCreationRequest;
import Myproject.product_service.request.ProductUpdateRequest;
import Myproject.product_service.response.ProductResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    @Mapping(target = "productId" ,ignore = true)
    Product toProduct(ProductCreationRequest request);
    Product toUpdateProduct(ProductUpdateRequest request);
    ProductResponse toProductResponse(Product product);
    void updateProductFromRequest(
            ProductUpdateRequest request,
            @MappingTarget Product product
    );

}
