import multer from "multer";
import fileUpload from 'express-fileupload';
import { Router } from "express";
import * as userController from '../controllers/controllers.user.js';
import * as authMiddleware from '../middlewares/middlewares.auth.js';
import * as fileUploadController from '../middlewares/middlewares.user.js'



const router = Router();

// save on server using multer
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => cb(null, 'mediaUpload/'),
//     filename: (req, file, cb) => cb(null, file.originalname)
// });
// const upload = multer({ storage });

// // save on memory using multer
// const memoryStorage = multer.memoryStorage()
// const memoryUpload = multer({ storage: memoryStorage });

router.post('/upload/express-upload', 
    authMiddleware.verifyToken,
    fileUploadController.configureFileUpload,
    userController.expressFileUploadSingleFile
);
// router.post('/upload/multer/single', 
//     upload.single('media'), 
//     userController.multerFileUploadSingleFile
// );
// router.post('/upload/multer/multiple', 
//     upload.array('media', 12),
//     userController.multerFileUploadMultipleFiles
// );
// router.post('/upload/multer/memory-single',
//     memoryUpload.single('media'),
//     userController.multerFileUploadMemorySingleFile
// );

export default router;
