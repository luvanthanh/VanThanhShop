package Myproject.Api_getWay.filter;


import Myproject.Api_getWay.client.response.AuthenticationClient;
import Myproject.Api_getWay.dto.request.IntrospectRequest;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.oauth2.jwt.ReactiveJwtDecoder;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;


@Component
public class AuthenticationFilter implements ReactiveJwtDecoder {

    private final AuthenticationClient authenticationClient;

    public AuthenticationFilter(AuthenticationClient authenticationClient) {
        this.authenticationClient = authenticationClient;
    }

    @Override
    public Mono<Jwt> decode(String token) {
        return Mono.fromCallable(() -> {
            var response = authenticationClient.introspect(
                    new IntrospectRequest(token)
            );
                    if(response == null || response.getData()== null || !response.getData().isCheckToken()){
                        throw new JwtException("Invalid token");
                    }
            return Jwt.withTokenValue(token)
                    .header("alg", "HS512")
                    .claim("scope", "USER")
                    .build();
            
        });
    }
}
