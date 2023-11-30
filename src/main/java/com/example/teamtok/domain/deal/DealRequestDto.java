package com.example.teamtok.domain.deal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;

@Setter
@Getter
@AllArgsConstructor
public class DealRequestDto {
    private int dealCode;
    private String dealGu;
    private String dealGuCode;
    private String dealDong;
    private String dealDongCode;
    private int dealBonbun;
    private int dealBubun;
    private String dealApartmentName;
    private int dealFloor;
    private String dealApartmentType;
    private String dealRentType;
    private int dealBuildYear;
    private String dealContractDate;
    private double dealRentArea;
    private double dealPyeong;
    private int dealDeposit;
    private int dealMonthlyRent;
    private double dealAverage2023;
    private double dealAverage2022;
    private double dealAverage2021;
    private double dealAverage2020;
}
