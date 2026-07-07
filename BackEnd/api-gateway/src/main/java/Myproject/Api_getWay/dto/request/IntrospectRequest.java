package Myproject.Api_getWay.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@AllArgsConstructor
@Data
@NoArgsConstructor
@Slf4j
public class IntrospectRequest {
    @NotBlank
    private String token;
}
