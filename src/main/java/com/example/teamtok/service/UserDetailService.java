package com.example.teamtok.service;

import com.example.teamtok.domain.user.AdminDetails;
import com.example.teamtok.domain.user.PrincipalDetails;
import com.example.teamtok.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserDetailService implements UserDetailsService {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        String encPassword = "";
        if(userId.equals("admin")){
            encPassword = passwordEncoder.encode("admin");
            AdminDetails adminDetails = new AdminDetails(userId, encPassword);
            return adminDetails;
        }

        encPassword = userService.getUserPassword(userId);
        User user = userService.getUserById(userId);
        PrincipalDetails principalDetails = new PrincipalDetails(userId, encPassword, user);

        if (encPassword != null) {
            return principalDetails;
        }


        throw new UsernameNotFoundException("사용자 정보가 존재하지 않습니다.");
    }
}
