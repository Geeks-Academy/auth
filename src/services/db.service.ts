import { mongoDBConnectionString, mongoOptions } from '../config';

import mongoose from 'mongoose'
import { defaultOptions, IMongoOptions } from '../models/mongo/mongo.model';

const connect = async(connectionString: string, options: IMongoOptions = defaultOptions): Promise<boolean> => {
  try{
    await mongoose.connect(connectionString, options)
    mongoose.set('useFindAndModify', false);
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
  return connect(mongoDBConnectionString, mongoOptions);
}

export { connect, disconnect, IMongoOptions, connectToMongo  }

