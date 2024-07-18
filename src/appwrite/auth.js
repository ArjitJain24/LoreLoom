// to access environment variables
import config from "../config/config";

// to access appwrite authentication methods(copy from documentation)
import { Client, Account, ID } from "appwrite";

// creating a class so that we can create a wrapper for our backend bcoz if we want to use some different backend in the future like firebase or our own backend then instead of changing everything everywhere we just change this file .
export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  // now everywhere we use the object.createAccount and it doesnt care what is happening under the hood so in future if we replace appwrite with other backend the inside functionality of createAccount but to create account we still use createAccount so a good practice
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // call another method(if user account is created then sath hi sath login bhi karvado)
        return this.login({ email, password });
      } else {
        // account nahi bana
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  // get the currently logged in user
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
    }
    // if not able to find account
    return null;
  }

  async logout() {
    try {
      // deleting all the sessions
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service :: logout :: error", error);
    }
  }
}

// initializing an object with this class
const authService = new AuthService();

// exporting that object
export default authService;
