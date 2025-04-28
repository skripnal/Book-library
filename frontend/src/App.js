import BookList from "./components/BookList/BookList";
import BookForm from "./components/BookForm/BookForm";
import BookFilter from "./components/BookFilter/BookFilter";
import Error from "./components/Error/Error";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.App}>
      <BookForm />
      <div className={styles.group}>
        <BookFilter />
        <BookList />
      </div>
      <Error />
    </div>
  );
}

export default App;
