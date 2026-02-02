
ALTER TABLE blog_users
DROP COLUMN user_type;

DELETE blog_users
WHERE email='superAkin@gmail.com'
