package Myproject.news_service.exception;

public class NewsNotFoundException extends RuntimeException {
    public NewsNotFoundException(int newsId) {
        super("News not found: " + newsId);
    }
}