package com.example.teamtok.util;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.*;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLEncoder;

@Configuration
public class AuthFailureHandler extends SimpleUrlAuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        String errMsg = "";

        if(exception instanceof AuthenticationServiceException) {
           errMsg = "시스템 장애로 로그인할 수 없습니다";
        }
        else if(exception instanceof BadCredentialsException) {
            errMsg = "아이디 또는 비밀번호를 확인해주세요";
        }
        else {
            errMsg = "계정을 찾을 수 없습니다";
        }

        String encodeResult = URLEncoder.encode(errMsg, "UTF-8");
        setDefaultFailureUrl("/doLogin?error=true&exception="+encodeResult);
        super.onAuthenticationFailure(request,response,exception);
    }
}