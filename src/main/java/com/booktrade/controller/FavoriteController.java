package com.booktrade.controller;

import com.booktrade.result.Result;
import com.booktrade.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/favorite")
@CrossOrigin
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    @PostMapping("/add")
    public Result add(
            Long userId,
            Long bookId
    ){

        favoriteService.addFavorite(
                userId,
                bookId
        );

        return Result.success();
    }

    @DeleteMapping("/remove")
    public Result remove(
            Long userId,
            Long bookId
    ){

        favoriteService.removeFavorite(
                userId,
                bookId
        );

        return Result.success();
    }

    @GetMapping("/list")
    public Result list(
            Long userId
    ){

        return Result.success(
                favoriteService.myFavorite(
                        userId
                )
        );
    }
}