package com.booktrade.service;

import com.booktrade.entity.User;

import java.util.List;

public interface UserService {

    void register(User user);

    User login(String username,String password);

    List<User> findAll();
}