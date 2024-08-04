import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    title: '',
    author: '',
    onlyFavorite: false,
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setTitleFilter: (state, action) => {
            return { ...state, title: action.payload }
        },
        setAuthorFilter: (state, action) => {
            return { ...state, author: action.payload }
        },
        setIsFavoriteFilter: (state, action) => {
            return { ...state, onlyFavorite: action.payload }
        },
        resetFilters: () => {
            return { ...initialState }
        },
    },
})

export const selectIsFavoriteFilter = (state) => state.filter.onlyFavorite

export const selectAuthorFilter = (state) => state.filter.author

export const selectTitleFilter = (state) => state.filter.title

export const {
    setTitleFilter,
    resetFilters,
    setAuthorFilter,
    setIsFavoriteFilter,
} = filterSlice.actions

export default filterSlice.reducer
