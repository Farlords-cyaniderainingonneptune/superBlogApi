import { v4 as uuidv4 } from 'uuid'
import * as authModel from '../models/models.auth.js';
import * as Hash from '../utils/utils.hash.js';
import * as Helpers from '../utils/utils.helpers.js';
import sendMail from '../services/emails.js';
import * as postModel from '../models/models.post.js';
import * as authorModel from '../models/models.authors.js';

export const createAuthor= async(req, res)=>{
    try{
    const author_id = uuidv4();
    const {name, email, image_url, bio} = req.body;
        if (!name || !email){
            logger.info(`timestamp===>>>:::${new Date().toISOString()}, Info:Reassessing logger`)
            return res.status(422).json({
            status: 'error',
            message: 'You need to put in name or email'
            });
        };

        const userID= req.user.user_id;
        const actualAdmin= await postModel.checkIfActualAdmin(userID)
            if(!actualAdmin){
                return res.status(401).json({
                    status:'error',
                    message:'Unauthorized access'
                })
            };
        const actualAuthor= await authorModel.checkIfAuthorExistsByNameAndEmail(name, email);
        if(actualAuthor){
            return res.status(409)({
                status:'error',
                message:'Author already exists'
            })
        }
        const createAuthor= await authorModel.createAuthors(author_id, name, email, image_url, bio)
         return res.status(200).json({
                status:'success',
                code:200,
                message:'Author profile created successfully',
                data:createAuthor
            });
    }catch(err) {
        return res.status(500).json({
            status: 'error',
            code: 500,
            message: err.message
        })
    }
}
export const updateAuthorProfile= async(req,res)=>{
    try{
        const {author_id, name, email, image_url, bio}=req.body;
        if(!author_id||!name ||!email){
            return res.status(422).json({
                status:'error',
                code:422,
                message:'Please input the id, name and email'
            })
        };
         const userID= req.user.user_id;
        const actualAdmin= await postModel.checkIfActualAdmin(userID)
            if(!actualAdmin){
                return res.status(401).json({
                    status:'error',
                    message:'Unauthorized access'
                })
            };
        const actualAuthor= await authorModel.checkIfAuthorExistsById(author_id);
        if(!actualAuthor){
            return res.status(400)({
                status:'error',
                message:'Author does not exists'
            })
        }
        const updateAuthor= await authorModel.updateAuthor(author_id, name, email, image_url, bio)
         return res.status(200).json({
                status:'success',
                code:200,
                message:'Author profile update successfully',
                data:updateAuthor
            }); 
    }catch(err) {
        return res.status(500).json({
            status: 'error',
            code: 500,
            message: err.message
        })
    }
}

export const deleteAuthorProfile= async(req,res)=>{
    try{
   const {author_id}= req.body;
   const {action=['remove', 'delete']}= req.query;
    if(!action){
            return res.status(400).json({
                status:'error',
                code:400,
                message:'action required'
            })
        }
    const userID= req.user.user_id;
        const actualAdmin= await postModel.checkIfActualAdmin(userID)
        if(!actualAdmin){
            return res.status(401).json({
                status:'error',
                message:'Unauthorized access'
            })
        };
    const actualAuthor= await authorModel.checkIfAuthorExistsById(author_id);
    if(!actualAuthor){
        return res.status(400).json({
            status:'error',
            message:'Author does not exists'
         })
    }
    if(action==='remove'){
        const removeAuthor = await authorModel.removeAuthor(author_id);
        return res.status(200).json({
            status:'success',
            message:`Author profile for ${author_id} removed successfully`

        });
    }if(action==='delete'){
        const deleteAuthor= await authorModel.deleteAuthor(author_id)
        return res.status(200).json({
            status:'success',
            message:`Author profile deleted successfully`

        })
    }
}catch(err) {
        return res.status(500).json({
            status: 'error',
            code: 500,
            message: err.message
        })
    }
}

export const fetchAuthors= async(req,res)=>{
    try{
   const userID= req.user.user_id;
        const actualAdmin= await postModel.checkIfActualAdmin(userID)
        if(!actualAdmin){
            return res.status(401).json({
                status:'error',
                message:'Unauthorized access'
            })
        }; 

        const getAuthors= await authorModel.fetchAuthors()
        return res.status(200).json({
            status:'success',
            message:'Authors retrieved successfully',
            data:getAuthors
        })
    }catch(err) {
        return res.status(500).json({
            status: 'error',
            code: 500,
            message: err.message
        })
    }
}