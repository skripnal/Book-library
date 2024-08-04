import BookList from './components/BookList/BookList'
import BookForm from './components/BookForm/BookForm'
import BookFilter from './components/BookFilter/BookFilter'
import Error from './components/Error/Error'
import './App.css'

function App() {
    return (
        <div className="App">
            <BookForm />
            <div>
                <BookFilter />
                <BookList />
            </div>
            <Error />
        </div>
    )
}

export default App
