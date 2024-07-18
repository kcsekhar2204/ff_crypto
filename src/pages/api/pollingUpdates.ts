import { NextApiRequest, NextApiResponse } from 'next';
import { connectDataBase } from '@/lib/connectDataBase';
import fetchCryptoUpdates from '@/lib/fetchCryptoUpdates';

const storeDataInMongo = async () => {

  try {
    const db = await connectDataBase();
    const collection = db.db().collection('cryptoData');
    const data = await fetchCryptoUpdates()
    const date = new Date()
    const data_timeStamp = { ...data, createdAt: date }
    await collection.insertOne(data_timeStamp);
    console.log('Data stored in MongoDB');
  } catch (error) {
    console.error('Error storing data in MongoDB:', error);
  }
};

const INTERVAL_MS = 60 * 1000; // 1 min

setInterval(storeDataInMongo, INTERVAL_MS);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({ message: 'Data storage process started.' });
}
