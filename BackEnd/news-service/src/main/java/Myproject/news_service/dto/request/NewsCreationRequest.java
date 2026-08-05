package Myproject.news_service.dto.request;


import Myproject.news_service.entity.Content;
import Myproject.news_service.entity.Image;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NewsCreationRequest {
    private int newsProductId;
    private String newsName; // tên
    private String newsTitle; //tiêu đề
    private Date newsCreateAt;
    private String newsCategory; // loại tin
    private String newsImageThumbnail;

    private List<Image> images;
    private List<Content> contents;

}
