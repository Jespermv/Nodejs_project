1. Users Table
   user_id: INT (PK, Auto-Increment)
   username: VARCHAR(255)
   password: VARCHAR(255)
   email: VARCHAR(255)
   user_level_id: INT
   created_at: TIMESTAMP

2. MediaItems Table
   media_id: INT (PK, Auto-Increment)
   user_id: INT (FK)
   filename: VARCHAR(255)
   filesize: INT
   media_type: VARCHAR(255)
   title: VARCHAR(255)
   description: TEXT
   created_at: TIMESTAMP

3. Comments Table
   comment_id: INT (PK, Auto-Increment)
   user_id: INT (FK)
   media_id: INT (FK)
   comment_text: TEXT
   created_at: TIMESTAMP

4. Likes Table
   like_id: INT (PK, Auto-Increment)
   user_id: INT (FK)
   media_id: INT (FK)
   created_at: TIMESTAMP
