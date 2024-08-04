import { useDispatch, useSelector } from 'react-redux'
import {
    setTitleFilter,
    selectTitleFilter,
    resetFilters,
    setAuthorFilter,
    selectAuthorFilter,
    selectIsFavoriteFilter,
    setIsFavoriteFilter,
} from '../../redux/slices/filterSlice'
import styles from './BookFilter.module.css'

const BookFilter = () => {
    const dispatch = useDispatch()
    const titleFilter = useSelector(selectTitleFilter)
    const authorFilter = useSelector(selectAuthorFilter)
    const isFavoriteFilter = useSelector(selectIsFavoriteFilter)

    const handleTitileFrilterChange = (e) => {
        dispatch(setTitleFilter(e.target.value))
    }

    const handleAuthorFilterChange = (e) => {
        dispatch(setAuthorFilter(e.target.value))
    }

    const handleIfFavoriteChange = (e) => {
        dispatch(setIsFavoriteFilter(e.target.checked))
    }

    const handleResetFilters = () => {
        dispatch(resetFilters())
    }

    return (
        <div className={styles.container}>
            <form>
                <input
                    value={titleFilter}
                    onChange={handleTitileFrilterChange}
                    placeholder="Filter bt title..."
                    type="text"
                />
                <input
                    value={authorFilter}
                    onChange={handleAuthorFilterChange}
                    placeholder="Filter by author..."
                    type="text"
                />
                <label>
                    <input
                        type="checkbox"
                        checked={isFavoriteFilter}
                        onChange={handleIfFavoriteChange}
                    />
                    <p>Only Favorite</p>
                </label>
                <button onClick={handleResetFilters} type="button">
                    Reset Filters
                </button>
            </form>
        </div>
    )
}

export default BookFilter
