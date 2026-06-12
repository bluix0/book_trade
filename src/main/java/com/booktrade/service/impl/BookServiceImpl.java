package com.booktrade.service.impl;

import com.booktrade.entity.Book;
import com.booktrade.entity.Favorite;
import com.booktrade.mapper.BookMapper;
import com.booktrade.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookMapper bookMapper;

    @Override
    public void addBook(Book book) {

        book.setStatus("上架在售");
        book.setCreateTime(LocalDateTime.now());

        bookMapper.insert(book);
    }

    @Override
    public List<Book> findAllSaleBooks() {

        return bookMapper.findAllSaleBooks();
    }

    @Override
    public List<Book> searchByBookName(String keyword) {

        return bookMapper.searchByBookName(keyword);
    }

    @Override
    public Book findByIsbn(String isbn) {

        return bookMapper.findByIsbn(isbn);
    }

    @Override
    public List<Book> findMyBooks(Long sellerId) {

        return bookMapper.findBySellerId(sellerId);
    }

    @Override
    public void offBook(Long id) {

        bookMapper.updateStatus(id,"下架不可售");
    }

    @Override
    public void onBook(Long id) {

        bookMapper.updateStatus(id,"上架在售");
    }

    @Override
    public void deleteBook(Long id) {

        bookMapper.updateStatus(id,"已删除");
    }

}