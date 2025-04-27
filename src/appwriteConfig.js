// src/appwriteConfig.js
import { Client, Account } from 'appwrite';

const appwrite = new Client();
appwrite
  .setEndpoint('https://cloud.appwrite.io/v1') // Use your Appwrite endpoint
  .setProject('680db660001e3cdf637b'); // Your project ID

export const account = new Account(appwrite);
export default appwrite;
