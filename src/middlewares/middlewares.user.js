import fileUpload from 'express-fileupload';
import path from 'path';

export const configureFileUpload = fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/', 
    limits: { fileSize: 50 * 1024 * 1024 }, 
    abortOnLimit: true,
    createParentPath: true, 
});
