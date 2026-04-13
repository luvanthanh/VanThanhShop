package Myproject.user_service.dto.request;


import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class UserCreationRequest {
    @NotNull
    @Size(min = 1, max = 100)
    private String userName;

    @NotBlank
    private String userPassword;
    @NotBlank
    private String userFirstName;
    @NotBlank
    private String userLastName;
    @NotBlank
    private String userAddress;
    @NotBlank
    private String userEmail;
    @NotBlank
    private String userPhoneNumber;
}
