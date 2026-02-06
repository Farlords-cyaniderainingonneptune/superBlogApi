import multer from "multer";
import { Router } from "express";
import * as userController from '../controllers/controllers.user.js';
import * as authMiddleware from '../middlewares/middlewares.auth.js';

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'mediaUpload/'),
    filename: (req, file, cb) => cb(null, file.originalname)
});
const upload = multer({ storage });

// save on memory using multer
const memoryStorage = multer.memoryStorage()
const memoryUpload = multer({ storage: memoryStorage });

router.post('/upload/multer/single', 
    authMiddleware.verifyToken,
    upload.single('media'),
    userController.multerFileUploadSingleFile
);
router.post('/upload/multer/multiple',
    authMiddleware.verifyToken,
    upload.array('media', 12),
    userController.multerFileUploadMultipleFiles
);
router.post('/upload/multer/memory-single',
    authMiddleware.verifyToken,
    memoryUpload.single('media'),
    userController.multerFileUploadMemorySingleFile
);

export default router;


