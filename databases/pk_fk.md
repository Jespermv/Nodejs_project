Primary Keys (PK)
Users: user_id
MediaItems: media_id
Comments: comment_id
Likes: like_id

Foreign Keys (FK)

1. MediaItems
   user_id → References Users(user_id)

2. Comments
   user_id → References Users(user_id)
   media_id → References MediaItems(media_id)

3. Likes
   user_id → References Users(user_id)
   media_id → References MediaItems(media_id)
