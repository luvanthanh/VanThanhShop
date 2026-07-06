package Myproject.Api_getWay.client.response;


import Myproject.Api_getWay.dto.request.IntrospectRequest;
import Myproject.Api_getWay.dto.response.ApiResponse;
import Myproject.Api_getWay.dto.response.IntrospectResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "user-service")
public interface AuthenticationClient {

    @PostMapping("/users/auth/introspect")
    ApiResponse<IntrospectResponse>  introspect(@RequestBody IntrospectRequest introspectRequest);
}
