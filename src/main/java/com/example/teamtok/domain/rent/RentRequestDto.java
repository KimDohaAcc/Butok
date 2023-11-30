package com.example.teamtok.domain.rent;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class RentRequestDto {
    private int rentCode;
    private String rentName;
    private String rentContractDate;
    private int rentDeposit;
    private int rentMonthlyFee;
    private double rentArea;
    private double rentPyeong;
    private int rentFloor;
}
