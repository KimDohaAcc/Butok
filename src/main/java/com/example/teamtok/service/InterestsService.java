package com.example.teamtok.service;

import com.example.teamtok.domain.interests.Interests;
import com.example.teamtok.domain.interests.InterestsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class InterestsService {
    public final InterestsRepository interestsRepository;

    public void addInterests(Interests interests) {
        System.out.println("2");
        interestsRepository.save(interests); }

    public Interests findAllByUserCodeAndDealCode(String userCode, int dealCode) {
        return interestsRepository.findAllByUserCodeAndDealCode(userCode, dealCode);
    }

    public int countByDealCode(int dealCode) {
        return interestsRepository.countByDealCode(dealCode);
    }

    public void removeInterests(int interestsCode) { interestsRepository.deleteById(interestsCode); }
}
