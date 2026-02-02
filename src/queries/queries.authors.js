export default{
    checkIfAuthorExistsByNameAndEmail:`
        SELECT name, email FROM authors WHERE name=$1 AND email=$2
    `,
    createAuthors:`
       INSERT INTO authors (author_id, name, email, image_url, bio) VALUES ($1, $2, $3, $4,$5) RETURNING author_id, name, email, image_url, bio 
    `,
    checkIfAuthorExistsById:`
      SELECT author_id, name, email FROM authors WHERE author_id=$1 AND is_deleted=$2  
    `,
    updateAuthor:`
      UPDATE authors SET updated_at=NOW(), 
      name=$2, email=$3, image_url=$4, bio=$5 
      WHERE author_id=$1 
      RETURNING author_id, name, email, image_url, bio  
    `,
    removeAuthor:`
        UPDATE authors
        SET
        name= '' ,
        email= '' ,
        image_url= NULL,
        bio= NULL,
        is_deleted= $2,
        deleted_at= NOW()
        WHERE author_id= $1
    `,
    deleteAuthor:`
      DELETE FROM authors
      WHERE author_id= $1
    `,
    fetchAuthors:`
    SELECT * FROM authors 
    WHERE is_deleted= false
    `
}
