import { Router } from "express";
import * as postController from '../controllers/controllers.post.js';
import * as authMiddleware from '../middlewares/middlewares.auth.js';
import * as postMiddleware from '../middlewares/middlewares.post.js';

const router = Router();

router.get('/posts', 
    authMiddleware.verifyToken,
    postController.fetchPosts);
router.post('/create_posts',
    authMiddleware.verifyToken,
    postController.createPost

);
router.post('/posts/:postId/comment', 
    authMiddleware.verifyToken, 
    postMiddleware.checkIfPostExists, 
    postController.commentOnPost
);
router.post('/posts/:postId/like', 
    authMiddleware.verifyToken,
    postMiddleware.checkIfPostExists, 
    postController.likeUnlikePost
);
router.delete('/posts/:postId/:id/comment',
    authMiddleware.verifyToken,
    postMiddleware.checkIfPostExists,
    postController.deleteComment
);
router.patch('/edit_post/:postId',
    authMiddleware.verifyToken,
    postMiddleware.checkIfPostExists,
    postController.editPost
)
router.delete('/delete_post/:postId',
    authMiddleware.verifyToken,
    postMiddleware.checkIfPostExists,
    postController.deletePost
)

export default router;
