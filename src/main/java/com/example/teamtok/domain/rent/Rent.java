package com.example.teamtok.domain.rent;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="rent")
@Entity
public class Rent {
    @Id
    @Column(name="rent_code")
    private int rentCode;
    @Column(name="rent_name")
    private String rentName;
    @Column(name="rent_contract_date")
    private String rentContractDate;
    @Column(name="rent_deposit")
    private int rentDeposit;
    @Column(name="rent_monthly_rent")
    private int rentMonthlyFee;
    @Column(name="rent_area")
    private double rentArea;
    @Column(name="rent_pyeong")
    private double rentPyeong;
    @Column(name="rent_floor")
    private int rentFloor;

    public Rent(RentRequestDto rentRequestDto){
        this.rentCode = rentRequestDto.getRentCode();
        this.rentName = rentRequestDto.getRentName();
        this.rentContractDate = rentRequestDto.getRentContractDate();
        this.rentDeposit = rentRequestDto.getRentDeposit();
        this.rentMonthlyFee = rentRequestDto.getRentMonthlyFee();
        this.rentArea = rentRequestDto.getRentArea();
        this.rentPyeong = rentRequestDto.getRentPyeong();
        this.rentFloor = rentRequestDto.getRentFloor();
    }

}
