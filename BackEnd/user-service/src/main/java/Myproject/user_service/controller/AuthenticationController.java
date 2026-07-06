package Myproject.user_service.controller;


import Myproject.user_service.dto.reponse.ApiResponse;
import Myproject.user_service.dto.reponse.AuthenticationResponse;
import Myproject.user_service.dto.reponse.IntrospectResponse;
import Myproject.user_service.dto.request.LoginRequest;
import Myproject.user_service.dto.request.IntrospectRequest;
import Myproject.user_service.dto.request.LogoutRequest;
import Myproject.user_service.entity.InvalidatedToken;
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

    @PostMapping("/login")
    ApiResponse<AuthenticationResponse> login(@RequestBody LoginRequest loginRequest){
        var result = authenticationService.login(loginRequest);
        return ApiResponse.<AuthenticationResponse>builder()
                .code(1000)
                .message("Login Successful")
                .data(result)
                .build();
    }

    @PostMapping("/logout")
    ApiResponse<InvalidatedToken> logout(@RequestBody LogoutRequest logoutRequest)
            throws JOSEException, ParseException{
        var result =  authenticationService.logout(logoutRequest);
        return ApiResponse.<InvalidatedToken>builder()
                .code(1000)
                .message(" log out Success")
                .data(result)
                .build();
    }


    @PostMapping("/introspect")
    ApiResponse<IntrospectResponse> introspect(@RequestBody IntrospectRequest request)
               throws JOSEException, ParseException
    {
        var result = authenticationService.introspect(request);

        return ApiResponse.<IntrospectResponse>builder()
                .code(1000)
                .message("IntrospectResponse ")
                .data(result)
                .build();
    }
}
