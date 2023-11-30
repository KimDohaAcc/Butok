package com.example.teamtok.util;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final AuthenticationFailureHandler  authFailureHandler;

    @Override
    public void configure(WebSecurity web) throws Exception{
        web.ignoring().antMatchers("/css/**", "/script/**", "/image/**", "/font/**");
    }
    @Override
    protected void configure(HttpSecurity http) throws Exception{
                http.csrf()
                        .ignoringAntMatchers("/**");

        http
                .authorizeRequests()
                .antMatchers("/*.jsp").denyAll()
                .antMatchers("/myInterests", "/myPage", "/leave").hasAuthority("USER")
//                .antMatchers("/data").hasAuthority("ADMIN")
                .anyRequest().permitAll()
                .and()
                .formLogin()
                .loginPage("/login")
                .loginProcessingUrl("/doLogin")
                .usernameParameter("userId")
                .passwordParameter("userPassword")
                .defaultSuccessUrl("/", true) // 로그인 성공시 실행되는 메소드
                .failureHandler(authFailureHandler)    // 로그인 실패시 실행되는 클래스
                .permitAll()
                .and()
                .logout() // 로그아웃 설정
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                .logoutSuccessUrl("/") // 로그아웃 성공시 리다이렉트 주소
                .invalidateHttpSession(true) // 세션 clear
                .and()
                .exceptionHandling()
                .accessDeniedPage("/denied")
                .and()
                .rememberMe()
                .userDetailsService(userDetailsService());
    }

    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}