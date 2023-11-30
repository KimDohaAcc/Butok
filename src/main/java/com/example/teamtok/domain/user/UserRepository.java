package com.example.teamtok.domain.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, String> {

    @Modifying(clearAutomatically = true)
    @Query(nativeQuery = true, value = "UPDATE `user` SET user_profile_image=?1 WHERE user_code=?2")
    public void setUserProfileImage(String url, String userCode);

    @Modifying(clearAutomatically = true)
    @Query(nativeQuery = true, value = "UPDATE `user` SET user_password=?1 WHERE user_id=?2")
    public void updateUser(String userPassword, String userId);

    @Modifying(clearAutomatically = true)
    @Query(nativeQuery = true, value = "UPDATE `user` SET user_preference=?1 WHERE user_id=?2")
    public void updateUserPreference(String userPreference, String userId);


    @Query(nativeQuery = true, value = "SELECT user_password FROM `user` WHERE user_id=?1")
    public String getUserPassword(String userId);

    public User findByUserId(String userId);

    public User findByUserCode(String userCode);

    @Query(nativeQuery = true, value = "SELECT MAX(deal_deposit) FROM deal")
    public int getDepositMax();


    @Query(nativeQuery = true, value = "SELECT MAX(deal_pyeong) FROM deal")
    public int getPyeongMax();
}