package Myproject.news_service.controller;


import Myproject.news_service.dto.reponse.ApiResponse;
import Myproject.news_service.dto.request.NewsCreationRequest;
import Myproject.news_service.dto.request.NewsUpdateRequest;
import Myproject.news_service.entity.News;
import Myproject.news_service.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/news")

public class NewsController {

    @Autowired
    private NewsService newsService;


    @GetMapping
    public ApiResponse<List<News>> getAllNews(){
        var result =  newsService.getAllNews();
        return ApiResponse.<List<News>>builder()
                .code(200)
                .message(" get all news success")
                .data(result)
                .build();
    }

    @GetMapping("/{newsId}")
    public ApiResponse<News> getNewsById(@PathVariable int newsId){
        var result = newsService.getNewsById(newsId);
        return ApiResponse.<News>builder()
                .code(200)
                .message(" get news success")
                .data(result)
                .build();
    }

    @PostMapping
    public ApiResponse<News> addNews(@RequestBody NewsCreationRequest request){
        var result = newsService.addNews(request);
        return ApiResponse.<News>builder()
                .code(200)
                .message("add new news success")
                .data(result)
                .build();
    }


    @PostMapping("/{newsId}")
    public ApiResponse<News> updateNews(@RequestBody NewsUpdateRequest request, @PathVariable int newsId){
        var result =  newsService.updateNews(request, newsId);
        return ApiResponse.<News>builder()
                .code(200)
                .message("update new news success")
                .data(result)
                .build();
    }

    @DeleteMapping("/{newsId}")
    public String deleteNews(@PathVariable int newsId){
        return newsService.deletedNews(newsId);
    }

}
