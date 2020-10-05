import mongoose from 'mongoose'

interface IMongoOptions {
  useNewUrlParser?: boolean
  useUnifiedTopology?: boolean
}

const defaultOptions: IMongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

async function connect(connectionString: string, options: IMongoOptions = defaultOptions): Promise<boolean> {
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

function disconnect():Promise<void> {
  return mongoose.disconnect()
}

export { connect, disconnect, IMongoOptions }