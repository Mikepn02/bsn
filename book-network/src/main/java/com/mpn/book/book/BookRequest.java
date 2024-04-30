package com.mpn.book.book;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record BookRequest(
        Integer id,
        @NotNull(message = "100")
        @NotEmpty(message = "100")
        String title,
        @NotEmpty(message = "101")
        @NotNull(message = "101")
        String authorName,
        @NotEmpty(message = "102")
        @NotNull(message = "103")
        String ISBN,
        @NotEmpty(message = "103")
        @NotNull(message = "103")
        String synopsis,
        boolean shareable
) {
}
