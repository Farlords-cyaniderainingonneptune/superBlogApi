import { Router } from "express";
import * as postController from '../controllers/controllers.post.js';
import * as authMiddleware from '../middlewares/middlewares.auth.js';
import * as authorController from '../controllers/controllers.authors.js'
import * as postMiddleware from '../middlewares/middlewares.post.js';

const router = Router();

router.get('/fetch_authors',
    authMiddleware.verifyToken,
    authorController.fetchAuthors

)

router.post('/create_authors',
    authMiddleware.verifyToken,
    authorController.createAuthor

);
router.patch('/update_Authors',
    authMiddleware.verifyToken,
    authorController.updateAuthorProfile

);
router.delete('/delete_Authors',
    authMiddleware.verifyToken,
    authorController.deleteAuthorProfile

);

export default router;

