package com.project.todo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@ResponseBody
public class LoginController {


    @RequestMapping("/login")
    public String login() {
//        System.out.println("Riya");
        return "loginagain4";
    }

}
