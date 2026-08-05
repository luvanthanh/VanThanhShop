package Myproject.news_service.controller;

import Myproject.news_service.dto.reponse.ApiResponse;
import Myproject.news_service.dto.reponse.NewsResponse;
import Myproject.news_service.dto.request.NewsCreationRequest;
import Myproject.news_service.dto.request.NewsUpdateRequest;
import Myproject.news_service.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/news")

public class NewsController {

    @Autowired
    private  NewsService newsService;


    @GetMapping
    public ApiResponse<List<NewsResponse>> getAllNews(){
        var result =  newsService.getAllNews();
        return ApiResponse.<List<NewsResponse>>builder()
                .code(1000)
                .message(" get all news success")
                .data(result)
                .build();
    }

    @GetMapping("/id/{newsId}")
    public ApiResponse<NewsResponse> getNewsById(@PathVariable int newsId){
        var result = newsService.getNewsById(newsId);
        return ApiResponse.<NewsResponse>builder()
                .code(200)
                .message(" get news success")
                .data(result)
                .build();
    }

    @PostMapping("/post")

    public ApiResponse<NewsResponse> addNews(@RequestBody NewsCreationRequest request){
        var result = newsService.addNews(request);
        return ApiResponse.<NewsResponse>builder()
                .code(200)
                .message("add new news success")
                .data(result)
                .build();
    }


    @PutMapping("/update/{newsId}")
    public ApiResponse<NewsResponse> updateNews(@RequestBody NewsUpdateRequest request, @PathVariable int newsId){
        var result =  newsService.updateNews(request, newsId);
        return ApiResponse.<NewsResponse>builder()
                .code(200)
                .message("update new news success")
                .data(result)
                .build();
    }

    @DeleteMapping("/delete/{newsId}")
    public ApiResponse<String> deleteNews(@PathVariable int newsId){
        var result= newsService.deletedNews(newsId);
        return ApiResponse.<String>builder()
                .code(200)
                .message("delete new news success")
                .data(result)
                .build();
    }
}
