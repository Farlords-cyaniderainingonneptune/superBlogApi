export default {
    fetchPosts: 'SELECT * FROM blog_posts WHERE is_published = $1 AND status = $2',
    postExists: `SELECT id, title, content, status FROM blog_posts WHERE id = $1`,
    postComment: `
        INSERT INTO blog_post_comments (post_id, user_id, comment) 
        VALUES ($1, $2, $3) 
        RETURNING id, post_id, comment, views_count, likes_count, is_deleted, created_at`,
    likePost: 'UPDATE blog_posts SET updated_at = NOW(), likes_count = likes_count + 1, views_count= views_count + 1 WHERE id = $1 RETURNING id, title, content, status, likes_count, views_count',
    unlikePost: 'UPDATE blog_posts SET updated_at = NOW(), likes_count = likes_count - 1 WHERE id = $1 RETURNING id, title, content, status, likes_count, views_count',
    createPosts:`
        INSERT INTO blog_posts (title, content, category, author, status, tags, images) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) 
        RETURNING *

        `,
    checkIfActualAdmin: `
        SELECT user_id, user_name, user_type, status 
        FROM blog_users WHERE user_id=$1 
        AND user_type=$2
        AND status=$3
    `,
    checkIfAuthor:`
        SELECT name FROM authors WHERE name=$1
    `,

    commentExists:`
        SELECT id, post_id, user_id, is_deleted 
        FROM blog_post_comments 
        WHERE id= $1
        AND post_id= $2
        AND user_id= $3
        AND is_deleted = false
    `,

    deleteComment:`
        DELETE FROM blog_post_comments
        WHERE id = $1 AND post_id=$2 AND user_id=$3
    `,
    setDefault:`
        UPDATE blog_posts 
        SET status='draft',
        is_published=false,
        author=$2,
        title=$3,
        content=$4
        WHERE id=$1
        RETURNING id, title, content, author, category, 
        status, tags, images, created_at, updated_at
    `,
    updatePostStatus:`
        UPDATE blog_posts 
        SET 
        updated_at = NOW(),
        status = $5,
        is_published= $6,
        is_deleted = false,
        archived_at = NULL,
        title = $2,
        content = $3,
        author = $4
        WHERE id = $1
        RETURNING id, title, content, author, category, 
        status, is_published, tags, images, created_at, updated_at
    `,
    // updateupublishlisPostStatus:`
    //     UPDATE blog_posts 
    //     SET 
    //     updated_at = NOW(),
    //     status = 'unpublished',
    //     is_published= false,
    //     is_deleted = false,
    //     archived_at = NULL,
    //     title = $2,
    //     content = $3,
    //     author = $4
    //     WHERE id = $1
    //     RETURNING id, title, content, author, category, 
    //     status, tags, images, created_at, updated_at
    // `
    deletePost:`
        UPDATE blog_posts
        SET 
        title = '',
        content = '',
        is_deleted = true
        WHERE id=$1
        RETURNING author
    `
}
