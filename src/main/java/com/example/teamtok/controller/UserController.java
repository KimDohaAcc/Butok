package com.example.teamtok.controller;

import com.example.teamtok.domain.user.User;
import com.example.teamtok.domain.user.UserRepository;
import com.example.teamtok.domain.user.UserRequestDto;
import com.example.teamtok.service.UserDetailService;
import com.example.teamtok.service.UserService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.net.URLDecoder;
import java.util.List;

@AllArgsConstructor
@Getter
class UserTemp {
    private String userId;
    private String userName;
    private String userPassword;
}

@RequiredArgsConstructor
@RestController
public class UserController {
    private final UserService userService;
    private final UserRepository userRepository;
    private final UserDetailService userDetailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // == CREATE ==
    @PostMapping("/registProc")
    public void registUser(UserTemp userTemp, HttpServletRequest request, HttpServletResponse response) throws IOException {
        HttpSession session = request.getSession();
        session.setAttribute("UserTemp", userTemp);
        response.sendRedirect("/preference");
    }

    @PostMapping("/finalRegist")
    public void finalRegist(@RequestParam String preferenceData, HttpServletRequest request) {
        HttpSession session = request.getSession();
        UserTemp userTemp = (UserTemp) session.getAttribute("UserTemp");
        String code = userService.codeGenerate();
        String encPassword = passwordEncoder.encode(userTemp.getUserPassword());
        UserRequestDto userRequestDto = new UserRequestDto(code, userTemp.getUserId(), encPassword, userTemp.getUserName(), preferenceData);
        User user = new User(userRequestDto);
        userRepository.save(user);
        session.removeAttribute("UserTemp");
    }

    @RequestMapping("updateProc")
    public void updateUser(@RequestParam String userId, @RequestParam String userPassword,  HttpServletRequest request, HttpServletResponse response) throws IOException {
        String encPassword = passwordEncoder.encode(userPassword);
        userService.updateUserInfo(userId, encPassword);
        updateAuthentication();
        request.setAttribute("update", true);
        response.sendRedirect("/myPage?update=Y");
    }

    @PostMapping("/updateChoice")
    public void updateChoice(@RequestParam String preferenceData) {
        User user = userService.getLoggedUser();
        if(user != null){
            userService.updateUserPreference(preferenceData, user.getUserId());
        }
    }


    @GetMapping("doLogin")
    public void login(@RequestParam(value = "error", required = false) String error,
                      @RequestParam(value = "exception", required = false) String exception, HttpServletRequest request, HttpServletResponse response) throws IOException {
        String decException = URLDecoder.decode(exception, "UTF-8");
        HttpSession session = request.getSession();
        session.setAttribute("error", error);
        session.setAttribute("exception", decException);
        response.sendRedirect("login");
    }

    // security에 유저 정보 업데이트(DB를 통해)
    public void updateAuthentication() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        SecurityContextHolder.getContext().setAuthentication(createNewAuthentication(authentication, userDetails.getUsername()));
    }


    public Authentication createNewAuthentication(Authentication currentAuth, String username) {
        UserDetails newPrincipal = userDetailService.loadUserByUsername(username);
        UsernamePasswordAuthenticationToken newAuth = new UsernamePasswordAuthenticationToken(newPrincipal, currentAuth.getCredentials(), newPrincipal.getAuthorities());
        newAuth.setDetails(currentAuth.getDetails());
        return newAuth;
    }


    // DeleteMapping으로 추후 변경해보기
    @GetMapping("/deleteProc")
    public void deleteUser() {
        userService.deleteUser();
    }

    @PostMapping("/upload")
    public void upload(@RequestPart("file") MultipartFile multipartFile) {
        User user = userService.getLoggedUser();
        if (user != null) {
            // s3에 이미지 업로드
            String url = userService.uploadImage(multipartFile);
            // db에 url 저장
            userService.setUserImage(url, user.getUserCode());
            // security 로그인 정보 업데이트
            updateAuthentication();
        }
    }

    @RequestMapping(value = "/idCheck", method = RequestMethod.GET)
    public boolean checkUserId(String userId) {
        List<User> list = userService.getUserAll();
        for (User i : list) {
            if (i.getUserId().equals(userId)) {
                return true;
            }
        }
        return false;
    }

    @GetMapping(value = "/passwordCheck")
    public boolean passwordCheck(String password) {
        User user = userService.getLoggedUser();
        boolean check = passwordEncoder.matches(password, user.getUserPassword());
        System.out.println(check);
        return check;
    }

    @ResponseBody
    @GetMapping("getUser")
    public User getUserByCode(@RequestParam("code") String userCode) {
        User user = userService.getUserByCode(userCode);
        return user;
    }

}
