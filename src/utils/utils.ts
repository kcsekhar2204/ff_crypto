import { useDispatch, useSelector, useStore } from 'react-redux'
import type { AppDispatch, AppStore, RootState } from './../store'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()

export const coinsID = "bitcoin,ethereum,tether,binancecoin,solana"

export const openModal = (id: string) => {
    const modal = document.getElementById(id) as HTMLDialogElement | null;
    if (modal) {
        modal.showModal();
    }
};

export const closeModal = (id: string) => {
    const modal = document.getElementById(id) as HTMLDialogElement | null;
    if (modal) {
        modal.close();
    }
};

export const API_Headers = {
    'headers': {
        'Content-Type': 'application/json',
        'x-cg-demo-api-key': 'CG-vayqAPkna4UX6j6eKV42h1WE'
    }
}

export interface crypto {
    name: string,
    id: string,
    image: string,
    current_price: number,
    price_change_percentage_24h: number,
    loading: boolean,
    updates20: Array<valueOfCrypto>
}

export interface valueOfCrypto {
    inr: number,
    usd: number,
    createdAt: Date
}

export interface cryptoInfo {
    id: string,
    name: string,
    current_price: number,
    price_change_percentage_24h: number,
}

type ImageMap = {
    [key: string]: string;
};

export const imageMap : ImageMap = {
    "bitcoin": "/bitcoin.png",
    "ethereum": "/ethereum.png",
    "tether": "/Tether.png",
    "binancecoin": "/bnb.png",
    "solana": "/solana.png"
}
  
export interface CryptoArray extends Array<cryptoInfo> {}

export interface reduxCryptoList {
    coins: CryptoArray,
    loading: boolean
}