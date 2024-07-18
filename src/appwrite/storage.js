import config from "../config/config";

import { Client, ID, Databases, Storage, Query } from "appwrite";

export class StorageService {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(config.appwriteURL) // API endpoint
      .setProject(config.appwriteProjectID); // project ID

    // create a database and storage
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  // creating a post in our app
  async createPost({ title, slug, content, featuredImage, status, userID }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseID,
        config.appwriteCollectionID,
        slug, // document ID
        {
          title,
          content,
          featuredImage,
          status,
          userID,
        }
      );
    } catch (error) {
      console.log("Apprwrite Service :: createPost :: error", error);
    }
  }

  //   updating our post
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseID,
        config.appwriteCollectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Apprwrite Service :: updatePost :: error", error);
    }
  }

  //   deleting our post
  async deletePost(slug) {
    try {
      await this.deleteDocument(
        config.appwriteDatabaseID,
        config.appwriteCollectionID,
        slug
      );
      return true;
    } catch (error) {
      console.log("Apprwrite Service :: deletePost :: error", error);
      return false;
    }
  }

  //   get a post based on document ID provided
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseID,
        config.appwriteCollectionID,
        slug
      );
    } catch (error) {
      console.log("Appwrite Service :: getPost :: error", error);
      return false;
    }
  }

  //   get all posts whose status is active(status is our index so queries can only be applied on index)
  //   We created status as index on appwrite UI
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseID,
        config.appwriteCollectionID,
        queries
      );
    } catch (error) {
      console.log("Appwrite Service :: getPosts :: error", error);
      return false;
    }
  }
}

const storageService = new StorageService();

export default storageService;
