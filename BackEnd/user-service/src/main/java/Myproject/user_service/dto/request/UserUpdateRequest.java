package Myproject.user_service.dto.request;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class UserUpdateRequest {
    private String userName;
    private String userPassword;
    private String userFirstName;
    private String userLastName;
    private String userAddress;
    private String userEmail;
    private String userPhoneNumber;
}
