package com.booktrade.mapper;

import com.booktrade.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface UserMapper {

    // 根据用户名查询用户
    User findByUsername(@Param("username") String username);

    // 根据用户名和密码登录
    User login(@Param("username") String username, @Param("password") String password);

    // 插入用户
    int insert(User user);

    // 查询所有用户
    List<User> findAll();
}