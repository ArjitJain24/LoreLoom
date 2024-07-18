import config from "../config/config";
import { Databases, Storage, ID, Client, Query } from "appwrite";

export class FileService {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl) // API endpoint
      .setProject(config.appwriteProjectId); // project ID

    // create a database and storage
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  // FILE UPLOAD SERVICES
  //   upload a file on our storage
  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite Service :: uploadFile :: error", error);
      return false;
    }
  }

  //   delete a file
  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(config.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite Service :: deleteFile :: error", error);
      return false;
    }
  }

  //   preview  a file-> no need to make it async await as response is very fast(documentation mai use nahi kiya)
  getFilePreview(fileId) {
    return this.storage.getFilePreview(config.appwriteBucketId, fileId);
  }
}

const fileService = new FileService();

export default fileService;
