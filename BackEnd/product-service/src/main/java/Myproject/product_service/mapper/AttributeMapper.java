package Myproject.product_service.mapper;


import Myproject.product_service.entity.Attribute;
import Myproject.product_service.request.AttributeCreationRequest;
import Myproject.product_service.response.AttributeResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AttributeMapper {
    Attribute toAttribute(AttributeCreationRequest request);
    AttributeResponse toAttributeResponse(Attribute attribute);
}
