import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { json, urlencoded } from 'express';
// import pgp from 'pg-promise';
// import bcrypt from 'bcryptjs';
// import Crypto from 'crypto';
// import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import fileUpload from 'express-fileupload';
// import {v2 as cloudinary} from 'cloudinary';
import path from 'path';
import { fileURLToPath } from 'url';
// import multer from 'multer';
import fs from 'fs';
// import {upload} from './multer.js';
import routes from "./routes/index.js"

const app = express();

app.use(helmet());
app.use(compression());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors()); 
// app.use(fileUpload());

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const pg = pgp({ noWarnings: true });

// const cn = {
//   connectionString: process.env.DATABASE_URL,
//   max: 1000
// };

// // const db = pg(cn);
// export const db = pg(cn);

// cloudinary.config({ 
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//   api_key: process.env.CLOUDINARY_API_KEY, 
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   secure: true
// });


app.get('/', (_req, res) => {
  res.status(200).json({ message: 'Welcome to BuildUp Backend Cohort One' });
})

routes(app);

// app.post('/upload/express-upload', async(req, res) => {
    
//     const { files } = req;
//     let sampleFile;
//     let uploadPath;
//     console.log('files====>>>', files);
//     console.log(__dirname);
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
//     sampleFile = req.files.media;
//     uploadPath = path.join(__dirname, 'mediaUpload', sampleFile.name);

//     // Use the mv() method to place the file somewhere on your server
//     sampleFile.mv(uploadPath, function(err) {
//         if (err) {
//             return res.status(500).send(err);
//         }
//     })

//     // upload to cloudinary cloud server
//     // await cloudinary.uploader.upload(uploadPath).then((result) => {
//     //     console.log('result====>>>', result);
//     //     // save url to DB
//     //     return res.status(200).json({
//     //         status: 'success',
//     //         message: 'File uploaded successfully'
//     //     });
//     // })

//      await cloudinary.uploader.upload(uploadPath, {
//         overwrite: true,
//         resource_type: "auto",
//         folder: 'Login/express-uploads',
//          }).then((result) => {
//         console.log('result====>>>', result);
//          fs.unlinkSync(uploadPath);
//          return res.status(200).json({
//          status: 'success',
//          message: 'File uploaded successfully',
//          data:result.secure_url
//         });
//     }).catch((error) => {
//         console.log('error====>>>', error);
        
//           // delete file from server after upload
//         fs.unlinkSync(uploadPath);
        
//         // return error message to user
//         return res.status(error.statusCode || 500).json({
//             status: 'fail',
//             message: error.message,
//         });
//     });
// });



// //     const storage = multer.diskStorage({
// //     destination: (req, file, cb) => cb(null, 'mediaUpload/'),
// //     filename: (req, file, cb) => cb(null, file.originalname)
// //     })
// // const upload = multer({ storage });

// // console.log('storage===>>', storage);

// app.post('/upload/multer', upload.array('keystroke', 12), async(req, res) => {
//     const { files } = req;
//     console.log('files====>>>', files);

//     // upload to cloudinary cloud server
//     const uploadedFileUrls = [];
//     for (const file of files) {
//         await cloudinary.uploader.upload(file.path, {
//         overwrite: true,
//         resource_type: "auto",
//         folder: 'Login/multer-uploads',
//     }).then((result) => {
//         uploadedFileUrls.push(result.secure_url);
//         return;
//     }).catch((error) => {
//         console.log('error====>>>', error);
//         return error;
//     });
//     }
//     await Promise.all(uploadedFileUrls);

//     return res.status(200).json({
//         status: 'success',
//         message: 'Files uploaded successfully',
//         data: uploadedFileUrls
//     });
// })

// app.post('/upload/multer/single', upload.single('media'), async(req, res) => {
//     const { file } = req;
//     console.log('file====>>>', file);

//     // upload to cloudinary cloud server
//     await cloudinary.uploader.upload(file.path, {
//         overwrite: true,
//         resource_type: "auto",
//         folder: 'backendCohortOne/multer-uploads',
//     }).then((result) => {
//         // delete file from server after upload
//         fs.unlinkSync(file.path);

//         // save url to DB

//         // return secure_url to user
//         return res.status(200).json({
//             status: 'success',
//             message: 'Files uploaded successfully',
//             data: { media_url: result.secure_url }
//         });
//     }).catch((error) => {
//         console.log('error====>>>', error);
//         // delete file from server after upload
//         fs.unlinkSync(file.path);

//         // return error message to user
//         return res.status(error.statusCode || 500).json({
//             status: 'fail',
//             message: error.message || 'File upload failed',
//         });
//     });
// })


// app.post('/register', async (req, res) => {
//     try{

    
//     const { email, password, username, first_name, last_name } = req.body
//     if (!email || !username || !password || !first_name) {
//         return res.status(422).json({
//             status: 'error',
//             code: 422,
//             message: 'email, username, password and first_name are required'
//         })
//     }

//     if (!email.includes('@')) {
//         return res.status(422).json({
//             status: 'error',
//             code: 422,
//             message: 'email is invalid'
//         })
//     }
    
//     if (password.length < 10) {
//         return res.status(422).json({
//             status: 'error',
//             code: 422,
//             message: 'password length should not be less than 10'
//         })
//     }

//     if (!/[A-Z]/g.test(password) || !/[a-z]/g.test(password) || !/[0-9]/g.test(password) || !/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/g.test(password)) {
//         return res.status(422).json({
//             status: 'error',
//             code: 422,
//             message: 'password should contain at least one uppercase, lowercase, number and special character'
//         })
//     }

//     if (username.length < 3 || first_name.length < 3 || last_name.length < 3) {
//         return res.status(422).json({
//             status: 'error',
//             code: 422,
//             message: 'username, first_name and last_name should not be less than 3 characters'
//         })
//     }

//     const existingEmail = await db.oneOrNone('SELECT id, email, user_name FROM blog_users WHERE email = $1', [ email.trim().toLowerCase() ]);
//     if (existingEmail) {
//         return res.status(409).json({
//             status: 'error',
//             code: 409,
//             message: 'email already exists'
//         })
//     }
//     const existingUserName = await db.oneOrNone('SELECT id, email, user_name FROM blog_users WHERE user_name = $1', [ username.trim().toLowerCase() ]);
//     if (existingUserName) {
//         return res.status(409).json({
//             status: 'error',
//             code: 409,
//             message: 'username already exists'
//         })
//     }

//     // hash password
//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(password, salt);

//     // generate unique identifier/otp
//     const verificationCode = Crypto.randomInt(0, 1000000).toString().padStart(6, '7');
//     const verificationCodeDuration = 10; // in minutes
//     const verificationCodeExpireAt = new Date(Date.now() + verificationCodeDuration * 60 * 1000);

//     // save to the DB
//     const newUser = await db.any(`
//         INSERT INTO blog_users (email, user_name, password, first_name, last_name, verification_code, verification_code_expire_at) 
//         VALUES ($1, $2, $3, $4, $5, $6, $7) 
//         RETURNING *
//     `, [ 
//         email.trim().toLowerCase(), 
//         username.trim().toLowerCase(), 
//         hash, 
//         first_name.trim().toLowerCase(), 
//         last_name.trim().toLowerCase(),
//         verificationCode.trim(),
//         verificationCodeExpireAt
//     ]);

//     // send verification email to users

//     return res.status(201).json({
//         status: 'success',
//         code: 201,
//         message: 'Account created successfully',
//         data: newUser
//     })
//     }catch(err){
//         return res.status(500).json({
//                     status:'error',
//                     code:500,
//                     message:err.message
//                 })
//     }
// })


// app.post('/verify-account', async (req, res) => {
//     const {verification_code, email} = req.body;

//     if (!verification_code || !email) {
//         return res.status(422).json({
//             status: 'error',
//             code: 422,
//             message: 'verification_code and email are required'
//         })
//     }

//     if (verification_code.length !== 6) {
//         return res.status(422).json({
//             status: 'error',
//             code: 422,
//             message: 'verification_code must be 6 digits'
//         })
//     }

//     const userDetails = await db.oneOrNone('SELECT id, user_id, email, is_verified_account, verification_code, verification_code_expire_at FROM blog_users WHERE email = $1 AND is_deleted = FALSE', [ email.trim().toLowerCase() ]);
//     if (!userDetails) {
//         return res.status(401).json({
//             status: 'error',
//              code: 401,
//              message: 'Invalid email, user does not exist'
//         })
//     }

//     if (userDetails.is_verified_account) {
//         return res.status(400).json({
//             status: 'error',
//              code: 400,
//              message: 'Account already verified'
//         })
//     }

//     if (userDetails.verification_code_expire_at < new Date()) {
//         return res.status(401).json({
//             status: 'error',
//              code: 401,
//              message: 'Verification code has expired'
//         })
//     }

//     if (verification_code !== userDetails.verification_code) {
//         return res.status(401).json({
//             status: 'error',
//             code: 401,
//             message: 'Invalid verification code'
//         })
//     }

//     const verifiedUser = await db.one(`
//         UPDATE blog_users
//           SET updated_at = NOW(),
//           is_verified_account = TRUE,
//           status = 'active',
//           verification_code = NULL,
//           verification_code_expire_at = NULL
//         WHERE email = $1
//         RETURNING id, user_id, email, first_name, last_name, is_verified_account, status, created_at, updated_at
//         `, [ email.trim().toLowerCase() ])

//     // send welcome email to users

//     return res.status(200).json({
//         status: 'success',
//         code: 200,
//         message: 'Account verified successfully',
//         data: verifiedUser
//     })
// })

// app.post('/resend-verification-code', async (req, res) => {
//     const {email} = req.body;

//     if (!email) {
//         return res.status(422).json({
//             status: 'error',
//             code: 422,
//             message: 'email is required'
//         })
//     }

//     const userDetails = await db.oneOrNone('SELECT id, user_id, email, is_verified_account, verification_code, verification_code_expire_at FROM blog_users WHERE email = $1 AND is_deleted = FALSE', [ email.trim().toLowerCase() ]);
//     if (!userDetails) {
//         return res.status(401).json({
//             status: 'error',
//              code: 401,
//              message: 'Invalid email, user does not exist'
//         })
//     }

//     if (userDetails.is_verified_account) {
//         return res.status(400).json({
//             status: 'error',
//              code: 400,
//              message: 'Account already verified'
//         })
//     }

//    // generate unique identifier/otp
//     const verificationCode = Crypto.randomInt(0, 1000000).toString().padStart(6, '7');
//     const verificationCodeDuration = 10; // in minutes
//     const verificationCodeExpireAt = new Date(Date.now() + verificationCodeDuration * 60 * 1000);

//     const updatedUser = await db.oneOrNone('UPDATE blog_users SET updated_at = NOW(), verification_code = $2, verification_code_expire_at = $3 WHERE email = $1 RETURNING id, user_id, email, verification_code, verification_code_expire_at', 
//         [ email.trim().toLowerCase(), verificationCode.trim(), verificationCodeExpireAt])

//     // send email of new otp verification code

//     if (process.env.NODE_ENV === 'production') {
//         delete updatedUser.verification_code;
//     }

//     return res.status(200).json({
//         status: 'success',
//          code: 200,
//          message: 'Verification code resent successfully',
//          data: updatedUser
//     })
// })

// app.post('/login', async (req, res) => {
//     const { username, password } = req.body

//     if (!username || !password) {
//         return res.status(422).json({
//             status: 'error',
//             code: 422,
//             message: 'username and password are required'
//         })
//     }

//     const userExists = await db.oneOrNone(`
//         SELECT id, user_id, email, user_name, first_name, last_name, is_verified_account, status, created_at 
//         FROM blog_users 
//         WHERE user_name = $1 
//         AND is_deleted = FALSE`, [ username.trim().toLowerCase() ])
//     if (!userExists) {
//         return res.status(401).json({
//             status: 'error',
//             code: 401,
//             message: 'Invalid login credentials'
//         })
//     }

//     const userPassword = await db.oneOrNone('SELECT id, user_id, password FROM blog_users WHERE user_id = $1', [ userExists.user_id ])
//     const validPassword = bcrypt.compareSync(password, userPassword.password);
//     if (!validPassword) {
//         return res.status(401).json({
//             status: 'error',
//             code: 401,
//             message: 'Invalid login credentials'
//         })
//     }

//     const allowedStatuses = [ 'active', 'inactive' ]
//     if (!allowedStatuses.includes(userExists.status)) {
//         return res.status(401).json({
//             status: 'error',
//             code: 401,
//             message: `User account is ${userExists.status}, kindly contact support team`
//         })
//     }

//     // generate jwt token to manage sessions
//     const token = jwt.sign({ user_id: userExists.user_id, email: userExists.email }, process.env.JWT_SECRET, { expiresIn: '10mins' })
//     await db.none('UPDATE blog_users SET updated_at = NOW(), last_login_at = NOW() WHERE user_id = $1', [ userExists.user_id ]);

//     return res.status(200).json({
//         status: 'success',
//          code: 200,
//          message: 'User logged in successfully',
//          data: { ...userExists, token }
//     })
// })


//Forgot Password
// app.post('/forgot_password', async(req, res)=>{
//     const {email, username} = req.body;
 

//     if (!email || !username){
//          return res.status(422).json({
//             status: 'error',
//             code: 422,
//             message: 'email, username, and newpassword are required'
//         })
//     }

//      if (!email.includes('@')) {
//         return res.status(422).json({
//             status: 'error',
//             code: 422,
//             message: 'email is invalid'
//         })
//     }
    
   
//     if (username.length < 3) {
//         return res.status(422).json({
//             status: 'error',
//             code: 422,
//             message: 'username should not be less than 3 characters'
//         })
//     }

    

//     const userDetails = await db.oneOrNone('SELECT id, email, user_name FROM blog_users WHERE email = $1 AND user_name = $2 AND is_deleted = FALSE', [ 
//         email.trim().toLowerCase(), 
//         username.trim().toLowerCase()
//     ]);
//     if (!userDetails) {
//         return res.status(401).json({
//             status: 'error',
//              code: 401,
//              message: 'Invalid email, user does not exist'
//         })
//     }
// const verificationCode = Crypto.randomInt(0, 1000000).toString().padStart(6, '7');
// const verificationCodeDuration = 10; // in minutes
// const verificationCodeExpireAt= new Date(Date.now() + verificationCodeDuration * 60 * 1000);


//     const updatedUser = await db.one(`
//         UPDATE blog_users
//           SET updated_at = NOW(),
//           status = 'active',
//           verification_code = $2,
//           verification_code_expire_at=$3 
//         WHERE email = $1
//         RETURNING id, user_id, email, password, first_name, last_name
//         ,verification_code, verification_code_expire_at`, [ email.trim().toLowerCase(), verificationCode, verificationCodeExpireAt ])

    

//     return res.status(200).json({
//         status: 'success',
//         code: 200,
//         message: 'password forgotten, new password can now be set',
//         data: updatedUser
//     })
// })

//Rest Password Endpoint
// app.patch('/reset_password', async (req, res)=>{
//     const {email, new_password, rewrite_newpassword, verificationCode} = req.body;
//     if (!email || !new_password || !rewrite_newpassword || !verificationCode){
//          return res.status(422).json({
//             status: 'error',
//             code: 422,
//             message: 'email, username, and newpassword are required'
//         })
//     }

//      if (!email.includes('@')) {
//         return res.status(422).json({
//             status: 'error',
//             code: 422,
//             message: 'email is invalid'
//         })
//     }
//      if (new_password.length < 10) {
//         return res.status(422).json({
//             status: 'error',
//             code: 422,
//             message: 'password length should not be less than 10'
//         })
//     }

//     if (!/[A-Z]/g.test(new_password) || !/[a-z]/g.test(new_password) || !/[0-9]/g.test(new_password) || !/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/g.test(new_password)) {
//         return res.status(422).json({
//             status: 'error',
//             code: 422,
//             message: 'password should contain at least one uppercase, lowercase, number and special character'
//         })
//     }

//     if (new_password !== rewrite_newpassword){
//         return res.status(422).json({
//             status:"error",
//             code:422,
//             message:"passwords don't match"
//         })
//     }
//     //password encrypt


//         const resetDetails = await db.oneOrNone('SELECT id, email, password, verification_code, verification_code_expire_at FROM blog_users WHERE email = $1 AND is_deleted = FALSE', [ 
//         email.trim().toLowerCase(),
//         verificationCode,

//     ])
//     if (!resetDetails) {
//         return res.status(401).json({
//             status: 'error',
//              code: 401,
//              message: 'Invalid email, user does not exist'
//         })
//     }
// //Comparing old password with new one
//     const validPassword = bcrypt.compareSync(new_password, resetDetails.password);
//     if (validPassword){
//             return res.status(409).json({
//                 status:'error',
//                 code:409,
//                 message:"Conflict, you can't reuse your old password"
//             })
//     }

//     if (resetDetails.verification_code_expire_at< new Date()) {
//         return res.status(401).json({
//             status: 'error',
//              code: 401,
//              message: 'Verification code has expired'
//         })
//     }

//     if (verificationCode !== resetDetails.verification_code) {
//         return res.status(401).json({
//             status: 'error',
//             code: 401,
//             message: 'Invalid verification code'
//         })
//     }
//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(new_password, salt)

//      const resetPassword = await db.one(`
//         UPDATE blog_users
//           SET updated_at = NOW(),
//           status = 'active',
//           password= $3
//         WHERE email = $1
//         RETURNING id, user_id, email, password, first_name`, [ email.trim().toLowerCase(), verificationCode, hash ])

    

//     return res.status(200).json({
//         status: 'success',
//         code: 200,
//         message: 'new password set, proceed to login',
//         data: resetPassword
//     })

// })

// app.get('/posts', async(req, res) => {
//     const blogUser = await decodeToken(req, res);
//         if(!blogUser){
//             return res.status(401).json({
//                 status:'error',
//                 code:401,
//                 message:'Unauthorized access'
//             })
//         };
//             const posts = await db.any(`SELECT * FROM blog_posts WHERE status=$1`, ['published']);
//             return res.status(200).json({
//                 status: 'success',
//                 message: 'Blog posts retrieved successfully',
//                 data: posts
//             });
// });




app.post('/posts/:post_id/comment', async(req, res, next) => {
    try {
        const post_Id= req.params.post_id
        const {comment, user_Id} = req.body;
        

        // decode the token
        const blogUser = await decodeToken(req, res);
        if(!blogUser){
            return res.status(401).json({
                status:'error',
                code:401,
                message:'Unauthorized access'
            })
        };
        
        if (!comment) {
            return res.status(422).json({
                status: 'error',
                code: 422,
                message: 'comment is required'
            })
        };
       
        const postExists = await db.oneOrNone(`SELECT id, title, content FROM blog_posts WHERE id = $1 AND status = $2`, [ post_Id, 'published' ]);
        if (!postExists) {
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: 'Post does not exist'
            })
        };

        const userExists = await db.one(`SELECT user_id, email FROM blog_users WHERE user_id=$1`, [user_Id])
            if(!userExists){
                return res.json(401)({
                    status:'error',
                    code:401,
                    message:'Unable to post comment, user does not exist'
                })
            };

        const verifiedAccount = await db.any(`SELECT id FROM blog_users WHERE user_id=$1 AND is_verified_account=$2`,[user_Id, true]);
            if(!verifiedAccount){
                return res.status(401).json({
                    status:'error',
                    code:401,
                    message:'User cannot post. Account not verified!'
                })
            };
          
        const postComment = await db.one(`
            INSERT INTO blog_post_comments 
                (post_id, user_id, comment) 
            VALUES ($1, $2, $3) RETURNING id, post_id, comment, views_count, likes_count, is_deleted, created_at
            `, [postExists.id, 
                blogUser.user_id, 
                comment.trim()

            ]);
        
        return res.status(201).json({
            status: 'success',
            code: 201,
            message: 'Comment posted successfully',
            data: postComment
        })
    } catch(err) {
        return res.status(500).json({
            status: 'error',
            code: 500,
            message: err.message
        })
    }
})

app.post('/posts/:post_id/like', async(req, res,next) => {
    try {
            const post_Id = req.params.post_id;
            const {username}= req.body;
            const {action=['like','unlike']} = req.query;
            
        
            if (!action){
                return res.status(400).json({
                    status:'error',
                    message:'Invalid action. Use ?action=like or ?action=unlike'
                })
            };

    // decode the token
            const blogUser = await decodeToken(req, res);
                if(!blogUser){
                    return res.status(401).json({
                        status:'error',
                        code:401,
                        message:'Unauthorized access'
                    })
                };

            const postExists = await db.oneOrNone(`SELECT id, title, content FROM blog_posts WHERE id = $1 AND status = $2`, [ post_Id, 'published' ]);
                if (!postExists) {
                    return res.status(400).json({
                        status: 'error',
                        code: 400,
                        message: 'Post does not exist'
                    })
                };
    
        const postLiker = await db.one(`SELECT user_id, is_verified_account FROM blog_users WHERE user_id=$1 AND is_verified_account= TRUE`,[username])
        if(!postLiker){
            return res.status(400).json({
                status:'error',
                code:400,
                message:"Unable to like comment, account not verified"
            })
        };
        // if(blog_posts.like_count>1){
        //          return res.status(400).json({
        //         status:'error',
        //         code:400,
        //         message:"Unable to like comment, account not verified"
        //     })
        // };
        const postLike = await db.one(`UPDATE blog_posts SET updated_at = NOW(), likes_count = likes_count + 1 WHERE id = $1 RETURNING id, title, content, status, likes_count, views_count`, [ post_Id ])
        const postUnlike = await db.one(`UPDATE blog_posts SET updated_at = NOW(), likes_count=likes_count - 1 WHERE id=$1 RETURNING id, title, content, status, likes_count, views_count`, [ post_Id ])
        if(action!=='like'){
            return res.status(200).json({
                status: 'success',
                code: 200,
                message: 'Post has been unliked',
                data: postUnlike
            })
        }
        // else{
             return res.status(200).json({
                status:'succes',
                code:200,
                message:'Post has been liked successfully',
                data:postLike
            })
        // };
           
            } catch (error) {
            return res.status(500).json({
                status: 'error',
                code: 500,
                message: error.message
            })
        }
})

//delete user comment

// app.delete('/posts/:post_id/:id/comment', async(req,res,next)=>{
//         try {
        
//         const {post_id, id}=req.params;
        
        // const {id}=req.query;
        // const {user_Id}= req.body;
        
        
        // decode the token
        // const blogUser = await decodeToken(req, res);
        // if(!blogUser){
        //     return res.status(401).json({
        //         status:'error',
        //         code:401,
        //         message:'Unauthorized access'
        //     })
        // };
        // if(!id){
        //     return res.status(422).json({
        //         status:'error',
        //         code:422,
        //         message:'comment_id is required'
        //     })
        // }
//        const commentBlog = await db.one(`SELECT id, user_id, comment FROM blog_post_comments WHERE id=$1 AND user_id=$2`,[id,blogUser.user_id])
//         if (!commentBlog) {
//             return res.status(422).json({
//                 status: 'error',
//                 code: 422,
//                 message: 'comment does not exist'
//             })
//         };
       
//         const postExists = await db.one(`SELECT id, title, content FROM blog_posts WHERE id = $1 AND status = $2`, [ post_id, 'published' ]);
//         if (!postExists) {
//             return res.status(400).json({
//                 status: 'error',
//                 code: 400,
//                 message: 'Post does not exist'
//             })
//         };

    

//         const verifiedAccount = await db.any(`SELECT id FROM blog_users WHERE user_id=$1 AND is_verified_account=$2`,[blogUser.user_id, true]);
//             if(!verifiedAccount){
//                 return res.status(401).json({
//                     status:'error',
//                     code:401,
//                     message:'User cannot delete comment. Account not verified!'
//                 })
//             }
            
//               const deletedComment= await db.one(
                
//                 `DELETE FROM blog_post_comments
//                  WHERE id = $1 AND post_id=$2 AND user_id=$3 `, [id, post_id, blogUser.user_id])
// ;
//                 //   if(!deletedComment){
//                 //     return res.status(400).json({
//                 //         status: 'error',
//                 //         code: 400,
//                 //         message: 'Comment failed to delete',
                    
//                 //     });
//                 // };// UPDATE blog_post_comments
//                 // SET 
//                 //   updated_at = NOW(), 
//                 //   deleted_at= NOW(),
//                 //   is_deleted= true,
//                 //   comment= NULL
//              if(!deletedComment){
//                 return res.status(400).json({
//                         status:'error',
//                         code:400,
//                         message:'Comment unable to be deleted successfully',
//                         data:blogUser.user_id
//                })
//              };
//               return res.status(200).json({
//                         status:'success',
//                         code:200,
//                         message:'Comment deleted successfully',
//                         data:blogUser.user_id
//                })
               
 
      
//     } catch(err) {
//         return res.status(500).json({
//             status: 'error',
//             code: 500,
//             message: err.message
//         })
//     }

// });

//Admin Author Control Station

app.post('/create_authors', async(req,res)=>{
    try{
    const author_id = uuidv4();
    const {name, email, image_url, bio} = req.body;
        if (!name || !email){
            return res.status(422).json({
            status: 'error',
            message: 'You need to put in name or email'
            });
        };
        const blogUser = await decodeToken(req, res);
        if(!blogUser){
            return res.status(401).json({
                status:'error',
                code:401,
                message:'Unauthorized access'
            })
        };
    const actualAdmin=await db.any(`SELECT user_name, user_type, status FROM blog_users WHERE user_type=$1 AND status=$2`,['admin','active']);
    if (!actualAdmin){
        return res.status(401).json({
            status:'error',
            code:401,
            message:'unauthorized access'
        })
    }
    
    
    const authors = await db.oneOrNone(`SELECT name, email FROM authors WHERE name=$1 AND email=$2`,[name, email])
    if(authors){
        return res.status(400).json({
            status:'error',
            code:401,
            message:'author already present'
        })
    }else{
            const newAuthor= await db.one(`INSERT INTO authors (author_id, name, email, image_url, bio) VALUES ($1, $2, $3, $4,$5) RETURNING author_id, name, email, image_url, bio`, 
        [author_id, name, email, image_url, bio]);

            return res.status(200).json({
                status:'success',
                code:200,
                message:'New author added successfully',
                data:newAuthor
            })
        }
        
    }catch(err) {
        return res.status(500).json({
            status: 'error',
            code: 500,
            message: err.message
        })
    }
})

//edit blog_author
app.patch('/edit_author', async(req, res,next)=>{
    try{
        const {author_id, name, email, image_url, bio}=req.body;
        if(!author_id||!name ||!email){
            return res.status(422).json({
                status:'error',
                code:422,
                message:'Please input the name and email'
            })
        };

        const blogUser = await decodeToken(req, res);
        if(!blogUser){
            return res.status(401).json({
                status:'error',
                code:401,
                message:'Unauthorized access'
            })
        };

        const actualAdmin=await db.any(`SELECT user_id, user_name, user_type, status FROM blog_users WHERE user_id=$1 AND user_type=$2 AND status=$3`,[blogUser.user_id,'admin','active']);
                if (!actualAdmin){
                return res.status(401).json({
                    status:'error',
                    code:401,
                    message:'unauthorized access'
                })
            };

        const authors = await db.one(`SELECT author_id FROM authors WHERE author_id=$1 AND is_deleted=$2`,[author_id, false])
            if(!authors){
                return res.status(400).json({
                    status:'error',
                    code:401,
                    message:'author does not exist'
                })
    }
        const updateAuthor= await db.one(`UPDATE authors SET updated_at=NOW(), name=$2, email=$3, image_url=$4, bio=$5 WHERE author_id=$1 RETURNING author_id, name, email, image_url, bio`, 
            [author_id, name, email, image_url, bio]);
        const newProfile= await db.any(`SELECT author_id, name, email, image_url, bio FROM authors WHERE author_id=$1`,[updateAuthor.author_id])
            if(!newProfile){
                return res.status(400).json({
                    status:'success',
                    code:400,
                    message:'Author profile edit not successful',

                })
            }
                return res.status(200).json({
                    status:'success',
                    code:200,
                    message:'Author profile edited successfully',
                    data:newProfile

                })
                
    

    }catch(err){
        return res.status(500).json({
            status:'error',
            code:500,
            message:err.message
        })
    }
})

//delete author
app.delete('/delete_author', async(req,res,next)=>{
        try {
            
        const {author_id}=req.body;
        
        // const {id}=req.query;
        // const {user_Id}= req.body;
        const{action=['remove', 'delete']}=req.query;
        if(!action){
            return res.status(400).json({
                status:'error',
                code:400,
                message:'action required'
            })
        }
        
        // decode the token
        const blogUser = await decodeToken(req, res);
        if(!blogUser){
            return res.status(401).json({
                status:'error',
                code:401,
                message:'Unauthorized access'
            })
        };
        
        const actualAdmin=await db.any(`SELECT user_id, user_name, user_type, status FROM blog_users WHERE user_id=$1 AND user_type=$2 AND status=$3`,[blogUser.user_id,'admin','active']);
                if (!actualAdmin){
                return res.status(401).json({
                    status:'error',
                    code:401,
                    message:'unauthorized access'
                })
            };

        const authors = await db.oneOrNone(`SELECT name, email FROM authors WHERE author_id=$1`,[author_id])
            if(!authors){
                return res.status(400).json({
                    status:'error',
                    code:401,
                    message:'author does not exist'
                })
            }

            if(action==='remove'){
                const removeAuthor= await db.one(
                    `UPDATE authors
                    SET
                    name='' ,
                    email='' ,
                    image_url=NULL,
                    bio=NULL,
                    is_deleted=$2,
                    deleted_at=NOW()
                    WHERE author_id=$1
                    `
                    ,[author_id, true]);
            const grabAuthor = await db.one(`SELECT deleted_at, author_id FROM authors WHERE author_id=$1`,[author_id])
            if (removeAuthor){
                return res.status(400).json({
                    status:'error',
                    code:400,
                    message:'Author removed successfully',
                    data:grabAuthor
                })
            }
            }else{
                if(action==='delete'){
                            
            }
             const deletedAuthor= await db.one(
                
                `DELETE FROM authors
                WHERE author_id=$1`, [author_id]);
            const remnantAuthor=await db.one(`SELECT author_id, is_deleted, deleted_at FROM authors`)
             if(!deletedAuthor){
                return res.status(400).json({
                        status:'error',
                        code:400,
                        message:'Author unable to be deleted'
                       })
             };
              return res.status(200).json({
                        status:'success',
                        code:200,
                        message:'Author deleted successfully',
                        data:remnantAuthor
    
               })
            }
    
            }catch(err){
                    return res.status(500).json({
                    status:'error',
                    code:500,
                    message:err.message
                })
            };
        });



app.get('/fetch_author', async(req,res)=>{
    try{

        const blogUser = await decodeToken(req, res);
        if(!blogUser){
            return res.status(401).json({
                status:'error',
                code:401,
                message:'Unauthorized access'
            })
        };

        const actualAdmin=await db.any(`SELECT user_id, user_name, user_type, status FROM blog_users WHERE user_id=$1 AND user_type=$2 AND status=$3`,[blogUser.user_id,'admin','active']);
            if (!actualAdmin){
                return res.status(401).json({
                    status:'error',
                    code:401,
                    message:'unauthorized access'
                })
            };
            const getAuthors= await db.any(`SELECT * FROM authors WHERE is_deleted=$1`,[false])   
            if(!getAuthors){
                return res.status(400).json({
                status: 'success',
                message: 'Authors profile could not be retrieved successfully',
            
            });
            }
            return res.status(200).json({
                status: 'success',
                message: 'Authors profile retrieved successfully',
                data: getAuthors
            });
            
            }catch(err){
         return res.status(500).json({
                    status:'error',
                    code:500,
                    message:err.message
    })
}

})
//create blog_posts
// app.post('/create_posts', async(req,res)=>{
//     try{
//         const blogUser = await decodeToken(req, res);
//         if(!blogUser){
//             return res.status(401).json({
//                 status:'error',
//                 code:401,
//                 message:'Unauthorized access'
//             })
//         };

//         const actualAdmin=await db.any(`SELECT user_id, user_name, user_type, status FROM blog_users WHERE user_id=$1 AND user_type=$2 AND status=$3`,[blogUser.user_id,'admin','active']);
//             if (!actualAdmin){
//                 return res.status(401).json({
//                     status:'error',
//                     code:401,
//                     message:'unauthorized access'
//                 })
//             };

//         const { title, content, author, category, tags, images } = req.body;
//             if (!title || !content || !author) {
//                 return res.status(422).json({
//                 status: 'error',
//                 message: 'Title, content and author are required'
//                 });
//             }

//             if (images && !Array.isArray(images)) {
//                 return res.status(422).json({
//                 status: 'error',
//                 message: 'Images must be an array'
//                 })
//             }

//             if (images && images.length < 1) {
//                 return res.status(422).json({
//                 status: 'error',
//                 message: 'Images must contain at least one image'
//                 })
//             }

//         const newPost = await db.one('INSERT INTO blog_posts (title, content, category, author, status, tags, images) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', 
//             [ title.trim(), content.trim(), parseInt(category), author, 'unpublished', tags ? tags.split(', ') : [], images ?? [] ])
//         if(!newPost){
//             return res.status(401).json({
//             status: 'error',
//             message: 'Post cannot created',

//         })
//         }  
        // const updatePost = await db.one(
        //     `UPDATE blog_posts
        //     SET status=$2,
        //     isPublished=true WHERE id=$1 RETURNING *`,[newPost.id, 'published']
        // )
//         return res.status(201).json({
//             status: 'success',
//             message: 'Post created successfully',
//             data: newPost
//         })


//     }catch(err){
//         return res.status(500).json({
//                 status:'error',
//                 code:500,
//                 message:err.message
//             })
//     }
// })

app.patch('/edit_posts/:post_id', async (req,res)=>{
    try{
        const postId = req.params.post_id;
        const {allowedStatuses=[ 'published', 'unpublished']}= req.query;
        const {title, content, author}= req.body;
               
        const blogUser = await decodeToken(req, res);
        if(!blogUser){
            return res.status(401).json({
                status:'error',
                code:401,
                message:'Unauthorized access'
            })
        };

        const actualAdmin=await db.any(`SELECT user_id, user_name, user_type, status FROM blog_users WHERE user_id=$1 AND user_type=$2 AND status=$3`,[blogUser.user_id,'admin','active']);
            if (!actualAdmin){
                return res.status(401).json({
                    status:'error',
                    code:401,
                    message:'unauthorized access'
                })
            };

        const existingPost = await db.oneOrNone('SELECT * FROM blog_posts WHERE id = $1', [ postId ]);
            if (!existingPost) {
                return res.status(400).json({
                status: 'error',
                message: 'Post does not exist'
                })
            };
            if(!allowedStatuses){
             const setDefault=(
                `UPDATE blog_posts 
                SET status=$2,
                isPublished=$3,
                author=$4,
                title=$5,
                content=$6
                WHERE id=$1
                `,[postId,'draft', false, existingPost.author, existingPost.title, existingPost.content])
            return res.status(200).json({
                status:'OK',
                code:200,
                message:'Post set as draft',
                data:setDefault
            })
        } 
            if (allowedStatuses === existingPost.status) {
            return res.status(400).json({
            status: 'error',
            message: `This post is already ${existingPost.status}`
            })
        };

        if (allowedStatuses === 'unpublished' && existingPost.status !== 'published') {
            return res.status(400).json({
            status: 'error',
            message: 'You can only unpublish a published post'
            })
        };
        if(allowedStatuses){
            const updatedPostStatus = await db.oneOrNone(`
                UPDATE blog_posts 
                SET 
                updated_at = NOW(),
                status = $2,
                is_deleted = false,
                archived_at = NULL,
                title = $3,
                content = $4,
                author = $5
                WHERE id = $1
                RETURNING id, title, content, author, category, status, tags, images, created_at, updated_at
                `, [ postId, allowedStatuses, title, content, author]);
                return res.status(200).json({
                status: 'success',
                message: `Post ${allowedStatuses} successfully`,
                data: updatedPostStatus
                });

            }
    

    }catch(err){
        return res.status(500).json({
            status:'error',
            code:500,
            message:err.message
        })
    }
})

app.delete('/delete_post/:post_id', async(req,res)=>{
        try {
            
        const postId =req.params.post_id;
        
        // const {id}=req.query;
        // const {user_Id}= req.body;
        
        // decode the token
        const blogUser = await decodeToken(req, res);
        if(!blogUser){
            return res.status(401).json({
                status:'error',
                code:401,
                message:'Unauthorized access'
            })
        };
        
        const actualAdmin=await db.any(`SELECT user_id, user_name, user_type, status FROM blog_users WHERE user_id=$1 AND user_type=$2 AND status=$3`,[blogUser.user_id,'admin','active']);
                if (!actualAdmin){
                return res.status(401).json({
                    status:'error',
                    code:401,
                    message:'unauthorized access'
                })
            };

            const existingPost = await db.any('SELECT * FROM blog_posts WHERE id= $1', [ postId ]);
            if (!existingPost) {
                return res.status(400).json({
                status: 'error',
                message: 'Post does not exist'
                })
            };
           
            const removeBlog= await db.one(
                    `UPDATE blog_posts
                    SET 
                    title = '',
                    content = '',
                    is_deleted = $2
                    WHERE id=$1
                    `
                    ,[postId, true]);
          
            if(!removeBlog){
                return res.status(400).json({
                    status:'error',
                    code:400,
                    message:'Unable to delete post'
                })
            }
            return res.status(200).json({
                status:'success',
                code:200,
                message:'Post successfully deleted',
                data:removeBlog.author_id
            })
    
            }catch(err){
                    return res.status(500).json({
                    status:'error',
                    code:500,
                    message:err.message
                })
            };
        });

async function decodeToken (req, res) {
    try {
        let token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                status: 'error',
                code: 401,
                message: 'Please provide a token'
            })
        }

        if (!token.startsWith('Bearer ')) {
        return res.status(401).json({
            status: 'error',
            code: 401,
            message: 'Invalid token sent'
        })
        }

        if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const blogUser = await db.oneOrNone('SELECT id, user_id, email, user_name, first_name, last_name, is_verified_account, status, created_at FROM blog_users WHERE user_id = $1 AND is_deleted = FALSE', [ decodedToken.user_id ]);
        if (!blogUser) {
            return res.status(401).json({
                status: 'error',
                code: 401,
                message: 'Invalid token'
            })
        }
        const errorMessage = blogUser.status === 'inactive' ? 'User account is inactive, kindly verify your account in your email, or request another verification' :
            `User account is ${blogUser.status}, kindly contact support team`;

        if (blogUser && blogUser.status !== 'active') {
            return res.status(401).json({
                status: 'error',
                code: 401,
                message: errorMessage
            })
        }
        return blogUser;
    } catch (error) {
        if (error.message) {
            if (error.message.trim().toLowerCase() === 'jwt expired') {
                return res.status(401).json({
                    status: 'error',
                    code: 401,
                    message: 'Session timeout'
                })
            }
            return res.status(401).json({
                status: 'error',
                code: 401,
                message: error.message
            })
        }
    }
}



// Error Handlers
// 404 Error Handling
app.use((_req,res) => {
  res.status(404).json({
    status: 'error',
    message: 'Resource not found'
  })
});

// internal server error, Error Handling
app.use((_req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Ooooops! Something broke somewhere, we will look into it, contact us'
  })
})

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
});
