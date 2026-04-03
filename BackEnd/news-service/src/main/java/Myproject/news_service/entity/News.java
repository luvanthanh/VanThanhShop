package Myproject.news_service.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class News {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int newsId;

    private int newsProductId; // để link tới sản phẩm khác
    private String newsName; // tên tin tức
    private String newsTitle; //tiêu đề tin tức
    private String newsDate; // thời gian  ngày
    private String newsTime; //  giờ
    private String newsCategory; // loại tin
    private String newsImage; // ảnh chính
    private String newsImage1; // ảnh phụ 1
    private String newsImage2; // ảnh phụ 2
    private String newsImage3; // ảnh phụ 3
    private String newsContent; // nd chính
    private String newsContent1; // nd phụ 1
    private String newsContent2;// nd phụ 2
    private String newsContent3; // nd phụ 3
}
