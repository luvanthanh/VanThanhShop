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
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class NewsUpdateRequest {

    private String newsName; // tên
    private String newsTitle; //tiêu đề
    private Date newsCreateAt; //  giờ
    private String newsCategory; // loại tin
    private String newsImageThumbnail;

    private List<Image> images;
    private List<Content> contents;
}
