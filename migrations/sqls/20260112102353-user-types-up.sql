CREATE TYPE user_types AS ENUM ('admin', 'user');
ALTER TABLE blog_users
ADD COLUMN IF NOT EXISTS user_type user_types DEFAULT'user';
INSERT INTO blog_users(
    user_name,
    first_name,
    email,
    password,
    status,
    is_verified_account,
    user_type

)VALUES('supermanAdmin', 'Akin', 'superAkin@gmail.com','$2a$10$AZaFpSJb7AsbwY2ogcrTsehSanlFIOsmJG9TJFAAdaQ4hKhLgkNpO','active', TRUE, 'admin')
;