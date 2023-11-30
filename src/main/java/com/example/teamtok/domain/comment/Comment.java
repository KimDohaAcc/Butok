package com.example.teamtok.domain.comment;


import com.example.teamtok.util.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="comment")

public class Comment  extends Timestamp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer commentCode;

    private Integer dealCode;

    private String userCode;

    private String userName; // 작성자

    private String commentContent; // 댓글 내용

    private String commentImage1;

    private String commentImage2;

    private String commentImage3;


    public Comment(CommentRequestDto commentDto) {
        this.commentCode = commentDto.getCommentCode();
        this.dealCode = commentDto.getDealCode();
        this.userCode = commentDto.getUserCode();
        this.userName = commentDto.getUserName();
        this.commentContent = commentDto.getCommentContent();
        this.commentImage1 = commentDto.getCommentImage1();
        this.commentImage2 = commentDto.getCommentImage2();
        this.commentImage3 = commentDto.getCommentImage3();
    }

    public void update(CommentRequestDto commentRequestDto) {
        this.commentContent = commentRequestDto.getCommentContent();
        this.commentImage1 = commentRequestDto.getCommentImage1();
        this.commentImage2 = commentRequestDto.getCommentImage2();
        this.commentImage3 = commentRequestDto.getCommentImage3();
    }
}
