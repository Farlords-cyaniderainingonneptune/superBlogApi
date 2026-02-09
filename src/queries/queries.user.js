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
    `,
    fetchFilebyUser:`
        SELECT file_url, type, size from media_uploads WHERE uploaded_by= $1
    `,
    fetchFilebyType:`
        SELECT file_url, type, size, mime_type from media_uploads WHERE uploaded_by= $1
    `,
    deleteFile:`
        DELETE FROM media_uploads WHERE uploaded_by= $1 AND is_deleted= 'false'
    `,
}
