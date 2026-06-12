package com.booktrade.service.impl;

import com.booktrade.entity.User;
import com.booktrade.mapper.UserMapper;
import com.booktrade.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public void register(User user) {

        User existUser =
                userMapper.findByUsername(user.getUsername());

        if(existUser != null){
            throw new RuntimeException("用户名已存在");
        }

        user.setCreateTime(LocalDateTime.now());

        userMapper.insert(user);
    }

    @Override
    public User login(String username, String password) {

        return userMapper.login(username,password);
    }

    @Override
    public List<User> findAll() {

        return userMapper.findAll();
    }
}