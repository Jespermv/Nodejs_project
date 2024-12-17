UPDATE MediaItems SET title = 'Updated Vacation Pic' WHERE media_id = 1;

DELETE FROM Comments WHERE comment_id = 1;

SELECT MediaItems.title, Users.username
FROM MediaItems
JOIN Users ON MediaItems.user_id = Users.user_id;
