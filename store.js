import { configureStore, createSlice } from '@reduxjs/toolkit'

import basket from './features/basketSlice'

export const store = configureStore({
  reducer: {
    basket: basket
  }
})


