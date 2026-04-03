package Myproject.user_service.configuration;


import Myproject.user_service.entity.User;
import Myproject.user_service.entity.enums.Role;
import Myproject.user_service.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


import java.util.HashSet;

@Configuration
@Slf4j
public class ApplicationInitConfig {

    @Bean
    ApplicationRunner initApplicationRunner(UserRepository userRepository) {
        return args -> {
            if(userRepository.findByUserName("admin").isEmpty()) {
                var roles = new HashSet<String>();
                roles.add(Role.ADMIN.name());

                PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);

                User user = User.builder()
                        .userName("admin")
                        .userPassword(passwordEncoder.encode("admin"))
                        .roles(roles)
                        .build();
                userRepository.save(user);
                log.warn("admin has been created with default password: admin please change it");
            }
        };

    }
}
