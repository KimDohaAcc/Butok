package com.example.teamtok.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.util.IOUtils;
import com.example.teamtok.domain.Preference.Preference;
import com.example.teamtok.domain.user.PrincipalDetails;
import com.example.teamtok.domain.user.User;
import com.example.teamtok.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Random;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    private Random ran = new Random();

    // ===UPDATE===
    // 유저 정보 업데이트
    @Transactional
    public void updateUserInfo(String userId, String userPassword) {
        userRepository.updateUser(userPassword, userId);
    }

    @Transactional
    public void updateUserPreference(String userPreference, String userId) {
        userRepository.updateUserPreference(userPreference, userId);
    }


    // 이미지 업로드
    @Transactional
    public String uploadImage(MultipartFile multipartFile) {
        if (validateFileExists(multipartFile)) {
            String profileImageName = "image/" + multipartFile.getOriginalFilename();
            ObjectMetadata objMeta = new ObjectMetadata();
            objMeta.setContentType(multipartFile.getContentType());

            try (InputStream inputStream = multipartFile.getInputStream()) {
                byte[] bytes = IOUtils.toByteArray(inputStream);
                objMeta.setContentLength(bytes.length);
                ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(bytes);
                amazonS3Client.putObject(new PutObjectRequest(bucket, profileImageName, byteArrayInputStream, objMeta));
            } catch (IOException e) {
                e.printStackTrace();
            }

            String url = amazonS3Client.getUrl(bucket, profileImageName).toString();
            return url;
        }
        return null;
    }

    // 유저 이미지 정보 업데이트
    @Transactional
    public void setUserImage(String url, String userCode) {
        userRepository.setUserProfileImage(url, userCode);
    }

    // ===DELETE===

    // 유저 탈퇴
    @Transactional
    public void deleteUser() {
        User user = getLoggedUser();
        if (user != null) {
            userRepository.delete(user);
            SecurityContextHolder.clearContext();
        }
    }

    public Preference getUserPreference(){
        User user = getLoggedUser();
        String[] preferenceDatas = user.getUserPreference().split("&");
        String dealRentType = preferenceDatas[0];
        String dealApartmentType = preferenceDatas[1];
        String[] depositScale = preferenceDatas[2].split("/");
        String[] pyeongScale = preferenceDatas[3].split("/");

        if(depositScale[1].equals("max")){
            depositScale[1] = userRepository.getDepositMax() + "";
        }

        if(pyeongScale[1].equals("max")){
            pyeongScale[1] = userRepository.getPyeongMax() + "";
        }

        int depositScale1 = Integer.parseInt(depositScale[0]);
        int depositScale2 = Integer.parseInt(depositScale[1]);
        int pyeongScale1 = Integer.parseInt(pyeongScale[0]);
        int pyeongScale2 = Integer.parseInt(pyeongScale[1]);

        Preference preference = new Preference(dealRentType, dealApartmentType, depositScale1, depositScale2, pyeongScale1, pyeongScale2);
        return preference;
    }

    // ===GET===

    public List<User> getUserAll() {
        List<User> list = userRepository.findAll();
        return list;
    }

    // 로그인 한 유저를 security에서 얻어오기
    public User getLoggedUser(){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        PrincipalDetails principalDetails = (PrincipalDetails)principal;
        User user = principalDetails.getUser();

        if(user != null){
            return user;
        }
        return null;
    }

    public String getUserPassword(String userId) {
        String password = userRepository.getUserPassword(userId);
        return password;
    }

    public User getUserById(String userId) {
        User user = userRepository.findByUserId(userId);
        if(user != null){
            System.out.println(user.getUserId());
            return user;
        }
        return null;
    }

    public User getUserByCode(String userCode) {
        User user = userRepository.findByUserCode(userCode);
        return user;
    }

    // 파일 존재 여부 확인
    private boolean validateFileExists(MultipartFile multipartFile) {
        if (multipartFile.isEmpty()) {
            return false;
        }
        return true;
    }

    public String codeGenerate() {
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyyMMddHHmmssSS");
        LocalDateTime now = LocalDateTime.now();
        int ranCode = ran.nextInt(900000) + 100000;
        String code = dtf.format(now) + ranCode;

        return code;
    }
}
