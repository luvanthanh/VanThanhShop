package Myproject.news_service.service;

import Myproject.news_service.dto.reponse.APIResponse;
import Myproject.news_service.dto.reponse.NewsResponse;
import Myproject.news_service.dto.request.NewsCreationRequest;
import Myproject.news_service.dto.request.NewsUpdateRequest;
import Myproject.news_service.entity.News;
import Myproject.news_service.mapper.NewsMapper;
import Myproject.news_service.repository.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.fasterxml.classmate.AnnotationOverrides.builder;

@Service
public class NewsService {
    @Autowired
    private NewsRepository newsRepository;

    @Autowired
    private NewsMapper newsMapper;

    public APIResponse<List<News>> getAllNews(){
        List<News> list = newsRepository.findAll();
        return APIResponse.<List<News>>builder()
                .code(1000)
                .message(" Đã lấy dữ liệu thành công!")
                .data(list)
                .build();
    }

//    get news bằng id
    public APIResponse<News> getNewsById(int id){
        News news = newsRepository.getNewsByNewsId(id)
                .orElseThrow(()-> new RuntimeException(" lỗi khi lấy dữ liệu!"));
        return APIResponse.<News>builder()
                .code(1000)
                .message(" đã lấy dữ liệu thành công!")
                .data(news)
                .build();
    }

    public APIResponse<News> addNews(NewsCreationRequest request){
        News news = new News();
        news =newsMapper.toNews(request);
        newsRepository.save(news);
        return APIResponse.<News>builder()
                .code(1000)
                .message("đã lấy dữ liệu thành công!")
                .data(news)
                .build();
    }

    public APIResponse<News> updateNews(NewsUpdateRequest request, int id){
        News news = newsRepository.getNewsByNewsId(id)
                .orElseThrow(()-> new RuntimeException(" lỗi khi lấy dữ liệu!"));
        news = newsMapper.toNewsUpdate(request);
        News savedNews = newsRepository.save(news);
        return APIResponse.<News>builder()
                .code(1000)
                .message(" đã lưu thành công")
                .data(savedNews)
                .build();
    }

    public String deletedNews(int newsId){
        newsRepository.deleteByNewsId(newsId);
        return  "news has deleted";
    }
}
