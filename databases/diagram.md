+-----------------+
| Users |
+-----------------+
| user_id (PK) |
| username |
| password |
| email |
| user_level_id |
| created_at |
+-----------------+

        |
        | (1 user can have multiple media items)
        |
        v

+-----------------+
| MediaItems |
+-----------------+
| media_id (PK) |
| user_id (FK) |
| filename |
| filesize |
| media_type |
| title |
| description |
| created_at |
+-----------------+

        |
        | (1 media item can have multiple comments)
        |
        v

+-----------------+
| Comments |
+-----------------+
| comment_id (PK) |
| user_id (FK) |
| media_id (FK) |
| comment_text |
| created_at |
+-----------------+

        |
        | (1 media item can be liked by multiple users)
        |
        v

+-----------------+
| Likes |
+-----------------+
| like_id (PK) |
| user_id (FK) |
| media_id (FK) |
| created_at |
+-----------------+
