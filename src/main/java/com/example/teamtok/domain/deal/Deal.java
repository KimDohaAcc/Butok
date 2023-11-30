package com.example.teamtok.domain.deal;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="deal")
@Entity
public class Deal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int dealCode;
    @Column(name="deal_gu")
    private String dealGu;
    @Column(name="deal_gu_code")
    private String dealGuCode;
    @Column(name="deal_dong")
    private String dealDong;
    @Column(name="deal_dong_code")
    private String dealDongCode;
    @Column(name="deal_bonbun")
    private int dealBonbun;
    @Column(name="deal_bubun")
    private int dealBubun;
    @Column(name="deal_apartment_name")
    private String dealApartmentName;
    @Column(name="deal_floor")
    private int dealFloor;
    @Column(name="deal_apartment_type")
    private String dealApartmentType;
    @Column(name="deal_rent_type")
    private String dealRentType;
    @Column(name="deal_build_year")
    private int dealBuildYear;
    @Column(name="deal_contract_date")
    private String dealContractDate;
    @Column(name="deal_rent_area")
    private double dealRentArea;
    @Column(name="deal_pyeong")
    private double dealPyeong;
    @Column(name="deal_deposit")
    private int dealDeposit;
    @Column(name="deal_monthly_rent")
    private int dealMonthlyRent;
    @Column(name="deal_average_2023")
    private double dealAverage2023;
    @Column(name="deal_average_2022")
    private double dealAverage2022;
    @Column(name="deal_average_2021")
    private double dealAverage2021;
    @Column(name="deal_average_2020")
    private double dealAverage2020;

    public Deal(DealRequestDto dealRequestDto){
        this.dealCode = dealRequestDto.getDealCode();
        this.dealGu = dealRequestDto.getDealGu();
        this.dealGuCode = dealRequestDto.getDealGuCode();
        this.dealDong = dealRequestDto.getDealDong();
        this.dealDongCode = dealRequestDto.getDealDongCode();
        this.dealBonbun = dealRequestDto.getDealBonbun();
        this.dealBubun = dealRequestDto.getDealBubun();
        this.dealApartmentName = dealRequestDto.getDealApartmentName();
        this.dealFloor = dealRequestDto.getDealFloor();
        this.dealApartmentType = dealRequestDto.getDealApartmentType();
        this.dealRentType = dealRequestDto.getDealRentType();
        this.dealBuildYear = dealRequestDto.getDealBuildYear();
        this.dealContractDate = dealRequestDto.getDealContractDate();
        this.dealRentArea = dealRequestDto.getDealRentArea();
        this.dealPyeong = dealRequestDto.getDealPyeong();
        this.dealDeposit = dealRequestDto.getDealDeposit();
        this.dealMonthlyRent = dealRequestDto.getDealMonthlyRent();
        this.dealAverage2023 = dealRequestDto.getDealAverage2023();
        this.dealAverage2022 = dealRequestDto.getDealAverage2022();
        this.dealAverage2021 = dealRequestDto.getDealAverage2021();
        this.dealAverage2020 = dealRequestDto.getDealAverage2020();
    }
}
