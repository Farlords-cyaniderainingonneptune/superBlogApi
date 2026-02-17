import db from '../config/db/index.js';
import * as Helpers from '../utils/utils.helpers.js'
import * as postModel from '../models/models.post.js';
import * as authModel from '../models/models.auth.js';
import * as authController from './controllers.auth.js';
// import verifyToken from '../middlewares/middlewares.auth.js'
import redisClient from '../config/redis/index.js';

export const fetchPosts = async(req, res) => {
    console.log(redisClient)
    try{
    const {query}= req;
    if(parseInt(query.per_page)> 100){
        return res.status(422).json({
        status: 'error',
        code: 422,
        message: 'Unprocessable entity, kindly check your per_page'
    });
};
const { offset, limit } = Helpers.paginationOffsetLimit(query);
    const cacheKey = 'posts:all';
    const cachedPosts = await redisClient.get(cacheKey);
    if (cachedPosts){
        return res.json({
            source:'cache',
            data:JSON.parse(cachedPosts),
            count:cachedPosts.length
        });
    }
    const keys = await redisClient.keys('posts:all');
    if (keys.length> 0){
        await redisClient.del(keys);
    }
  const posts = await postModel.fetchPosts(offset, limit);
  const totalPosts = await postModel.fetchPostsCount();

  const totalPostsCount = parseInt(totalPosts.count);
  const totalPages = Helpers.paginationTotalPages(totalPostsCount, limit);
    await redisClient.setEx(
        cacheKey,
        3600,
        JSON.stringify(posts)
    );
  return res.status(200).json({
    status: 'success',
    message: 'Blog posts retrieved successfully',
    source:'database',
    data: {
      page: parseInt(query.page) || 1,
      total_count: totalPostsCount,
      total_pages: parseInt(totalPages),
      posts
    },
    count:posts.length
  });
}catch(err){
    return res.status(500).json({
            status: 'error',
            code: 500,
            message: err.message
        })
}
   
};

export const createPost = async(req,res)=>{
    try{
            const userID= req.user.user_id;
            const actualAdmin= await postModel.checkIfActualAdmin(userID)
             if(!actualAdmin){
                return res.status(401).json({
                    status:'error',
                    message:'Unauthorized access'
                })
            };
         const { title, content, author, category, tags, images } = req.body;
            if (!title || !content || !author) {
                return res.status(422).json({
                status: 'error',
                message: 'Title, content and author are required'
                });
            }

            if (images && !Array.isArray(images)) {
                return res.status(422).json({
                status: 'error',
                message: 'Images must be an array'
                })
            }

            if (images && images.length < 1) {
                return res.status(422).json({
                status: 'error',
                message: 'Images must contain at least one image'
                })
            }

            // const actualAuthor= await postModel.checkIfAuthor(author)
            // if(!actualAuthor){
            //     return res.status(401).json({
            //         status:'error',
            //         message:'Such an author does not exists'
            //     })
            // };

            const newPost = await postModel.createPost(title, content, author, category, tags, images );
            return res.status(200).json({
            status: 'success',
            message: 'post created successfully',
            data: newPost
    });
    } catch(err) {
        return res.status(500).json({
            status: 'error',
            code: 500,
            message: err.message
        })
    }


};

export const commentOnPost = async(req, res) => {
    try {
        const comment= req.body;
        const postId= req.params.postId;
        const userId= req.user.user_id;
        
        if (!comment) {
            return res.status(422).json({
                status: 'error',
                code: 422,
                message: 'comment is required'
            })
        }

        const postComment = await postModel.postComment(postId, userId, comment);
        
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
};

export const likeUnlikePost = async(req, res) => {
    try {
        const postId= req.params.postId;
        const {action=['like','unlike']}= req.query
        const username= req.user.user_name;

        if (!action) {
            return res.status(422).json({
                status: 'error',
                code: 422,
                message: 'action query parameter is required and must be either like or unlike'
            })
        }
        // if (action === 'like') {
        //     const post= await postModel.likeUnlikePost(postId, action);
        // }else{
        //    const post= await postModel.likeUnlikePost(postId, action);
        // }
        const post = await postModel.likeUnlikePost(postId,action);

        const actionDecision = action === 'like' ? 'liked' : 'unliked';

        return res.status(200).json({
            status: 'success',
            code: 200,
            message: `Post ${actionDecision} successfully by ${username}`,
            data: post
        })
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            code: 500,
            message: error.message
        })
    }
};

export const deleteComment = async(req,res) => {
    try{
        const postId= req.params.postId;
        const id= req.params.id;
        const user_id= req.user.user_id

        const comment= await postModel.commentExists( id, postId, user_id)
        if(!comment){
            return res.status(404).json({
                status:'error',
                code:404,
                message:'comment not found'
            });
        }

        const deletedComment= await postModel.deleteComment(id, postId, user_id);
        // if(!deletedComment){
        //     return res.status(401).json({
        //         status:'error',
        //         message:'unable to delete post'
        //     })
        // }
        return res.status(200).json({
            status:'ok',
            message:`Post deleted successfully`
        })
    }catch(err) {
        return res.status(500).json({
            status: 'error',
            code: 500,
            message: err.message
        })
    }
};

export const editPost = async(req,res)=>{
    try{
        const postId = req.params.postId;
        const {status=[ 'published', 'unpublished']}= req.query;
        const {title, content, author}= req.body
        if(!title||!content||!author){
            return res.status(422).json({
                status:'error',
                message:'Please make changes to the title, content and author'
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
            const postExists= await postModel.postExists(postId)
            if(!postExists){
                return res.status(401)({
                    status:'error',
                    message:'post does not exist'
                })
            }
             if(!status){
                const setDefault= await postModel.setDefault(postId, author, title, content )
                return res.status(200)({
                    status:'success',
                    message:'post set as draft',
                    data:setDefault
                })
             }
           
            if (status === postExists.status) {
            return res.status(400).json({
            status: 'error',
            message: `This post is already ${postExists.status}`
            })
        };
        if (postExists.status !== 'published' && status==='unpublished') {
            return res.status(400).json({
            status: 'error',
            message: 'You can only unpublish a published post'
            })
        };
        
        if(status==='published'){
            const updatePost= await postModel.updatePostStatus(postId, title, content, author, status, true)
            return res.status(200).json({
                status:'success',
                message:'Post published successfully',
                data:updatePost
            })
        }
        if(status==='unpublished'){
            const updatePost= await postModel.updatePostStatus(postId, title, content, author, status, false)
            return res.status(200).json({
                status:'success',
                message:'Post unpublished successfully',
                data:updatePost
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

export const deletePost = async(req,res)=>{
    try{
       const postId =req.params.postId;
      const userID= req.user.user_id;
        const actualAdmin= await postModel.checkIfActualAdmin(userID)
        if(!actualAdmin){
            return res.status(401).json({
                status:'error',
                message:'Unauthorized access'
            })
        }; 
        const removeBlogPost= await postModel.deletePost(postId)
        return res.status(200).json({
            status:'success',
            message:'post deleted successfully',
            data:removeBlogPost
        })
    }catch(err) {
        return res.status(500).json({
            status: 'error',
            code: 500,
            message: err.message
        })
    }
}