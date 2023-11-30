package com.example.teamtok.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.util.IOUtils;
import com.example.teamtok.domain.comment.Comment;
import com.example.teamtok.domain.comment.CommentRepository;
import com.example.teamtok.domain.comment.CommentRequestDto;
import com.example.teamtok.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CommentService {
    private final CommentRepository commentRepository;

    private final AmazonS3Client amazonS3Client;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    //Update
        public void updateCommentById(CommentRequestDto commentRequestDto){
            Comment comment = new Comment(commentRequestDto);
            commentRepository.save(comment);
    }

    @Transactional
    public String uploadImage(MultipartFile multipartFile) {
        // 사진 1개일 때 경우라서 3개까지 받을 수 있게 배열로 처리를 해주기
        if (validateFileExists(multipartFile)) {
            String imageName = "comment-img/" + multipartFile.getOriginalFilename();
            ObjectMetadata objMeta = new ObjectMetadata();
            objMeta.setContentType(multipartFile.getContentType());

            try (InputStream inputStream = multipartFile.getInputStream()) {
                byte[] bytes = IOUtils.toByteArray(inputStream);
                objMeta.setContentLength(bytes.length);
                ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(bytes);
                amazonS3Client.putObject(new PutObjectRequest(bucket, imageName, byteArrayInputStream, objMeta));
            } catch (IOException e) {
                e.printStackTrace();
            }

            String url = amazonS3Client.getUrl(bucket, imageName).toString();
            return url;
        }
        return null;
    }

    public int countByDealCode(int dealCode) {
            return commentRepository.countByDealCode(dealCode);
    }

    private boolean validateFileExists(MultipartFile multipartFile) {
        if (multipartFile.isEmpty()) {
            return false;
        }
        return true;
    }

    @Transactional
    public void updateComment(CommentRequestDto commentRequestDto){
        Comment comment = new Comment(commentRequestDto);
        commentRepository.save(comment);
    }


    //Delete
    public void deleteCommentById(Integer commentCode) {
        commentRepository.deleteById(commentCode);
    }
}
