package com.booktrade.entity;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class Book {

    private Long id;
    private String isbn;
    private String bookName;
    private Double price;
    private String contact;
    private String conditionLevel; // 全新/微瑕/较旧/破损
    private String status;         // 上架在售/下架不可售/已删除
    private Long sellerId;
    private LocalDateTime createTime;
}