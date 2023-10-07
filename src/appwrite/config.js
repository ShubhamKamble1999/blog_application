import config from '../config/config'
import { Client, Databases, ID, Query } from "appwrite";

export class DB_Service{
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appWriteUrl)
            .setProject(config.appwriteProjectId);

        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({title,slug,content,featuredImage,status,userId}) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug, // can use ID.unique id
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("APPWRITE_DB_ERROR_LOG : ",error);
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug, // can use ID.unique id
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("APPWRITE_DB_ERROR_LOG : ",error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug, // can use ID.unique id
            )
            return true
        } catch (error) {
            console.log("APPWRITE_DB_ERROR_LOG : ",error);
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug, // can use ID.unique id
            )
        } catch (error) {
            console.log("APPWRITE_DB_ERROR_LOG : ",error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status","active")]) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries, // can use ID.unique id
            )
        } catch (error) {
            console.log("APPWRITE_DB_ERROR_LOG : ",error);
            return false
        }
    }

    // MAKE A DIFFERENT SERVICE 
    
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

}

const service = new DB_Service();

export default service