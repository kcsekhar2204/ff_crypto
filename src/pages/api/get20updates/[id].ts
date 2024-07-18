import { NextApiRequest, NextApiResponse } from 'next';
import { connectDataBase } from '@/lib/connectDataBase';
import { valueOfCrypto } from '@/utils/utils';

const get20updates = async (id: string) => {

    try {
        const db = await connectDataBase();
        const collection = db.db().collection('cryptoData');

        const data = await collection
            .find()
            .project({ [id]: 1, createdAt: 1 })
            .sort({ createdAt: -1 }) 
            .limit(20)
            .toArray();
            
        let array : Array<valueOfCrypto> = []
        data.forEach(item => {
            const {inr, usd, last_updated_at} = item[id]
            const obj = {inr, usd, createdAt: item.createdAt}
            array.push(obj)
        })
        return array
    } catch (error) {
        console.error('Error fetching data in MongoDB:', error);
        return undefined as any
    }
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {
        query: { id },
    } = req;
    if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Invalid id parameter' });
    }
    const data = await get20updates(id)
    res.status(200).json(data);
}
