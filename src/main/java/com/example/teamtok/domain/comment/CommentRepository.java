package com.example.teamtok.domain.comment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

    public List<Comment> findAllByDealCode(int dealCode);

    @Query(nativeQuery = true, value = "SELECT * FROM comment GROUP BY created_at")
    public List<Comment> getAllComments();

    // create
    @Query(nativeQuery = true, value = "INSERT INTO comment(review_number, user_id, comment_content) VALUES(?, ?, ?)")
    public List<Comment> createComment();

    public int countByDealCode(int dealCode);

    // modify
//    @Query(nativeQuery = true, value = "   comment(comment_image1, comment_image2, comment_image3")
//    public void deleteImage();

    /*
    UPDATE your_table_name
SET
    comment_image1 = CASE
                        WHEN comment_image1 = 'your_image_name.jpg' THEN NULL
                        ELSE comment_image1
                    END,
    comment_image2 = CASE
                        WHEN comment_image2 = 'your_image_name.jpg' THEN comment_image1
                        WHEN comment_image2 IS NOT NULL THEN comment_image2
                        ELSE NULL
                    END,
    comment_image3 = CASE
                        WHEN comment_image3 = 'your_image_name.jpg' THEN comment_image2
                        WHEN comment_image3 IS NOT NULL THEN comment_image3
                        ELSE NULL
                    END
WHERE
    comment_image1 = 'your_image_name.jpg'
    OR comment_image2 = 'your_image_name.jpg'
    OR comment_image3 = 'your_image_name.jpg';

     */

//    @Query(nativeQuery = true, value = "   comment(comment_image1, comment_image2, comment_image3")
//    public void moveImage();

    /*
       UPDATE your_table_name
SET
    comment_image1 = comment_image2,
    comment_image2 = comment_image3,
    comment_image3 = NULL
WHERE
    comment_image1 IS NULL
    AND comment_image2 IS NOT NULL
    AND comment_image3 IS NOT NULL;

     */

}

