package com.booktrade.controller;

import com.booktrade.entity.User;
import com.booktrade.result.Result;
import com.booktrade.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public Result register(@RequestBody User user){

        try{
            userService.register(user);

            return Result.success();

        }catch (Exception e){

            return Result.error(e.getMessage());
        }
    }

    @PostMapping("/login")
    public Result login(@RequestBody User user){

        User loginUser =
                userService.login(
                        user.getUsername(),
                        user.getPassword()
                );

        if(loginUser == null){

            return Result.error("用户名或密码错误");
        }

        return Result.success(loginUser);
    }

    @GetMapping("/list")
    public Result list(){

        return Result.success(
                userService.findAll()
        );
    }
}