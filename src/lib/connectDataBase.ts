import { Db, MongoClient } from 'mongodb';

let cachedClient: MongoClient;
let cachedDb : Db;

export async function connectDataBase(): Promise<MongoClient> {

  if (cachedClient) {
    return cachedClient;
  }

  try {
    const client = new MongoClient(process.env.mongoDb || '');
    await client.connect();
    console.log('Connected to MongoDB');
    cachedClient = client;
    return cachedClient;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

const closeDatabaseConnection = async () => {
  try {
    if (cachedClient) {
      await cachedClient.close();
      cachedClient = undefined as any;
      console.log('MongoDB connection closed');
    }
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  }
};