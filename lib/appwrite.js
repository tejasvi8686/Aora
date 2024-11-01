import { Client, Account, ID } from "react-native-appwrite";

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

export  const createUser = () => {

  account.create(ID.unique(), "me@example.com", "password", "Jane Doe").then(
    function (response) {
      console.log(response);
    },
    function (error) {
      console.log(error);
    }
  );
};
