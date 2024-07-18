import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '.'
import { crypto, cryptoInfo, imageMap, valueOfCrypto } from '@/utils/utils'

const initialState: crypto = {
  name: "Bitcoin",
  image: "/bitcoin.png",
  id: "bitcoin",
  current_price: 0,
  price_change_percentage_24h: 0,
  updates20: [], 
  loading: false
}

export const selectedCryptoSlice = createSlice({
  name: 'selectedCrypto',
  initialState,
  reducers: {
    setSelectedCrypto: (state, action: PayloadAction<cryptoInfo>) => {
      const { name, current_price, id, price_change_percentage_24h } = action.payload
      state.name = name
      state.image = imageMap[id]
      state.current_price = current_price
      state.price_change_percentage_24h = price_change_percentage_24h
      state.id = id
    },

    set20updates: (state, action: PayloadAction<Array<valueOfCrypto>>) => {
      state.updates20 = action.payload
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  }
})

export const { setSelectedCrypto, set20updates, setLoading } = selectedCryptoSlice.actions

export const getSelectedCrypto = (state: RootState) => state.selectedCrypto

export const get20updates = (state: RootState): Array<valueOfCrypto> => {return state.selectedCrypto.updates20}

export const set20UpdatesApi = (id: string) => async (dispatch: any) => {
  dispatch(setLoading(true))
  try {
    const res = await fetch(`/api/get20updates/${id}`);
    const data = await res.json();
    dispatch(set20updates(data))
    dispatch(setLoading(false))
  } catch(error) {
    console.error("Error while fetching from mongo")
    dispatch(setLoading(false))
  }
}

export default selectedCryptoSlice.reducer