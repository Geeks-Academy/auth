export interface IMongoOptions {
  useNewUrlParser?: boolean
  useUnifiedTopology?: boolean
}

export const defaultOptions: IMongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}