package Myproject.news_service.dto.request;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class NewsUpdateRequest {
    private int newsProductId; //
    private String newsName; // tên
    private String newsTitle; //tiêu đề
    private String newsDate; // thời gian  ngày
    private String newsTime; //  giờ
    private String newsCategory; // loại tin
    private String newsImage;
    private String newsImage1;
    private String newsImage2;
    private String newsImage3;
    private String newsContent;
    private String newsContent1;
    private String newsContent2;
    private String newsContent3;
}
