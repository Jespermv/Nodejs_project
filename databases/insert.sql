-- Insert data into Users
INSERT INTO Users (username, password, email, user_level_id) VALUES
('Alice', 'pass123', 'alice@example.com', 1),
('Bob', 'pass456', 'bob@example.com', 2);

-- Insert data into MediaItems
INSERT INTO MediaItems (user_id, filename, filesize, media_type, title, description) VALUES
(1, 'img1.jpg', 50000, 'image/jpeg', 'Vacation Pic', 'Beach photo'),
(2, 'img2.jpg', 30000, 'image/jpeg', 'Cityscape', 'Downtown view');

-- Insert data into Comments
INSERT INTO Comments (user_id, media_id, comment_text) VALUES
(2, 1, 'Great view!'),
(1, 2, 'Awesome cityscape!');

-- Insert data into Likes
INSERT INTO Likes (user_id, media_id) VALUES
(1, 2),
(2, 1);
