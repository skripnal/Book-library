import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import createBookWithID from '../../utils/createBookWithID'
import { setError } from './errorSlice'

const initialState = {
    books: [],
    isLoadingViaAPI: false,
}

export const fetchBook = createAsyncThunk(
    'books/fatchBook',
    async (url, thunkAPI) => {
        try {
            const res = await axios.get(url)
            return res.data
        } catch (error) {
            thunkAPI.dispatch(setError(error.message))
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const bookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        addBook: (state, action) => {
            state.books.push(action.payload)
        },
        deleteBook: (state, action) => {
            return {
                ...state,
                books: state.books.filter((el) => el.id !== action.payload),
            }
        },
        toogleFavorite: (state, action) => {
            return {
                ...state,
                books: state.books.map((el) =>
                    el.id === action.payload
                        ? { ...el, isFavorite: !el.isFavorite }
                        : el
                ),
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBook.pending, (state) => {
            state.isLoadingViaAPI = true
        })
        builder.addCase(fetchBook.fulfilled, (state, action) => {
            state.isLoadingViaAPI = false
            if (action?.payload?.title && action?.payload?.author) {
                state.books.push(createBookWithID(action.payload, 'API'))
            }
        })
        builder.addCase(fetchBook.rejected, (state) => {
            state.isLoadingViaAPI = false
        })
    },
})

export const selectBooks = (state) => state.books.books

export const selectIsLoadingViaAPI = (state) => state.books.isLoadingViaAPI

export const { addBook, deleteBook, toogleFavorite } = bookSlice.actions

export default bookSlice.reducer
