package com.example.teamtok.domain.interests;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InterestsRepository extends JpaRepository<Interests, Integer> {

    public Interests findAllByUserCodeAndDealCode(String userCode, int dealCode);

    public List<Interests> findAllByUserCode(String userCode);

    public int countByDealCode(int dealCode);
}
