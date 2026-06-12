package com.booktrade.mapper;

import com.booktrade.entity.Book;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface BookMapper {

    int insert(Book book);

    List<Book> findAllSaleBooks();

    List<Book> searchByBookName(@Param("keyword") String keyword);

    Book findByIsbn(@Param("isbn") String isbn);

    List<Book> findBySellerId(@Param("sellerId") Long sellerId);

    int updateStatus(@Param("id") Long id, @Param("status") String status);

    Book findById(@Param("id") Long id);
}