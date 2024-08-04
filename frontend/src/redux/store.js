import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './slices/filterSlice'
import bookSlice from './slices/bookSlice'
import errorSlice from './slices/errorSlice'

const store = configureStore({
    reducer: { books: bookSlice, filter: filterReducer, error: errorSlice },
})

export default store
