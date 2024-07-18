import { API_Headers, coinsID } from "@/utils/utils";
import { stringify } from "querystring";

export default async function fetchCryptoUpdates() : Promise<Object> {
    try {
        const params = {
            ids : coinsID,
            vs_currencies: 'inr,usd',
            include_last_updated_at: true

        }
        const params_string = stringify(params).replace(/,/g , '%2C').replace(/['|"]/g, '')
        const response = await fetch(`${process.env.NEXT_PUBLIC_CRYPTOGECKO_BASE_URL}/simple/price/?${params_string}`, API_Headers);
        const data = await response.json();
        return data
    } catch (error) {
        console.error('Error fetching data:', error);
        return undefined as any
    }
}