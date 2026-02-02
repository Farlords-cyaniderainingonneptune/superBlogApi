import db from "../config/db/index.js";
import queries from "../queries/queries.authors.js"

export const checkIfAuthorExistsByNameAndEmail= async(name, email)=>{
    const actualAuthor= await db.oneOrNone(queries.checkIfAuthorExistsByNameAndEmail, [name, email])
    return actualAuthor;
};

export const createAuthors= async(author_id, name, email, image_url, bio)=>{
    const newAuthor= await db.oneOrNone(queries.createAuthors, [author_id, name, email, image_url, bio])
    return newAuthor;
}
export const checkIfAuthorExistsById= async(author_id)=>{
    const authorExists= await db.oneOrNone(queries.checkIfAuthorExistsById, [author_id, false ])
    return authorExists;
}
export const updateAuthor= async(author_id, name, email, image_url, bio)=>{
    const newAuthor= await db.oneOrNone(queries.updateAuthor, [author_id, name, email, image_url, bio])
    return newAuthor;
}
export const removeAuthor= async(author_id)=>{
    const dropAuthor= await db.oneOrNone(queries.removeAuthor, [author_id, true])
    return dropAuthor;
}

export const deleteAuthor= async(author_id)=>{
    const deletedAuthor= await db.oneOrNone(queries.deleteAuthor, [author_id])
    return deletedAuthor;
}
export const fetchAuthors= async()=>{
    const getAuthors= await db.any(queries.fetchAuthors)
    return getAuthors;
}
