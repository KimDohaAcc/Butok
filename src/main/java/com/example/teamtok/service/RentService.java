package com.example.teamtok.service;

import com.example.teamtok.domain.rent.Rent;
import com.example.teamtok.domain.rent.RentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class RentService {
    private final RentRepository rentRepository;

    public List<Rent> getRentAll(String rentName){
        return rentRepository.findAllByRentNameOrderByRentContractDateDesc(rentName);
    }

    public Page<Rent> findByDealCode(String rentName, Pageable pageable){
        Page<Rent> list = rentRepository.findAllByRentNameOrderByRentContractDateDesc(rentName, pageable);
        return list;
    }
}
