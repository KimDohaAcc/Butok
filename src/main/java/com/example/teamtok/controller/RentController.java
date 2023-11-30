package com.example.teamtok.controller;

import com.example.teamtok.domain.rent.Rent;
import com.example.teamtok.domain.rent.RentRepository;
import com.example.teamtok.domain.rent.RentRequestDto;
import com.example.teamtok.service.RentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@Controller
public class RentController {
    private final RentService rentService;
    private final RentRepository rentRepository;
    @PostMapping("insertRentData")
    public void insertData(@RequestBody RentRequestDto rentRequestDto){
        Rent rent = new Rent(rentRequestDto);
        rentRepository.save(rent);
    }

    @ResponseBody
    @GetMapping("rent")
    public List<Rent> getRentByName(@RequestParam ("rentName") String rentName){
        return rentService.getRentAll(rentName);
    }


    @ResponseBody
    @GetMapping("getMonthlyFeeList")
    public Page<Rent> getMonthlyFeeList(@RequestParam("rentName") String rentName, @PageableDefault(size=5) Pageable pageable){
       return rentService.findByDealCode(rentName, pageable);
    }
}
