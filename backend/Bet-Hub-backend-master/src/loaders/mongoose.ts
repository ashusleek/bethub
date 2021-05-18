import mongoose from 'mongoose';
import config from 'config';

export default async () => {
  const { connection } = await mongoose.connect(config.databaseURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  return connection.db;
};
