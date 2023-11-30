package com.example.teamtok.controller;

import com.example.teamtok.domain.interests.Interests;
import com.example.teamtok.domain.interests.InterestsRequestDto;
import com.example.teamtok.service.InterestsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@Controller
public class InterestsController {
    public final InterestsService interestsService;

    @RequestMapping("addInterests")
    @ResponseBody
    public Interests addInterests(@RequestBody InterestsRequestDto interestsDto) {
        Interests interests = new Interests(interestsDto);
        interestsService.addInterests(interests);

        return interests;
    }

    @GetMapping("/interests/{userCode}/{dealCode}")
    @ResponseBody
    public Interests findAllByUserCodeAndDealCode(@PathVariable String userCode, @PathVariable int dealCode) {
        return interestsService.findAllByUserCodeAndDealCode(userCode, dealCode);
    }

    @ResponseBody
    @GetMapping("interests/count")
    public int countByDealCode(@RequestParam("code") int dealCode) {
        return interestsService.countByDealCode(dealCode);
    }

    @ResponseBody
    @GetMapping("cancelInterests")
    public void removeInterests(@RequestParam("code") int interestsCode) {
        interestsService.removeInterests(interestsCode);
    }
}
