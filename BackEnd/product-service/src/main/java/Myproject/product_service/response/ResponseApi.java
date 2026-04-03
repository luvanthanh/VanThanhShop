package Myproject.product_service.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class ResponseApi<T> {
    private int code =1000;
    private String message;
    private T data;

}
