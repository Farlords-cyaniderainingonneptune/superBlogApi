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

)VALUES('SuperAdminman', 'Akintunde', 'superAdministratorAkin@gmail.com','$2b$10$sM4Z4ji5VkHfx0jmM9sZguXO7.UAOjv876W8tE16r5S7vjOwtkkpS','active', TRUE,'admin' );