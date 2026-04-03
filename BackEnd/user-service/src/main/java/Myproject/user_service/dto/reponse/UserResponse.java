package Myproject.user_service.dto.reponse;

import lombok.*;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class UserResponse {
    private String userId;
    private String userName;
    private String userFirstName;
    private String userLastName;
    private String userAddress;
    private String userEmail;
    private String userPhoneNumber;

    private Set<String> roles;
}
