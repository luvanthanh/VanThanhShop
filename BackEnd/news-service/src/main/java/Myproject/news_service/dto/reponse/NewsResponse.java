package Myproject.news_service.dto.reponse;

import Myproject.news_service.entity.Content;
import Myproject.news_service.entity.Image;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NewsResponse {
    private int newsId;

    private int newsProductId; // để link tới sản phẩm khác
    private String newsName; // tên tin tức
    private String newsTitle; //tiêu đề tin tức
    private Date newsCreateAt ;//  giờ
    private String newsCategory; // loại tin
    private String newsImageThumbnail;


    private List<ImageResponse> imageResponses;
    private List<ContentResponse> contentResponses;
}
