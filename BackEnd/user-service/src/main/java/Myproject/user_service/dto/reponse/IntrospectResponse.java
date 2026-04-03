package Myproject.user_service.dto.reponse;


import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class IntrospectResponse {
    private boolean checkToken;
}
