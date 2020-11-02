// import { mongoDBConnectionString } from '../config';

import mongoose from 'mongoose'
import { defaultOptions, IMongoOptions } from 'models/mongo/mongo.model';

export const mongoDBConnectionString = process.env.MONGODBURL as string;

const connect = async(connectionString: string, options: IMongoOptions = defaultOptions): Promise<boolean> => {
  try{
    await mongoose.connect(connectionString, options)
    console.log(`Mongo on ${connectionString} connected`)
    return true
  }
  catch(err){
    console.error('Error connecting to MongoDB', err)
    return false
  }
}

const disconnect = ():Promise<void> => {
  return mongoose.disconnect()
}

const connectToMongo = () => {
  return connect(mongoDBConnectionString);
}

export { connect, disconnect, IMongoOptions, connectToMongo  }

