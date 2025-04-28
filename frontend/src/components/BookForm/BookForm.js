import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";

import styles from "./BookForm.module.scss";

import booksData from "../../data/books.json";
import {
  addBook,
  fetchBook,
  selectIsLoadingViaAPI,
} from "../../redux/slices/bookSlice";
import { setError } from "../../redux/slices/errorSlice";
import createBookWithID from "../../utils/createBookWithID";
import { Button, TextInput } from "../ui";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const IsLoadingViaAPI = useSelector(selectIsLoadingViaAPI);
  console.log(IsLoadingViaAPI);
  const dispatch = useDispatch();

  const handleAddRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length);
    const randomBook = booksData[randomIndex];
    dispatch(addBook(createBookWithID(randomBook, "random")));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (author && title) {
      const book = {
        title,
        author,
      };
      dispatch(addBook(createBookWithID(book, "manual")));
      setTitle("");
      setAuthor("");
    } else dispatch(setError("You must fill title and author!"));
  };

  const handleAddRandomBookViaAPI = () => {
    dispatch(fetchBook("http://localhost:4000/random-book-deleyed"));
  };

  return (
    <div className={styles.container}>
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Title:</p>
          <TextInput
            placeholder="Write title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          <p>Author:</p>
          <TextInput
            placeholder="Write author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </label>
        <Button type="submit">Add Book</Button>
      </form>
      <div className={styles.buttonContainer}>
        <Button onClick={handleAddRandomBook}>Add Random</Button>
        <Button disabled={IsLoadingViaAPI} onClick={handleAddRandomBookViaAPI}>
          {IsLoadingViaAPI ? (
            <div className={styles.spinnerContainer}>
              <span>Loading book...</span>
              <FaSpinner className={styles.spinner} />
            </div>
          ) : (
            "Add Random Book via API"
          )}
        </Button>
      </div>
    </div>
  );
};

export default BookForm;
