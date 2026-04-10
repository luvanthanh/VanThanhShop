package Myproject.news_service.service;

import Myproject.news_service.dto.reponse.ApiResponse;
import Myproject.news_service.dto.request.NewsCreationRequest;
import Myproject.news_service.dto.request.NewsUpdateRequest;
import Myproject.news_service.entity.News;
import Myproject.news_service.mapper.NewsMapper;
import Myproject.news_service.repository.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NewsService {
    @Autowired
    private NewsRepository newsRepository;

    @Autowired
    private NewsMapper newsMapper;

    public List<News> getAllNews(){
        List<News> list = newsRepository.findAll();
        if (list.isEmpty()){
            throw new RuntimeException(" don't have any news");
        }
        else{
            return list;
        }
    }

    public News getNewsById(int id){
        News news = newsRepository.getNewsByNewsId(id)
                .orElseThrow(()-> new RuntimeException(" lỗi khi lấy dữ liệu!"));
        return  news;
    }

    public News addNews(NewsCreationRequest request){
        News news = new News();
        news =newsMapper.toNews(request);
        newsRepository.save(news);
        return  news;
    }

    public News updateNews(NewsUpdateRequest request, int id){
        News news = newsRepository.getNewsByNewsId(id)
                .orElseThrow(()-> new RuntimeException(" lỗi khi lấy dữ liệu!"));
        news = newsMapper.toNewsUpdate(request);
        News savedNews = newsRepository.save(news);
        return news;
    }

    public String deletedNews(int newsId){
        newsRepository.deleteByNewsId(newsId);
        return  "news has deleted";
    }
}
