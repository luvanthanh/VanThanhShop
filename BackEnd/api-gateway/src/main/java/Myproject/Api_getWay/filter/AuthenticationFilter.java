package Myproject.Api_getWay.filter;

import Myproject.Api_getWay.client.response.AuthenticationClient;
import Myproject.Api_getWay.dto.request.IntrospectRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.oauth2.jwt.NimbusReactiveJwtDecoder;
import org.springframework.security.oauth2.jwt.ReactiveJwtDecoder;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;
import javax.crypto.spec.SecretKeySpec;

@Component
public class AuthenticationFilter implements ReactiveJwtDecoder {

    private final AuthenticationClient authenticationClient;
    private final ReactiveJwtDecoder jwtDecoder;

    public AuthenticationFilter(AuthenticationClient authenticationClient, @Value("${jwt.signerKey}") String signerKey) { // Gọi user-service để kiểm tra token còn hợp lệ hay không
        this.authenticationClient = authenticationClient;  // Dùng chung secret key HS512 để parse JWT giống user-service
        this.jwtDecoder = NimbusReactiveJwtDecoder.withSecretKey(new SecretKeySpec(signerKey.getBytes(), "HS512"))
                .macAlgorithm(MacAlgorithm.HS512)
                .build();
    }

    @Override
    public Mono<Jwt> decode(String token) {
        return Mono.fromCallable(() -> {
            // Gửi token tới user-service để kiểm tra tính hợp lệ
            var response = authenticationClient.introspect(new IntrospectRequest(token));

            // Nếu user-service báo token không hợp lệ thì reject request
            if (response == null || response.getData() == null || !response.getData().isCheckToken()) {
                throw new JwtException("Invalid token");
            }

            // Nếu hợp lệ thì parse JWT và lấy claims để Spring Security dùng phân quyền
            return jwtDecoder.decode(token).block();
        }).subscribeOn(Schedulers.boundedElastic());
    }
}
