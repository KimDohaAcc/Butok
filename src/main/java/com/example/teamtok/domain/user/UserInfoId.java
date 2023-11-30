package com.example.teamtok.domain.user;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Id;
import java.io.Serializable;

@Getter
@NoArgsConstructor
@EqualsAndHashCode
public class UserInfoId implements Serializable {
    @Id
    private String userCode;

    @Id
    private String userName;
}
