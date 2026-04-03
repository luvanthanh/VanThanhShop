package Myproject.news_service.mapper;

import Myproject.news_service.dto.reponse.NewsResponse;
import Myproject.news_service.dto.request.NewsCreationRequest;
import Myproject.news_service.dto.request.NewsUpdateRequest;
import Myproject.news_service.entity.News;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface NewsMapper {

    @Mapping(target = "newsId" , ignore = true)
    News toNews(NewsCreationRequest request);
    News toNewsUpdate(NewsUpdateRequest request );
    NewsResponse toNewsResponse(News news);


}
