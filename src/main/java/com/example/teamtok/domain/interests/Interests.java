package com.example.teamtok.domain.interests;


import com.example.teamtok.util.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "interests")
@Entity
public class Interests extends Timestamp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int interestsCode;
    @Column(name = "user_code")
    private String userCode;
    @Column(name = "user_name")
    private String userName;
    @Column(name = "deal_code")
    private int dealCode;

    public Interests(InterestsRequestDto interestsDto) {
        this.interestsCode = interestsDto.getInterestsCode();
        this.userCode = interestsDto.getUserCode();
        this.userName = interestsDto.getUserName();
        this.dealCode = interestsDto.getDealCode();
    }
}
