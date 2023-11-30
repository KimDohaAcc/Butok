package com.example.teamtok.domain.user;

import com.example.teamtok.util.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@IdClass(UserInfoId.class)
@Table(name = "user")
@Entity
public class User  extends Timestamp {

    @Id
    @Column(name = "user_code")
    private String userCode;
    @Id
    @Column(name = "user_name")
    private String userName;
    @Column(name = "user_id")
    private String userId;
    @Column(name = "user_password")
    private String userPassword;
    @Column(name = "user_profile_image")
    private String userProfileImage;
    @Column(name = "user_preference")
    private String userPreference;

    public User(UserRequestDto userDto) {
        this.userCode = userDto.getUserCode();
        this.userId = userDto.getUserId();
        this.userPassword = userDto.getUserPassword();
        this.userName = userDto.getUserName();
        this.userProfileImage = userDto.getUserProfileImage();
        this.userPreference = userDto.getUserPreference();
    }
}
