import db from "../config/db/index.js";
import queries from "../queries/queries.post.js";

export const fetchPosts = async (offset, limit) => {
    const posts = await db.any(queries.fetchPosts, [ true, 'published', parseInt(offset), parseInt(limit)]);
    return posts;
};

export const fetchPostsCount = async () => {
    const posts = await db.oneOrNone(queries.fetchPostsCounts, [true, 'published']);
    return posts;
} 

export const postExists = async (postId) => {
    const post = await db.oneOrNone(queries.postExists, [ postId ]);
    return post;
};

export const postComment = async (postId, user_id, comment) => {
    const newComment = await db.oneOrNone(queries.postComment, [ postId, user_id, comment]);
    return newComment;
};

export const likeUnlikePost = async (postId, action) => {
    if (action === 'like') {
        return await db.one(queries.likePost, [ postId ]);
    }
    return await db.one(queries.unlikePost, [ postId ]);
}

export const createPost = async (title, content, author, category, tags, images ) => {
    const newPost = await db.oneOrNone(queries.createPosts, [title.trim(), content.trim(), parseInt(category), author, 'unpublished', tags ? tags.split(', ') : [], images ?? [] ])
    return newPost;
};

export const checkIfActualAdmin = async (user_id)=>{
    const actualAdmin = await db.oneOrNone(queries.checkIfActualAdmin, [user_id, 'admin','active']);
    return actualAdmin;
};

export const checkIfAuthor= async (name)=>{
    const actualAuthor = await db.oneOrNone(queries.checkIfAuthor, [name]);
    return actualAuthor;
};

export const commentExists= async(id, postId, user_id)=>{
    const existingComment= await db.oneOrNone(queries.commentExists, [id, postId, user_id])
    return existingComment;
}
export const deleteComment= async(id, postId, user_id)=>{
    const deletedComment= await db.oneOrNone(queries.deleteComment, [id, postId, user_id])
    return deletedComment;
};
export const setDefault= async(postId, author, title, content)=>{
    const defaultPost= await db.oneOrNone(queries.setDefault,[postId, author, title, content])
    return defaultPost;
}
export const updatePostStatus= async(postId, title, content, author, status, is_published)=>{
    const updatePostStatus= await db.oneOrNone(queries.updatePostStatus,[postId, title, content, author, status, is_published])
    return updatePostStatus;
};
export const deletePost= async(postId)=>{
    const deletedPost= await db.oneOrNone(queries.deletePost,[postId])
    return deletedPost;
};