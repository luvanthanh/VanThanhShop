package Myproject.news_service.mapper;


import Myproject.news_service.dto.reponse.ContentResponse;
import Myproject.news_service.entity.Content;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface ContentMapper {

    ContentResponse contentToContentResponse(Content content);

}
