import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CryptoArray, reduxCryptoList } from '@/utils/utils'

const initialState: reduxCryptoList = {
    coins: [],
    loading: false
}

export const cryptoListSlice = createSlice({
    name: 'coinList',
    initialState,
    reducers: {

        setCoins: (state, action: PayloadAction<CryptoArray>) => {
            state.coins = action.payload
        },


        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
    }
})

export const { setLoading, setCoins } = cryptoListSlice.actions

export const listOfCrypto = () => async (dispatch: any) => {
    dispatch(setLoading(true))
    try {
      const res = await fetch(`/api/currentTrends`);
      const data = await res.json();
      dispatch(setCoins(data))
      dispatch(setLoading(false))
    } catch(error) {
      console.error("Error while fetching from mongo")
      dispatch(setLoading(false))
    }
  }

export default cryptoListSlice.reducer