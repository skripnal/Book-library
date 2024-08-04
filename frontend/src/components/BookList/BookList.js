import { useDispatch, useSelector } from 'react-redux'
import { deleteBook, toogleFavorite } from '../../redux/slices/bookSlice'
import { BsBookmarkStarFill, BsBookmarkStar } from 'react-icons/bs'
import {
    selectTitleFilter,
    selectAuthorFilter,
    selectIsFavoriteFilter,
} from '../../redux/slices/filterSlice'
import { selectBooks } from '../../redux/slices/bookSlice'
import styles from './BookList.module.css'

const BookList = () => {
    const titleFrilter = useSelector(selectTitleFilter)
    const authorFilter = useSelector(selectAuthorFilter)
    const isFavoriteFilter = useSelector(selectIsFavoriteFilter)
    const books = useSelector(selectBooks)
    const dispatch = useDispatch()

    const deleteBookHandler = (id) => {
        dispatch(deleteBook(id))
    }

    const handleToggleFavorite = (id) => {
        dispatch(toogleFavorite(id))
    }

    const filteredBooks = books.filter((book) => {
        const matchesTitle = book.title
            .toLowerCase()
            .includes(titleFrilter.toLowerCase())
        const matchesAuthor = book.author
            .toLowerCase()
            .includes(authorFilter.toLowerCase())
        const matchesFavorite = isFavoriteFilter ? book.isFavorite : book
        return matchesTitle && matchesAuthor && matchesFavorite
    })

    const highLightMatch = (text, filter) => {
        if (!filter) return text

        const regex = new RegExp(`(${filter})`, 'gi')
        console.log(regex)
        return text.split(regex).map((substring, i) => {
            if (substring.toLowerCase() === filter.toLowerCase()) {
                return (
                    <span key={i} className={styles.highlight}>
                        {substring}
                    </span>
                )
            }
            return substring
        })
    }

    return (
        <div className={styles.container}>
            <h2>Book List</h2>
            {filteredBooks.length === 0 ? (
                <p>No book avaible</p>
            ) : (
                <ul className={styles.ul}>
                    {filteredBooks.map((el, i) => (
                        <li key={el.id}>
                            <div className={styles.liLeft}>
                                {++i}. {highLightMatch(el.title, titleFrilter)}{' '}
                                by{' '}
                                <strong>
                                    {highLightMatch(el.author, authorFilter)}
                                </strong>{' '}
                                ({el.sourse})
                            </div>
                            <div className={styles.liRight}>
                                {el.isFavorite ? (
                                    <BsBookmarkStarFill
                                        className={styles.favorite}
                                        onClick={() =>
                                            handleToggleFavorite(el.id)
                                        }
                                    />
                                ) : (
                                    <BsBookmarkStar
                                        className={styles.favorite}
                                        onClick={() =>
                                            handleToggleFavorite(el.id)
                                        }
                                    />
                                )}
                                <button
                                    onClick={() => deleteBookHandler(el.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default BookList
