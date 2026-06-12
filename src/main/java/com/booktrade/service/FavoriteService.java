package com.booktrade.service;

import com.booktrade.entity.Book;

import java.util.List;

public interface FavoriteService {

    void addFavorite(Long userId,Long bookId);

    void removeFavorite(Long userId,Long bookId);

    List<Book> myFavorite(Long userId);
}