DROP TYPE IF EXISTS user_types CASCADE;
ALTER TABLE blog_users
DROP COLUMN user_type;

DELETE FROM blog_users
WHERE email='superAkin@gmail.com'
