package com.booktrade;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.booktrade.mapper")
public class BooktradeApplication {

	public static void main(String[] args) {
		SpringApplication.run(BooktradeApplication.class, args);
	}

}
