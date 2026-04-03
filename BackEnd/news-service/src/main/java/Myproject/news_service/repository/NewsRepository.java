package Myproject.news_service.repository;

import Myproject.news_service.entity.News;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface NewsRepository extends JpaRepository<News, String> {
    void deleteByNewsId(int newsId);
    Optional<News> getNewsByNewsId(int newsId);
}
