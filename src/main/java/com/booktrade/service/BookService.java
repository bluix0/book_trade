package com.booktrade.service;

import com.booktrade.entity.Book;

import java.util.List;

public interface BookService {

    void addBook(Book book);

    List<Book> findAllSaleBooks();

    List<Book> searchByBookName(String keyword);

    Book findByIsbn(String isbn);

    List<Book> findMyBooks(Long sellerId);

    void offBook(Long id);

    void onBook(Long id);

    void deleteBook(Long id);
}