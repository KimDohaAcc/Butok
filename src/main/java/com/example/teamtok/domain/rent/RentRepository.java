package com.example.teamtok.domain.rent;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RentRepository extends JpaRepository<Rent, Integer> {
    public List<Rent> findAllByRentNameOrderByRentContractDateDesc(String rentName);

    public Page<Rent> findAllByRentNameOrderByRentContractDateDesc(String rentName, Pageable pageable);
}
