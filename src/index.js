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
// import { v4 as uuidv4 } from 'uuid';
// import fileUpload from 'express-fileupload';
// import {v2 as cloudinary} from 'cloudinary';
import path from 'path';
import { fileURLToPath } from 'url';
// import multer from 'multer';
import fs from 'fs';
// import {upload} from './multer.js';
import routes from "./routes/index.js"
import loggerInit from './config/logger/index.js'

const app = express();
let logger;

  switch (app.get('env')) {
  case 'development':
    logger = loggerInit('development');
    break;

  case 'production':
    logger = loggerInit('production');
    break;

  case 'test':
    logger = loggerInit('test');
    break;

  default:
    logger = loggerInit();
  }

  global.logger = logger;
  
logger.info
(`${new Date().toISOString()} Application starting...`);
  logger.debug('Overriding \'Express\' logger');
  
logger.info
(`${new Date().toISOString()} Environment is ${process.env.NODE_ENV}`); 

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
