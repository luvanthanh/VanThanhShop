package Myproject.product_service.mapper;

import Myproject.product_service.entity.Image;
import Myproject.product_service.request.ImageCreationRequest;
import Myproject.product_service.response.ImageResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ImageMapper {
    Image toImage(ImageCreationRequest request);
    ImageResponse toImageResponse(Image image);
}
