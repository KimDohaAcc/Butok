package com.example.teamtok.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {
    @GetMapping("header")
    public String header() {
        return "header";
    }

    @GetMapping("footer")
    public String footer() {
        return "footer";
    }

    @GetMapping("regist")
    public String regist() {
        return "regist";
    }

    @GetMapping("login")
    public String loginPage() {
        return "login";
    }

    @GetMapping("myPage")
    public String myPage() {
        return "myPage";
    }

    @GetMapping("leave")
    public String leave() {
        return "leave";
    }

   @GetMapping("myInterests")
   public String myInterests() {
       return "myInterests";
   }

    @GetMapping("preference")
    public String preference() {
        return "preference";
    }

    @GetMapping("registOk")
    public String registOk() {
        return "registOk";
    }

    @GetMapping("denied")
    public String denied() {
        return "denied";
    }

    @GetMapping("data")
    public String data() {
        return "data";
    }
}
