package Myproject.Api_getWay.configuration;

import java.util.Arrays;
import java.util.List;

import org.springframework.boot.autoconfigure.http.HttpMessageConverters;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.http.HttpMethod;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.oauth2.server.resource.authentication.ReactiveJwtAuthenticationConverterAdapter;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import com.fasterxml.jackson.databind.ObjectMapper;

import Myproject.Api_getWay.filter.AuthenticationFilter;
import reactor.core.publisher.Mono;


@Configuration
@EnableWebFluxSecurity
@EnableReactiveMethodSecurity
public class SecurityConfig {

    private final String[] PUBLIC_POST_ENDPOINTS = {
            "/api/users",
            "/api/users/auth/login",
            "/api/users/auth/introspect",
            "/api/users/auth/logout",
            "/api/carts/user/{userId}",
            "/api/carts/{cartId}/items"
    };

    private final String[] PUBLIC_GET_ENDPOINTS = {
        "/api/products",

        "/api/products",                                  // GET  - getAllProducts
        "/api/products/id/{productId}",                   // GET  - getProductById
        "/api/products/name/{name}",                      // GET  - getProductByName
        "/api/products/update/{productId}",               // PUT  - updateProduct
        "/api/products/brand/{productBrand}",             // GET  - getProductByBrand
        "/api/products/price",                            // GET  - getProductByPrice
        "/api/products/ram/{productRam}",                 // GET  - getProductByRam
        "/api/products/rom/{productRom}",                 // GET  - getProductByRom
        "/api/products/color/{productColor}",             // GET  - getProductByColor
        "/api/products/screen",                           // GET  - getProductByScreenSize
        "/api/products/sort/price/create",                // GET  - getAndSortByPrice (tăng dần)
        "/api/products/sort/price/decrease",              // GET  - getAndSortBYPrice (giảm dần)

        "/api/news",
        "/api/news/id/{newsId}",

        "/api/orders",
        "/api/orders/getOrderByUserId/{userId}",
        "/api/orders/{orderId}/details",

        "/api/carts/user/{userId}",
        "/api/carts/{cartId}/items"
};


    private final String[] SECURITY_POST_ENDPOINTS={
            "/api/products/post",
            "/api/news/post",

    };

    private final String[] SECURITY_DELETE_ENDPOINTS={
            "/api/products/delete/{productId}",
            "/api/news/delete/{newsId}",

    };

    private final String[] SECURITY_PUT_ENDPOINTS={
            "/api/products/update/{productId}",
            "/api/news/update/{newsId}",

    };



    private final AuthenticationFilter authenticationFilter;

    public SecurityConfig(AuthenticationFilter authenticationFilter) {
        this.authenticationFilter = authenticationFilter;
    }

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {

        http
                .csrf(ServerHttpSecurity.CsrfSpec::disable) // tắt CSRF vì API dùng JWT, không dùng session/cookie form login
                .cors(ServerHttpSecurity.CorsSpec::disable)// CORS sẽ được cấu hình riêng ở dưới

                .authorizeExchange(exchange -> exchange
                        .pathMatchers(HttpMethod.OPTIONS).permitAll()
                        .pathMatchers(HttpMethod.POST, PUBLIC_POST_ENDPOINTS).permitAll() // các post của public endpoints được phép truy cập mà không cần xác thực
                        .pathMatchers(HttpMethod.GET, PUBLIC_GET_ENDPOINTS).permitAll() // các get của public endpoints được phép truy cập mà không cần xác thực
                        .pathMatchers(HttpMethod.POST,SECURITY_POST_ENDPOINTS).hasRole("ADMIN")
                        .pathMatchers(HttpMethod.PUT, SECURITY_PUT_ENDPOINTS).hasRole("ADMIN")
                        .pathMatchers(HttpMethod.DELETE, SECURITY_DELETE_ENDPOINTS).hasRole("ADMIN")
                )
                .cors(cors ->{} )
                .exceptionHandling(exceptionHandling -> exceptionHandling
                        .authenticationEntryPoint(new JwtAuthenticationEntryPoint())
                        .accessDeniedHandler(new JwtAccessDeniedHandler()))

                .oauth2ResourceServer(oauth2 -> oauth2 // cấu hình xác thực OAuth2 Resource Server với các api yêu cầu xác thực bằng JWT
                        .jwt(jwt -> jwt
                            .jwtDecoder(authenticationFilter)  // chuyển hướng sang AuthenticationFilter để xác thực JWT
                            .jwtAuthenticationConverter(jwtAuthenticationConverter()) // chuyển đổi scope thành roles để Spring Security có thể sử dụng
                        )
                        .authenticationEntryPoint(new JwtAuthenticationEntryPoint())
                        // nếu sai thì chuyển sang JwtAuthenticationEntryPoint để trả về lỗi 401
                );

        return http.build();
    }


    @Bean
    public Converter<Jwt, Mono<AbstractAuthenticationToken>> jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter grantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
        grantedAuthoritiesConverter.setAuthoritiesClaimName("scope");
        grantedAuthoritiesConverter.setAuthorityPrefix("ROLE_");

        JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
        converter.setJwtGrantedAuthoritiesConverter(grantedAuthoritiesConverter);

        return new ReactiveJwtAuthenticationConverterAdapter(converter);
    }

    @Bean
    public HttpMessageConverters httpMessageConverters(ObjectMapper objectMapper) {
        return new HttpMessageConverters(new MappingJackson2HttpMessageConverter(objectMapper));
    }

    @Bean
    public CorsWebFilter corsWebFilter() {
        CorsConfiguration config = new CorsConfiguration();
        // allow frontend dev origins; adjust for production
        List<String> allowedOrigins = Arrays.asList("http://127.0.0.1:5501", "http://localhost:5501", "http://localhost:5500", "http://127.0.0.1:5500");
        config.setAllowedOrigins(allowedOrigins);
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return new CorsWebFilter(source);
    }

    /*
    // đã tắt cors ở trên
    private final String FRONTEND_URL = "http://127.0.0.1:5501";
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {  // cấu hình CORS để cho phép truy cập từ front end
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of(FRONTEND_URL));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
   */
    // hàm này chỉ dùng đổi đổi scope thành roles
}
