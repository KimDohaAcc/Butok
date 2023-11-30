package com.example.teamtok.domain.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserRequestDto {
    private String userCode;
    private String userId;
    private String userPassword;
    private String userName;
    private String userProfileImage = "https://teamtok.s3.ap-northeast-2.amazonaws.com/image/toktok.png";
    private String userPreference;

    public UserRequestDto(String userCode, String userId, String userPassword, String userName, String userPreference){
        this.userCode = userCode;
        this.userId = userId;
        this.userPassword = userPassword;
        this.userName = userName;
        this.userPreference = userPreference;
    }
}
