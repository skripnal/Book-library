import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaSpinner } from 'react-icons/fa'
import {
    addBook,
    fetchBook,
    selectIsLoadingViaAPI,
} from '../../redux/slices/bookSlice'
import { setError } from '../../redux/slices/errorSlice'
import booksData from '../../data/books.json'
import createBookWithID from '../../utils/createBookWithID'
import styles from './BookForm.module.css'

const BookForm = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    // const [isLoading, setIsLoading] = useState(false)
    const IsLoadingViaAPI = useSelector(selectIsLoadingViaAPI)
    console.log(IsLoadingViaAPI)
    const dispatch = useDispatch()

    const handleAddRandomBook = () => {
        const randomIndex = Math.floor(Math.random() * booksData.length)
        const randomBook = booksData[randomIndex]
        dispatch(addBook(createBookWithID(randomBook, 'random')))
    }

    const handleSubmit = () => {
        if (author && title) {
            const book = {
                title,
                author,
            }
            dispatch(addBook(createBookWithID(book, 'manual')))
            setTitle('')
            setAuthor('')
        } else dispatch(setError('You must fill title and author!'))
    }

    const handleAddRandomBookViaAPI = () => {
        dispatch(fetchBook('http://localhost:4000/random-book-deleyed'))
    }

    return (
        <div className={styles.container}>
            <h2>Add a New Book</h2>
            <form>
                <label>
                    <p>Title:</p>
                    <input
                        type="text"
                        value={title}
                        onChange={(el) => setTitle(el.target.value)}
                    />
                </label>
                <label>
                    <p>Author:</p>
                    <input
                        type="text"
                        value={author}
                        onChange={(el) => setAuthor(el.target.value)}
                    />
                </label>
            </form>
            <div className={styles.buttonContainer}>
                <button onClick={handleSubmit}>Add Book</button>
                <button onClick={handleAddRandomBook}>Add Random</button>
                <button
                    className={styles.APIButton}
                    disabled={IsLoadingViaAPI}
                    onClick={handleAddRandomBookViaAPI}
                >
                    {IsLoadingViaAPI ? (
                        <>
                            <span>Loading book...</span>
                            <FaSpinner className={styles.spinner} />
                        </>
                    ) : (
                        'Add Random Book via API'
                    )}
                </button>
            </div>
        </div>
    )
}

export default BookForm
