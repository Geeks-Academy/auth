require("dotenv").config({ path: ".env" });
import { MongoClient } from "mongodb";

//dbURI empty variable
const { deploymentConnection } = process.env;
const lockalConnection: string = "mongodb://localhost:27017/test";
const dbConnection: string = deploymentConnection || lockalConnection;

const dbOptions = {
  useUnifiedTopology: true,
};

//Create one  document to be inserted
const createOneDoc = async (doc: object) => {
  // create a document to be inserted
  //  const doc = { name: "Red", town: "kanto" };
  const client = new MongoClient(dbConnection, dbOptions);
  try {
    await client.connect();
    const database = client.db("test");
    const collection = database.collection("users");
    return await collection.insertOne(doc);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

//Create many  documents
const insertManyDoc = async (doc: []) => {
  // create an array of documents to insert
  // const docs = [
  //     { name: "Red", town: "Kanto" },
  //     { name: "Blue", town: "Kanto" },
  //     { name: "Leon", town: "Galar" }
  //   ];

  //  const options = { ordered: true };
  const client = new MongoClient(dbConnection, dbOptions);
  try {
    await client.connect();
    const database = client.db("test");
    const collection = database.collection("users");
    return await collection.insertMany(doc);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

//Find one documents
const findOneDoc = async (query: object, options: object) => {
  //=====Query
  //const query = { title: "The Room" };
  //=====Options
  //  const options = {
  //     // sort matched documents in descending order by rating
  //     sort: { rating: -1 },
  //     // Include only the `title` and `imdb` fields in the returned document
  //     projection: { _id: 0, title: 1, imdb: 1 },
  //   };
  const client = new MongoClient(dbConnection, dbOptions);
  try {
    await client.connect();
    const database = client.db("test");
    const collection = database.collection("users");
    return collection.findOne(query, options);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

//Find all documents
const findAllUsers = async (query: object, options: object) => {
  //Query
  //const query = { runtime: { $lt: 15 } };
  //const options = {
  // sort returned documents in ascending order by title (A->Z)
  //sort: { title: 1 },
  // Include only the `title` and `imdb` fields in each returned document
  //projection: { _id: 0, title: 1, imdb: 1 },
  //};
  const client = new MongoClient(dbConnection, dbOptions);
  try {
    await client.connect();
    const database = client.db("test");
    const collection = database.collection("users");
    return collection.find(query, options);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

//Uodate one documents and update
const updateOneDoc = async (
  filter: object,
  options: object,
  updateDoc: object
) => {
  //=====create a filter
  //const filter = { title: "Blacksmith Scene" };
  //=====this option instructs the method to create a document if no documents match the filter
  //const options = { upsert: true };
  //=====create a document
  //const updateDoc = {
  //     $set: {
  //       plot:
  //         "Blacksmith Scene is a silent film directed by William K.L. Dickson",
  //     },
  //   };
  const client = new MongoClient(dbConnection, dbOptions);
  try {
    await client.connect();
    const database = client.db("test");
    const collection = database.collection("users");
    return await collection.updateOne(filter, options, updateDoc);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

//Udate many documents
const updateManyDoc = async (filter: object, updateDoc: object) => {
  //=====create a filter
  //const filter = { rated: "G" };
  //=====increment every document matching the filter with 2 more comments
  // const updateDoc = {
  //     $inc: {
  //       num_mflix_comments: 2,
  //     },
  //   };
  const client = new MongoClient(dbConnection, dbOptions);
  try {
    await client.connect();
    const database = client.db("test");
    const collection = database.collection("users");
    return await collection.updateOne(filter, updateDoc);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

//Replace one document
const replaceOneDoc = async (
  query: object,
  replacement: object,
  options: object
) => {
  //=====Query
  // const query = { title: "Blacksmith Scene" };
  //=====create a new document that will be used to replace the existing document
  //  const replacement = {
  //     title: "Sandcastles in the Sand",
  //     plot:
  //       "Robin Sparkles mourns for a relationship with a mall rat at an idyllic beach.",
  //   };
  //=====Options
  // const options = {
  //     // create a document if no documents match the query
  //     upsert: true,
  //   };
  const client = new MongoClient(dbConnection, dbOptions);
  try {
    await client.connect();
    const database = client.db("test");
    const collection = database.collection("users");
    return await collection.updateOne(query, replacement, options);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

//Delet one document
const deleteOneDoc = async (query: object) => {
  const client = new MongoClient(dbConnection, dbOptions);
  try {
    await client.connect();
    const database = client.db("test");
    const collection = database.collection("users");
    return await collection.deleteOne(query);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

//Delet many documents
const deleteManyDoc = async (query: object) => {
  const client = new MongoClient(dbConnection, dbOptions);
  try {
    await client.connect();
    const database = client.db("test");
    const collection = database.collection("users");
    return await collection.deleteMany(query);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

export default {
  createOneDoc,
  insertManyDoc,
  findOneDoc,
  findAllUsers,
  updateOneDoc,
  updateManyDoc,
  replaceOneDoc,
  deleteOneDoc,
  deleteManyDoc,
};
