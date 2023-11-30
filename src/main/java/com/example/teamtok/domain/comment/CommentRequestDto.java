package com.example.teamtok.domain.comment;

import lombok.*;

import java.sql.Timestamp;

@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CommentRequestDto {
    private int commentCode;
    private int dealCode;
    private String userCode;
    private String userName;
    private String commentContent;
    private String commentImage1;
    private String commentImage2;
    private String commentImage3;
    private Timestamp createdAt;
    private Timestamp modifiedAt;
}
