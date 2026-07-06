package Myproject.news_service.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import Myproject.news_service.entity.News;

public interface NewsRepository extends JpaRepository<News, Integer> {
    void deleteByNewsId(int newsId);
    Optional<News> getNewsByNewsId(int newsId);

}
