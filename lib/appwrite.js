import { Client, Account, Avatars, Databases, ID } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.app.aora",
  projectId: "66d43f1b0027817220d8",
  databaseId: "66d440b600135f17d858",
  userCollectionId: "66d44119001747c7d7a9",
  videoCollectionId: "66d4418f00330523756e",
  storageId: "66d44471001821a91626",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
  try {
    const newAcccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAcccount) throw Error;

    const avatarUrl = avatars.getInitials(username);
    await signIn(email, password);

    const newUser = await databases.createDocumnet(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAcccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export async function signIn(email, password) {
  try {
    const session = await account.createEmailSession(email, password);
  } catch (error) {
    throw new Error(error);
  }
}
