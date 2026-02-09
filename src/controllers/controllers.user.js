import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';
import cloudinary from '../config/cloudinary/index.js';
import * as userModel from '../models/models.user.js';
import * as Helpers from '../utils/utils.helpers.js'
 

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const expressFileUploadSingleFile = async (req, res) => {
    
    let localFilePath = '';
const {files}= req;

    try {
        // 1. Check if file exists
        if (!req.files || !req.files.media) {
            return res.status(400).json({ status: 'fail', message: 'No file uploaded under key "media"' });
        }
        const sampleFile = req.files.media;
        const usedBy = req.query.usedBy || 'posts'; // Default to 'posts'
        const userId= req.user.user_id
   
    //     if (!files || Object.keys(files).length === 0) {
    //     return res.status(400).send('No files were uploaded.');
    // }

    // const allowedFiles = [ 'image/jpg', 'image/png', 'image/jpeg', 'application/pdf', 'application/msword', 'video/mp4', 'audio/mpeg', 'text/csv']
    // if (!allowedFiles.includes(files.media.mimetype)) {
    //     return res.status(400).json({
    //         status: 'error',
    //         message: 'File type not allowed'
    //     });
    // }

    // if (files.media.mimetype.startsWith('image/') && files.media.size > 5242880) {
    //     return res.status(400).json({
    //         status: 'error',
    //         message: 'Image size should not be more than 5MB'
    //     });
    // };

       const uploadPath = path.join(process.cwd(), 'mediaUpload');
        if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
        
        localFilePath = path.join(uploadPath, `${Date.now()}_${sampleFile.name}`);

       
        await sampleFile.mv(localFilePath);

       
        const cloudResult = await cloudinary.uploader.upload(localFilePath, {
            overwrite:'true',
            resource_type: "auto",
            folder: 'backendCohortOne/express-uploads',
            
        });

       
        const dbPayload = {
            userId: req.user.user_id,
            file_url: cloudResult.secure_url,
            usedBy: usedBy,
            type: sampleFile.mimetype.split('/')[0], 
            mimeType: sampleFile.mimetype,
            size: sampleFile.size,
            cloudinaryId: cloudResult.public_id
        };

        const savedMedia = await userModel.expressFileUpload(dbPayload);
if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath)   
        ;

        return res.status(201).json({
            status: 'success',
            message: 'File processed and saved successfully',
            data: savedMedia
        });

    } catch (error) {
    
        if (localFilePath && fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
        
        console.error('Upload Error:', error);
        return res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};



// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
//  import fileUpload from 'express-fileupload';
// import cloudinary from '../config/cloudinary/index.js';
// import db from '../config/db/index.js';
// import * as Helpers from '../utils/utils.helpers.js'
// import * as postModel from '../models/models.post.js';
// import * as authModel from '../models/models.auth.js';
// import * as authController from './controllers.auth.js';
// import * as userModel from '../models/models.user.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// // upload using express-fileupload
// export const expressFileUploadSingleFile = async(req, res) => {
     

//     let uploadPath;
//     let sampleFile;
//     try{
//     const { files} = req;
//     const userId= req.user.user_id;
//     // 1. Validation for the 'used_by' enum field
//     const {usedBy = ['authors', 'users', 'posts']}= req.query;
//     if (!usedBy) {
//         return res.status(400).json({ 
//             status: 'error', 
//             message: 'Please specify usedBy as authors, users, or posts' 
//         });
//     }
//     if (!files || Object.keys(files).length === 0) {
//         return res.status(400).send('No files were uploaded.');
//     }

//     const allowedFiles = [ 'image/jpg', 'image/png', 'image/jpeg', 'application/pdf', 'application/msword', 'video/mp4', 'audio/mpeg', 'text/csv']
//     if (!allowedFiles.includes(files.media.mimetype)) {
//         return res.status(400).json({
//             status: 'error',
//             message: 'File type not allowed'
//         });
//     }

//     if (files.media.mimetype.startsWith('image/') && files.media.size > 5242880) {
//         return res.status(400).json({
//             status: 'error',
//             message: 'Image size should not be more than 5MB'
//         });
//     };


//     // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
//     const sampleFile = req.files.media;
//     uploadPath = path.join(__dirname, '../mediaUpload', sampleFile.name);
//     console.log('uploadPath====>>>', uploadPath);

//     // Use the mv() method to place the file somewhere on your server
//     await sampleFile.mv(uploadPath)
        

//     // upload to cloudinary cloud server
//    const result= await cloudinary.uploader.upload(uploadPath, {
//         overwrite: true,
//         resource_type: "auto",
//         folder: 'backendCohortOne/express-uploads',
//     })

//     const mediaDataUpload= await userModel.expressFileUpload(
//             userId,
//             result.secure_url,
//             usedBy,
//             sampleFile.type,
//             sampleFile.mimetype,
//             sampleFile.size,
//             result.public_id)
//     // .then((result) => {
//     //     console.log('result====>>>', result);
//     //     // delete file from server after upload
//     //     fs.unlinkSync(uploadPath);

//         // save url to DB

//         // return secure_url to user
// if (fs.existsSync(uploadPath)) fs.unlinkSync(uploadPath)

//         return res.status(200).json({
//             status: 'success',
//             message: 'File uploaded successfully',
//             data: {url:result.secure_url, db:mediaDataUpload}
//         });
    
// }catch(error){
//         console.log('error====>>>', error);
//         if (uploadPath && fs.existsSync(uploadPath)) {
//             fs.unlinkSync(uploadPath);
//         }
//         // delete file from server after upload
//         // fs.unlinkSync(uploadPath);
        
//         // return error message to user
//         return res.status(error.statusCode || 500).json({
//             status: 'fail',
//             message: error.message,
//         });
//     };

// };




// uploading single file with multer to cloudinary upload file from disk storage
export const multerFileUploadSingleFile = async(req, res) => {
     const { file } = req;
    console.log('file====>>>', file);
    try{
    const userId= req.user.user_id;
    const usedBy = req.query.usedBy 

    if (!req.file) {
    return res.status(400).json({ status:'error', message: "Please upload an image" });
    }
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.mimetype)) {
        return res.status(400).json({ message: "Invalid file format. Only JPEG, PNG, and WebP are allowed." });
    }
    if(!usedBy){
        return res.status(400).json({
            status:'error',
            message:'Please specify the use of the image'
        })
    }
    // upload to cloudinary cloud server
    const cloudResult= await cloudinary.uploader.upload(file.path, {
        overwrite: true,
        resource_type: "auto",
        folder: 'backendCohortOne/multer-uploads',
    })

        // save url to DB
        const dbPayload = {
            userId,
            file_url: cloudResult.secure_url,
            usedBy: usedBy,
            type: file.mimetype.split('/')[0], 
            mimeType: file.mimetype,
            size: file.size,
            cloudinaryId: cloudResult.public_id
        };

    const savedMedia = await userModel.expressFileUpload(dbPayload)
    if (fs.existsSync(file.path)) fs.unlinkSync(file.path) 
        if (!savedMedia){
            return res.status(400).json({
                status:'error',
                message:`unable to save ${type} file` 
            });
        }
        return res.status(200).json({
            status: 'success',
            message: 'Files uploaded successfully',
            data: savedMedia,
           
        });
    
    }catch(error) {
        console.log('error====>>>', error);
        // delete file from server after upload
        fs.unlinkSync(file.path);

        // return error message to user
        return res.status(error.statusCode || 500).json({
            status: 'fail',
            message: error.message || 'File upload failed',
        });
    };
};

// uploading multiple files with multer to cloudinary upload file from disk storage
export const multerFileUploadMultipleFiles = async(req, res) => {
    
    const { files } = req;
    console.log('files====>>>', files);
//     for (const file of files) {
//        const cloudResult= await cloudinary.uploader.upload(file.path, {
//         overwrite: true,
//         resource_type: "auto",
//         folder: 'backendCohortOne/multer-bulk-uploads',
//     })
//          const dbPayload = {
//             userId: req.user.user_id,
//             file_url: cloudResult.secure_url,
//             usedBy,
//             type: file.mimetype.split('/')[0], 
//             mimeType: file.mimetype,
//             size: file.size,
//             cloudinaryId: cloudResult.public_id
//         };

//         const savedMedia = await userModel.multipleUpload(dbPayload)

//         uploadedFileUrls.push(savedMedia);
        
//         // delete file from server after upload
//         fs.unlinkSync(file.path);
//     }

    
// 
//   await Promise.all(uploadedFileUrls);
//     if (uploadedFileUrls.length > 0) {
//         return res.status(200).json({
//             status: 'success',
//             message: 'Files uploaded successfully',
//             data: savedMedia
//         });
//     }
//     return res.status(500).json({
//         status: 'fail',
//         message: 'Files upload failed',
//     });
// }catch(error){
//         console.log('error====>>>', error);
//         // delete file from server after upload
//         fs.unlinkSync(file.path);

//         return error;
//     };
  // Check if files exist before processing
    if (!files || files.length === 0) {
        return res.status(400).json({ 
            status: 'fail', 
            message: 'No files uploaded. Please attach media files.' 
        });
    }

    try {
        const userId = req.user.user_id;
        const usedBy = req.query.usedBy || 'posts'; // Fallback if query is missing

        const uploadTasks = files.map(async (file) => {
            
            // Task A: Upload to Cloudinary
            const cloudResult = await cloudinary.uploader.upload(file.path, {
                overwrite: true,
                resource_type: "auto",
                folder: 'backendCohortOne/multer-bulk-uploads',
            });

            // Task B: Prepare Payload for DB (using correct Multer properties)
            const dbPayload = {
                userId,
                file_url: cloudResult.secure_url,
                usedBy,
                type: file.mimetype.split('/')[0],
                mimeType: file.mimetype,
                size: file.size,
                cloudinaryId: cloudResult.public_id
            };

           
            const savedMedia = await userModel.multipleUpload(dbPayload);
            if (fs.existsSync(file.path)) {
                fs.unlinkSync(file.path);
            }

            // This result goes into the final 'results' array
            return savedMedia;
        });

        // 3. Wait for every single task to cross the finish line
        const results = await Promise.all(uploadTasks);

        // 4. Send the final response
        return res.status(200).json({
            status: 'success',
            message: `${results.length} files uploaded successfully`,
            data: { media_items: results }
        });

    } catch (error) {
        console.error('Bulk Upload Error:', error);
        files.forEach(file => {
            if (fs.existsSync(file.path)) {
                fs.unlinkSync(file.path);
            }
        });

        return res.status(500).json({
            status: 'fail',
            message: error.message || 'Multiple file upload failed',
        });
    }
}; 


// uploading single file with multer to cloudinary upload file from memory storage
export const multerFileUploadMemorySingleFile = async(req, res) => {
    try {
        const { file } = req;
        console.log('file====>>>', file);
    
        // upload to cloudinary cloud server
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream({
                overwrite: true,
                resource_type: "auto",
                folder: 'backendCohortOne/multer-memory-uploads',
            }, (error, result) => {
                if (error) {
                return reject(error);
                }
                resolve(result);
            });
            uploadStream.end(file.buffer);

        });
        console.log('result====>>>', result);
        if (result) {
            // save url to DB
        
            // return secure_url to user
            return res.status(200).json({
                status: 'success',
                message: 'Files uploaded successfully',
                data: { media_url: result.secure_url }
            });
        }
    } catch (error) {
        console.log('error====>>>', error);
        return res.status(500).json({
            status: 'fail',
            message: error.message || 'File upload failed',
        });
    }
};
//get file uploads
export const fetchMediaFile = async(req,res) => {
   try{
    const userId= req.user.user_id;
    const mediaFile =  await userModel.fetchMediaFile(userId);
    if(!mediaFile){
        return res.status(400).json({
            status:'error',
            message:'unable to retrieve file'
        })
    } return res.status(200).json({
        status:'success',
        data:mediaFile
    });
   }catch(error) {
        console.log('error====>>>', error);
        return res.status(500).json({
            status: 'fail',
            message: error.message || 'File upload failed',
        });
    }
}
