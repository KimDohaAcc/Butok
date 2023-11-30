package com.example.teamtok.controller;

import com.example.teamtok.domain.Preference.Preference;
import com.example.teamtok.domain.deal.Deal;
import com.example.teamtok.domain.deal.DealRepository;
import com.example.teamtok.domain.deal.DealRequestDto;
import com.example.teamtok.service.DealService;
import com.example.teamtok.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Controller
public class DealController {
    private final DealService dealService;
    private final DealRepository dealRepository;
    private final UserService userService;

    // CR
    @PostMapping  ("insertData")
    public void insertData(@RequestBody DealRequestDto dealRequestDto){
        Deal deal = new Deal(dealRequestDto);
        dealRepository.save(deal);
    }

    @ResponseBody
    @GetMapping("loadData")
    public List<Deal> getDealByName(@RequestParam("dealApartmentName") String dealApartmentName){
        return dealService.getDealAllByName(dealApartmentName);
    }

    @GetMapping("v1/search/object")
    public List<Deal> getDealAll(){
        List<Deal> list = dealService.getDealAll();
        return list;
    }

    @GetMapping("/")
    public String getRentTypeAll(Model model){
        List<Deal> rentList = dealService.getRentTypeList();
        List<Deal> aptList = dealService.getAptTypeList();
        List<Deal> dealList = dealService.getInterestDeal();
        model.addAttribute("rentList", rentList);
        model.addAttribute("aptList", aptList);
        model.addAttribute("dealList",dealList);
        return "index";
    }

    @ResponseBody
    @GetMapping("detailView")
    public Deal getDealByCode(@RequestParam("code") int code){
        Deal deal = dealService.getDealById(code);
        return deal;
    }

    @GetMapping("detailSearch")
    public String getDetailResult(Model model){
        List<Deal> rentList = dealService.getRentTypeList();
        List<Deal> aptList = dealService.getAptTypeList();
        model.addAttribute("rentList", rentList);
        model.addAttribute("aptList", aptList);
        return "detailSearch";
    }

    @GetMapping("searchResult")
    public String getResultList(@RequestParam("keyword") String keyword, Model model) {
        List list = dealService.getResultList(keyword);
        int size = list.size();

        model.addAttribute("list", list);
        model.addAttribute("size", size);

        return "searchResult";
    }

    @RequestMapping(value = "jsonResult")
    @ResponseBody
    public List<Map<String,Deal>> getResultResponse(@RequestParam("keyword") String keyword, @RequestParam("userCheck") String userCheck, HttpServletRequest request) {
        List<Map<String, Deal>> result = null;
        if(userCheck.equals("Y")) {
            Preference preference = userService.getUserPreference();
            result = dealService.getJsonResult(keyword, preference);
        }

        else {
            result = dealService.getJsonResult(keyword);
        }

        return result;
    }

    @RequestMapping(value = "jsonDetailResult")
    @ResponseBody
    public List<Map<String,Deal>> getJsonDetailResult(@RequestParam("keyword") String keyword, @RequestParam("rentType") String rentType, @RequestParam("aptType") String aptType){
        List<Map<String, Deal>> result = null;

        if(rentType.equals("전체")){
            result = dealService.getJsonDetailListByAptType(keyword,aptType);
        }else if (aptType.equals("전체")) {
            result = dealService.getJsonDetailListByRentType(keyword,rentType);
        }else {
            result = dealService.getJsonDetailList(keyword,rentType,aptType);
        }

        return result;
    }

    @ResponseBody
    @GetMapping("interests")
    public List<Deal> getInterestedDealByUserCode(@RequestParam("code") String userCode) {
        List<Deal> list = dealService.getInterestedDealByUserCode(userCode);

        return list;
    }

    @PutMapping("updateDeal")
    public void updateDealById(DealRequestDto dealRequestDto){
        Deal deal = new Deal(dealRequestDto);
        dealService.updateById(deal);
    }

    @DeleteMapping("deleteDeal")
    public void deleteDealById(@RequestParam Integer code) {
        dealService.deleteById(code);
    }
}
