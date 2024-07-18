import { configureStore } from '@reduxjs/toolkit'
import selectedCryptoSlice from './selectedCryptoSlice'
import cryptoListSlice from './cryptoListSlice'

export const store = configureStore({
  reducer: {
    selectedCrypto : selectedCryptoSlice,
    coinList: cryptoListSlice
  }
})

export type AppStore = typeof store

export type RootState = ReturnType<AppStore['getState']>

export type AppDispatch = AppStore['dispatch']