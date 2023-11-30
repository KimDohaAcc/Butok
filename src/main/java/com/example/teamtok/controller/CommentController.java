package com.example.teamtok.controller;

import com.example.teamtok.domain.comment.Comment;
import com.example.teamtok.domain.comment.CommentRepository;
import com.example.teamtok.domain.comment.CommentRequestDto;
import com.example.teamtok.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class CommentController {
    private final CommentService commentService;
    private final CommentRepository commentRepository;

    // Create
    @PostMapping("comment")
    public Comment createComment(@RequestBody CommentRequestDto commentRequestDto){
        System.out.println("createComment");
        Comment comment = new Comment(commentRequestDto);
        return commentRepository.save(comment);
    }

    @PostMapping("comment/images")
    public String createCommentWithImages(@RequestPart("file") MultipartFile multipartFile) {
        String url = commentService.uploadImage(multipartFile);

        return url;
    }

    //Read
    @GetMapping("comments")
    public List<Comment> getCommentAll(){
        return commentRepository.findAll();
    }

    @GetMapping("comment/{comment_code}")
    public Comment getCommentByUserCode(@PathVariable int comment_code){
        return commentRepository.findById(comment_code).orElseThrow(
                () -> new IllegalArgumentException("X")
        );
    }

    @ResponseBody
    @GetMapping("comment/count")
    public int getCountByDealCode(@RequestParam("code") int dealCode) {
        return commentService.countByDealCode(dealCode);
    }


    @GetMapping("comments/{dealCode}")
    public List<Comment> getCommentsByDealCode(@PathVariable int dealCode) {
        return commentRepository.findAllByDealCode(dealCode);
    }

    //Update
    @PostMapping("update")
    public void updateComment(@RequestBody CommentRequestDto commentRequestDto){
        System.out.println("업데이트 :" + commentRequestDto.getCommentCode());
        commentService.updateComment(commentRequestDto);
    }

    //Delete
    @GetMapping("remove")
    public void removeComment(@RequestParam("commentCode") Integer commentCode){
        System.out.println("remove!");
        commentService.deleteCommentById(commentCode);
    }
}






