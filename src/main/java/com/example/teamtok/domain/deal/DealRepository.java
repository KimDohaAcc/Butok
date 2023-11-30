package com.example.teamtok.domain.deal;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface DealRepository extends JpaRepository<Deal, Integer> {

    @Query(nativeQuery = true, value = "SELECT * FROM deal WHERE (deal_gu LIKE %?1%) OR (deal_dong LIKE %?1%) OR (deal_apartment_name LIKE %?1%)")
    public List<Deal> getResultList(@Param("keyword") String keyword);

    @Query(nativeQuery = true, value = "SELECT * FROM deal WHERE (deal_gu LIKE %?1%) OR (deal_dong LIKE %?1%) OR (deal_apartment_name LIKE %?1%)")
    public List<Map<String, Deal>> getJsonResult(@Param("keyword") String keyword);

    @Query(nativeQuery = true, value = "SELECT * FROM deal WHERE deal_rent_type=:rentType AND deal_apartment_type=:apartmentType AND (:depositScale1 < deal_deposit) AND (deal_deposit <= :depositScale2) AND (:pyeongScale1 < deal_pyeong) AND (deal_pyeong <= :pyeongScale2) AND ((deal_gu LIKE %:keyword%) OR (deal_dong LIKE %:keyword%) OR (deal_apartment_name LIKE %:keyword%))")
    public List<Map<String, Deal>> getJsonResult(@Param("keyword") String keyword, @Param("rentType") String rentType, @Param("apartmentType") String apartmentType, @Param("depositScale1") int depositScale1, @Param("depositScale2") int depositScale2, @Param("pyeongScale1") int pyeongScale1, @Param("pyeongScale2") int pyeongScale2);


    @Query(nativeQuery = true, value = "SELECT * FROM deal WHERE deal_apartment_type=:apartmentType AND (:depositScale1 < deal_deposit) AND (deal_deposit <= :depositScale2) AND (:pyeongScale1 < deal_pyeong) AND (deal_pyeong <= :pyeongScale2) AND ((deal_gu LIKE %:keyword%) OR (deal_dong LIKE %:keyword%) OR (deal_apartment_name LIKE %:keyword%))")
    public List<Map<String, Deal>> getJsonResultExceptRentType(@Param("keyword") String keyword, @Param("apartmentType") String apartmentType, @Param("depositScale1") int depositScale1, @Param("depositScale2") int depositScale2, @Param("pyeongScale1") int pyeongScale1, @Param("pyeongScale2") int pyeongScale2);


    @Query(nativeQuery = true, value = "SELECT * FROM deal WHERE deal_rent_type=:rentType AND (:depositScale1 < deal_deposit) AND (deal_deposit <= :depositScale2) AND (:pyeongScale1 < deal_pyeong) AND (deal_pyeong <= :pyeongScale2) AND ((deal_gu LIKE %:keyword%) OR (deal_dong LIKE %:keyword%) OR (deal_apartment_name LIKE %:keyword%))")
    public List<Map<String, Deal>> getJsonResultExceptAptType(@Param("keyword") String keyword, @Param("rentType") String rentType, @Param("depositScale1") int depositScale1, @Param("depositScale2") int depositScale2, @Param("pyeongScale1") int pyeongScale1, @Param("pyeongScale2") int pyeongScale2);

    @Query(nativeQuery = true, value = "SELECT * FROM deal WHERE (:depositScale1 < deal_deposit) AND (deal_deposit <= :depositScale2) AND (:pyeongScale1 < deal_pyeong) AND (deal_pyeong <= :pyeongScale2) AND ((deal_gu LIKE %:keyword%) OR (deal_dong LIKE %:keyword%) OR (deal_apartment_name LIKE %:keyword%))")
    public List<Map<String, Deal>> getJsonResult(@Param("keyword") String keyword, @Param("depositScale1") int depositScale1, @Param("depositScale2") int depositScale2, @Param("pyeongScale1") int pyeongScale1, @Param("pyeongScale2") int pyeongScale2);

    public List<Deal> findAllBydealApartmentName(String dealApartmentName);

    @Query(nativeQuery = true, value = "SELECT * FROM deal GROUP BY deal_rent_type")
    public List<Deal> getRentTypeList();

    @Query(nativeQuery = true, value = "SELECT * FROM deal GROUP BY deal_apartment_type")
    public List<Deal> getAptTypeList();

    @Query(nativeQuery = true, value = "SELECT * FROM deal GROUP BY deal_rent_type")
    public List<Map<String, Deal>> getJsonRentTypeList();

    @Query(nativeQuery = true, value = "SELECT * FROM deal GROUP BY deal_apartment_type")
    public List<Map<String, Deal>> getJsonAptTypeList();

    @Query(nativeQuery = true, value = "SELECT * FROM deal WHERE ((deal_gu LIKE %?1%) OR (deal_dong LIKE %?1%) OR (deal_apartment_name LIKE %?1%)) AND deal_rent_type=?2 AND deal_apartment_type=?3")
    public List<Map<String, Deal>> getJsonDetailList(@Param("keyword") String keyword, @Param("rentType") String rentType, @Param("aptType") String aptType);

    @Query(nativeQuery = true, value = "SELECT * FROM deal WHERE ((deal_gu LIKE %?1%) OR (deal_dong LIKE %?1%) OR (deal_apartment_name LIKE %?1%)) AND deal_rent_type=?2")
    public List<Map<String, Deal>> getJsonDetailListByRentType(@Param("keyword") String keyword, @Param("rentType") String rentType);

    @Query(nativeQuery = true, value = "SELECT * FROM deal WHERE ((deal_gu LIKE %?1%) OR (deal_dong LIKE %?1%) OR (deal_apartment_name LIKE %?1%)) AND deal_apartment_type=?2")
    public List<Map<String, Deal>> getJsonDetailListByAptType(@Param("keyword") String keyword, @Param("aptType") String aptType);

    @Query(nativeQuery = true, value = "SELECT * FROM deal d JOIN interests i ON (d.deal_code = i.deal_code) WHERE i.user_code =:userCode")
    public List<Deal> getInterestedDealByUserCode(@Param("userCode") String userCode);

    @Query(nativeQuery = true,value = "SELECT d.*, COUNT(*) AS count FROM deal d JOIN interests i ON (d.deal_code = i.deal_code) GROUP BY i.deal_code HAVING COUNT(*) > 1 ORDER BY COUNT(*) DESC;")
    public List<Deal> getInterestDeal();
}
