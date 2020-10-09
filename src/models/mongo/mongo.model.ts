export interface IMongoOptions {
  useNewUrlParser?: boolean;
  useUnifiedTopology?: boolean;
  useFindAndModify?: boolean;
}

export const defaultOptions: IMongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}