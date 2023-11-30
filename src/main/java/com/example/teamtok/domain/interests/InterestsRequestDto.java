package com.example.teamtok.domain.interests;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class InterestsRequestDto {

    private int interestsCode;
    private String userCode;
    private String userName;
    private int dealCode;
}
