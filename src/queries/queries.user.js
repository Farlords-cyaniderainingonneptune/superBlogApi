export default{
    uploadFile:`
    INSERT INTO media_uploads (
            uploaded_by, 
            file_url, 
            used_by, 
            type, 
            mime_type, 
            size, 
            cloudinary_public_id
        ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) 
        RETURNING *;
    `
}
