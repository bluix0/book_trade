package com.booktrade.service.impl;

import com.booktrade.entity.Book;
import com.booktrade.entity.Favorite;
import com.booktrade.mapper.FavoriteMapper;
import com.booktrade.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class FavoriteServiceImpl
        implements FavoriteService {

    @Autowired
    private FavoriteMapper favoriteMapper;

    @Override
public void addFavorite(Long userId, Long bookId) {

    // 查询图书状态
    Book book = favoriteMapper.findBookById(bookId);
    if(book == null){
        throw new RuntimeException("该图书不存在");
    }

    // 不能收藏自己发布的图书
    if(book.getSellerId().equals(userId)){
        throw new RuntimeException("不能收藏自己发布的图书");
    }

    if(!"上架在售".equals(book.getStatus())){
        throw new RuntimeException("该图书已下架或已删除，无法收藏");
    }

    // 检查是否已经收藏
    Favorite exist = favoriteMapper.findOne(userId, bookId);
    if(exist != null){
        throw new RuntimeException("已经收藏过该图书");
    }

    Favorite favorite = new Favorite();
    favorite.setUserId(userId);
    favorite.setBookId(bookId);
    favorite.setCreateTime(LocalDateTime.now());

    favoriteMapper.addFavorite(favorite);
}

    @Override
    public void removeFavorite(
            Long userId,
            Long bookId
    ) {

        favoriteMapper.removeFavorite(
                userId,
                bookId
        );
    }

    @Override
    public List<Book> myFavorite(
            Long userId
    ) {

        return favoriteMapper.findFavoriteBooks(
                userId
        );
    }


}