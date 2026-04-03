package Myproject.user_service.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name ="users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String userId;
    private String userName;
    private String userPassword;
    private String userFirstName;
    private String userLastName;
    private String userAddress;
    private String userEmail;
    private String userPhoneNumber;

    private Set<String> roles;
}
