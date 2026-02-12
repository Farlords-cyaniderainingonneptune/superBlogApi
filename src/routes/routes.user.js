
import fileUpload from 'express-fileupload';
import { Router } from "express";
import * as userController from '../controllers/controllers.user.js';
import * as authMiddleware from '../middlewares/middlewares.auth.js';
import * as fileUploadController from '../middlewares/middlewares.user.js'



const router = Router();


router.post('/upload/express-upload', 
    authMiddleware.verifyToken,
    fileUploadController.configureFileUpload,
    userController.expressFileUploadSingleFile
);

// router.get('/fetch_upload',
//     authMiddleware.verifyToken,

// )

export default router;
