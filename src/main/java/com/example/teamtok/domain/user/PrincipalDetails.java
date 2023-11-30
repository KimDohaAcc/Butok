package com.example.teamtok.domain.user;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

@Data
@EqualsAndHashCode(callSuper=false)
public class PrincipalDetails extends User implements UserDetails {
    private String userId;
    private String userPassword;
    private Collection<? extends GrantedAuthority> authorities;
    private User user;

    public PrincipalDetails(String userId, String userPassword, User user){
        this.userId = userId;
        this.userPassword = userPassword;
        this.authorities = getAuthorities();
        this.user = user;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        ArrayList<GrantedAuthority> auth = new ArrayList<GrantedAuthority>();
        auth.add(new SimpleGrantedAuthority("USER"));
        return auth;
    }

    @Override
    public String getPassword() {
        return userPassword;
    }

    @Override
    public String getUsername() {
        return userId;
    }

    //계정이 만료되지 않았는가?
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    //계정이 잠금상태가 아닌가?
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    //비밀번호가 만료되지 않았는가?
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    //계정이 활성화 되었는가?
    @Override
    public boolean isEnabled() {
        return true;
    }
}
