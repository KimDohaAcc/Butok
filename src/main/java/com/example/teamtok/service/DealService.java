package com.example.teamtok.service;

import com.example.teamtok.domain.Preference.Preference;
import com.example.teamtok.domain.deal.Deal;
import com.example.teamtok.domain.deal.DealRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class DealService {
    private final DealRepository dealRepository;

    // transactional UD

    // Read
    public List<Deal> getDealAll(){
        return dealRepository.findAll();
    }

    public List<Deal> getAptTypeList(){
        return dealRepository.getAptTypeList();
    }

    public List<Deal> getRentTypeList(){
        return dealRepository.getRentTypeList();
    }

    public List<Deal> getDealAllByName(String dealApartmentName){
        return dealRepository.findAllBydealApartmentName(dealApartmentName);
    }

    public List<Deal> getInterestDeal(){
        return dealRepository.getInterestDeal();
    }

    public List<Map<String,Deal>> getJsonDetailList(String keyword, String rentType, String aptType){
        return dealRepository.getJsonDetailList(keyword,rentType, aptType);
    }

    public List<Map<String, Deal>> getJsonDetailListByRentType(String keyword, String rentType){
        return dealRepository.getJsonDetailListByRentType(keyword,rentType);
    }

    public List<Map<String,Deal>> getJsonDetailListByAptType(String keyword, String aptType){
        return dealRepository.getJsonDetailListByAptType(keyword,aptType);
    }

    public List<Deal> getResultList(String keyword) {
        return dealRepository.getResultList(keyword);
    }

    public List<Map<String, Deal>> getJsonResult(String keyword) {
        return dealRepository.getJsonResult(keyword);
    }

    public List<Map<String, Deal>> getJsonResult(String keyword, Preference preference) {
        String rentType = preference.getDealRentType();
        String apartmentType = preference.getDealApartmentType();
        int depositScale1 = preference.getDepositScale1();
        int depositScale2 = preference.getDepositScale2();
        int pyeongScale1 = preference.getPyeongScale1();
        int pyeongScale2 = preference.getPyeongScale2();

        if(rentType.equals("전체") && apartmentType.equals("전체")){
        return dealRepository.getJsonResult(keyword, depositScale1, depositScale2 ,pyeongScale1, pyeongScale2);
        }

        else if(rentType.equals("전체")){
        return dealRepository.getJsonResultExceptRentType(keyword, apartmentType, depositScale1, depositScale2 ,pyeongScale1, pyeongScale2);
        }

        else if(apartmentType.equals("전체")){
        return dealRepository.getJsonResultExceptAptType(keyword, rentType, depositScale1, depositScale2 ,pyeongScale1, pyeongScale2);
        }

        else {
            return dealRepository.getJsonResult(keyword, rentType, apartmentType, depositScale1, depositScale2 ,pyeongScale1, pyeongScale2);
        }
    }

    public List<Deal> getInterestedDealByUserCode(String userCode) {
        return dealRepository.getInterestedDealByUserCode(userCode);
    }

    // Update
    @Transactional
    public void updateById(Deal object){
        Deal deal = getDealById(object.getDealCode());
        if(deal != null){
            dealRepository.save(object);
        }
    }

    // Delete
    public void deleteById(int code){
        Deal deal = getDealById(code);
        if(deal != null)
            dealRepository.deleteById(deal.getDealCode());
    }

    @Transactional
    public Deal getDealById(int code){
        Deal deal = null;
        deal = dealRepository.findById(code).orElseThrow(
                ()-> new IllegalArgumentException()
        );
        return deal;
    }
}
