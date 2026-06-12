package com.booktrade.controller;

import com.booktrade.entity.Book;
import com.booktrade.result.Result;
import com.booktrade.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/book")
@CrossOrigin
public class BookController {

    @Autowired
    private BookService bookService;

    @PostMapping("/add")
    public Result addBook(@RequestBody Book book){

        bookService.addBook(book);

        return Result.success();
    }

    @GetMapping("/list")
    public Result list(){

        return Result.success(
                bookService.findAllSaleBooks()
        );
    }

    @GetMapping("/search")
    public Result search(String keyword){

        return Result.success(
                bookService.searchByBookName(keyword)
        );
    }

    @GetMapping("/isbn")
    public Result isbn(String isbn){

        return Result.success(
                bookService.findByIsbn(isbn)
        );
    }

    @GetMapping("/my")
    public Result my(Long sellerId){

        return Result.success(
                bookService.findMyBooks(sellerId)
        );
    }

    @PutMapping("/off")
    public Result off(Long id){

        bookService.offBook(id);

        return Result.success();
    }

    @PutMapping("/on")
    public Result on(Long id){

        bookService.onBook(id);

        return Result.success();
    }

    @PutMapping("/delete")
    public Result delete(Long id){

        bookService.deleteBook(id);

        return Result.success();
    }
}