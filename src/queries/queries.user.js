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
        SELECT id, uploaded_by, file_url, type, size from media_uploads WHERE uploaded_by= $1
        ORDER BY created_at DESC
        OFFSET $2
        LIMIT $3
    `,
    fetchFilebyType:`
        SELECT id, uploaded_by, file_url, type, size, mime_type from media_uploads WHERE type= $1
        ORDER BY created_at DESC
        OFFSET $2
        LIMIT $3
    `,
    deleteFile:`
        DELETE FROM media_uploads WHERE uploaded_by= $1 AND is_deleted= 'false'
    `,
     fetchFileCounts:`SELECT COUNT(id) FROM media_uploads WHERE uploaded_by=$1 AND is_deleted=$2`
}
