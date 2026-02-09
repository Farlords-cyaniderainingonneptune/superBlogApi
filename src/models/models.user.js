import db from "../config/db/index.js";
import queries from "../queries/queries.user.js"
export const expressFileUpload= async(data)=>{
      const { userId, 
        file_url, 
        usedBy,
        type,
        mimeType, 
        size, 
        cloudinaryId }=data

    const mediaUpload= await db.oneOrNone(queries.uploadFile,[userId, 
        file_url, 
        usedBy,
        type, 
        mimeType, 
        size, 
        cloudinaryId])
    return mediaUpload;

}
export const multipleUpload= async(data)=>{
      const { userId, 
        file_url, 
        usedBy,
        type,
        mimeType, 
        size, 
        cloudinaryId }=data

    const mediaUpload= await db.many(queries.uploadFile,[userId, 
        file_url, 
        usedBy,
        type, 
        mimeType, 
        size, 
        cloudinaryId])
    return mediaUpload;

}
export const fetchMediaFile= async(user_id)=>{
    const mediaFile= await db.oneOrNone(queries.fetchFilebyUser,[user_id])
    return mediaFile;
}
