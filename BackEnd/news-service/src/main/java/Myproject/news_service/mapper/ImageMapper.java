package Myproject.news_service.mapper;

import Myproject.news_service.dto.reponse.ImageResponse;
import Myproject.news_service.entity.Image;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
public interface ImageMapper {
    ImageResponse imageToImageResponse(Image image);
}
