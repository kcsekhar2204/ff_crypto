import { API_Headers, coinsID, cryptoInfo } from '@/utils/utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { stringify } from 'querystring';

const currentTrends = async () => {

    try {

        const params = {
            ids: coinsID,
            vs_currency: 'usd',
        }
        const params_string = stringify(params).replace(/,/g, '%2C').replace(/['|"]/g, '')
        const response = await fetch(`${process.env.NEXT_PUBLIC_CRYPTOGECKO_BASE_URL}/coins/markets/?${params_string}`, API_Headers);
        const data = await response.json();
        const arr: Array<cryptoInfo> = []
        data.forEach((item:cryptoInfo) => {
            let obj = {
                id: item.id,
                name: item.name,
                current_price: item.current_price,
                price_change_percentage_24h: item.price_change_percentage_24h,
            }
            arr.push(obj)
        })
        return arr
    } catch (error) {
        console.error('Server error:', error);
        return undefined as any
    }
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const data = await currentTrends()
    res.status(200).json(data);
}
