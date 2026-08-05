package Myproject.news_service.mapper;

import Myproject.news_service.dto.reponse.ContentResponse;
import Myproject.news_service.dto.reponse.ImageResponse;
import Myproject.news_service.entity.Content;
import Myproject.news_service.entity.Image;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import Myproject.news_service.dto.reponse.NewsResponse;
import Myproject.news_service.dto.request.NewsCreationRequest;
import Myproject.news_service.dto.request.NewsUpdateRequest;
import Myproject.news_service.entity.News;

import java.util.List;

@Mapper(componentModel = "spring")
public interface NewsMapper {

    @Mapping(target = "newsId" , ignore = true)
    News toNews(NewsCreationRequest request);

    News toNewsFromNewsUpdate(NewsUpdateRequest request);

    @Mapping(target = "contentResponses", source = "contents")
    @Mapping(target = "imageResponses", source = "images")
    NewsResponse toNewsResponse(News news);
    List<NewsResponse>  toNewsResponseList(List<News> news);


    ImageResponse toImageResponse(Image image);
    ContentResponse toContentResponse(Content content);
}
