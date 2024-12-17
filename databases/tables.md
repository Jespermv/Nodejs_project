1. Users Table Stores information about users.
   user_id (PK)
   username (VARCHAR)
   email (VARCHAR)
   password (VARCHAR)
   created_at (TIMESTAMP)

2. MediaItems Table Stores media files (photos, videos).
   media_id (PK)
   user_id (FK)
   filename (VARCHAR)
   filesize (INT)
   media_type (VARCHAR)
   title (VARCHAR)
   description (TEXT)
   created_at (TIMESTAMP)

3. Comments Table Stores comments made by users on media items.
   comment_id (PK)
   media_id (FK to MediaItems)
   user_id (FK to Users)
   comment (TEXT)
   created_at (TIMESTAMP)

4. Likes Table Tracks likes on media items.
   like_id (PK)
   media_id (FK to MediaItems)
   user_id (FK to Users)
   created_at (TIMESTAMP)
