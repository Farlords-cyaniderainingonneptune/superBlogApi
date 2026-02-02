CREATE TYPE file_user AS ENUM ('authors', 'users', 'posts');
CREATE TYPE file_type AS ENUM('image', 'video', 'pdf','msword', 'text', 'audio');

CREATE TABLE IF NOT EXISTS media_uploads(
    id SERIAL PRIMARY KEY,
    uploaded_by UUID NOT NULL REFERENCES blog_users(user_id) on DELETE CASCADE ON UPDATE CASCADE,
    file_url TEXT NOT NULL,
    used_by file_user NOT NULL,
    type file_type NOT NULL,
    mime_type VARCHAR(50) NOT NULL,
    size BIGINT NOT NULL,
    cloudinary_public_id TEXT,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);