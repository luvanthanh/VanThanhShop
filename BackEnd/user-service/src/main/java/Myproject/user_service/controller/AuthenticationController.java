package Myproject.user_service.controller;


import Myproject.user_service.dto.reponse.ApiResponse;
import Myproject.user_service.dto.reponse.AuthenticationResponse;
import Myproject.user_service.dto.reponse.IntrospectResponse;
import Myproject.user_service.dto.request.LoginRequest;
import Myproject.user_service.dto.request.IntrospectRequest;
import Myproject.user_service.dto.request.LogoutRequest;
import Myproject.user_service.service.AuthenticationService;
import com.nimbusds.jose.JOSEException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequestMapping("/users/auth")
public class AuthenticationController {
    @Autowired
    AuthenticationService authenticationService;

//    đã test ok rồi đó=))
    @PostMapping("/login")
    ApiResponse<AuthenticationResponse> login(@RequestBody LoginRequest loginRequest){
        var result = authenticationService.login(loginRequest);

        return ApiResponse.<AuthenticationResponse>builder()
                .data(result)
                .build();
    }

    @PostMapping("/logout")
    ApiResponse<Void> logout(@RequestBody LogoutRequest logoutRequest)
            throws JOSEException, ParseException{
        authenticationService.logout(logoutRequest);

        return ApiResponse.<Void>builder()
                .message("Successfully logged out")
                .build();
    }

//    Cũng đã test ok rồi đó
    @PostMapping("/introspect")
    ApiResponse<IntrospectResponse> introspect(@RequestBody IntrospectRequest request)
               throws JOSEException, ParseException
    {
        var result = authenticationService.introspect(request);
        return ApiResponse.<IntrospectResponse>builder()
                .data(result)
                .build();
    }


}
