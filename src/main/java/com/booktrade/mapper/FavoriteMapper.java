package com.booktrade.mapper;

import com.booktrade.entity.Book;
import com.booktrade.entity.Favorite;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface FavoriteMapper {

    int addFavorite(Favorite favorite);

    int removeFavorite(
            @Param("userId") Long userId,
            @Param("bookId") Long bookId
    );

    Favorite findOne(
            @Param("userId") Long userId,
            @Param("bookId") Long bookId
    );

    List<Book> findFavoriteBooks(Long userId);

    Book findBookById(@Param("id") Long id);
}