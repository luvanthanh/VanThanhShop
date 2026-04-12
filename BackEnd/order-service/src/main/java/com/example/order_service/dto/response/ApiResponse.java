package com.example.order_service.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Slf4j
public class ApiResponse<T> {
    private int code;
    private String message;
    private T  data;
}
