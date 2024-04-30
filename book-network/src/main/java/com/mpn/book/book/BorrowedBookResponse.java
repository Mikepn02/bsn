package com.mpn.book.book;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BorrowedBookResponse {
    private Integer id;
    private String title;
    private String isbn;
    private String authorName;
    private Double rate;
    private boolean returned;
    private boolean returnApproved;
}
