package Myproject.news_service.service;

import Myproject.news_service.dto.request.NewsCreationRequest;
import Myproject.news_service.dto.request.NewsUpdateRequest;
import Myproject.news_service.dto.reponse.NewsResponse;
import Myproject.news_service.entity.News;
import Myproject.news_service.exception.NewsNotFoundException;
import Myproject.news_service.mapper.NewsMapper;
import Myproject.news_service.repository.NewsRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;


@Service
public class NewsService {
    private final NewsRepository newsRepository;

    private final NewsMapper newsMapper;

    public NewsService(NewsRepository newsRepository, NewsMapper newsMapper) {
        this.newsRepository = newsRepository;
        this.newsMapper = newsMapper;
    }

    @Transactional
    public List<NewsResponse> getAllNews(){

        List<News> list = newsRepository.findAll();
        if(list.isEmpty()){
            throw new  RuntimeException(" don't have any news");
        }

        return  newsMapper.toNewsResponseList(list);
    }

    @Transactional
    public NewsResponse getNewsById(int id){
        News news = newsRepository.getNewsByNewsId(id)
                .orElseThrow(()-> new  NewsNotFoundException(id));
        return newsMapper.toNewsResponse(news);

    }

    @Transactional
    public NewsResponse addNews(NewsCreationRequest request){
        News news =  newsMapper.toNews(request);
        newsRepository.save(news);
        return newsMapper.toNewsResponse(news);

    }

    @Transactional
    public NewsResponse updateNews(NewsUpdateRequest request, int id){
        News news = newsRepository.getNewsByNewsId(id)
                .orElseThrow(() -> new NewsNotFoundException(id));

        newsMapper.toNewsFromNewsUpdate(request);
        newsRepository.save(news);
        return newsMapper.toNewsResponse(news);
    }

    @SuppressWarnings("null")
    public String deletedNews(int newsId){
        News news = newsRepository.getNewsByNewsId(newsId)
                .orElseThrow(() -> new NewsNotFoundException(newsId));
        newsRepository.delete(news);
        return  "news has deleted";
    }

}
