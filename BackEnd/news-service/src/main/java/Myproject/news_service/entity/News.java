package Myproject.news_service.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "news")
public class News {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int newsId;

    private int newsProductId; // để link tới sản phẩm khác
    private String newsName; // tên tin tức
    private String newsTitle; //tiêu đề tin tức
    private Date newsCreateAt ;//  giờ
    private String newsCategory; // loại tin
    private String newsImageThumbnail;


    @OneToMany(mappedBy = "news", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Image> images;
    @OneToMany(mappedBy = "news", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Content> contents;
}
