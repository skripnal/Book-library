import { useDispatch, useSelector } from "react-redux";

import styles from "./BookFilter.module.scss";

import {
  setTitleFilter,
  selectTitleFilter,
  resetFilters,
  setAuthorFilter,
  selectAuthorFilter,
  selectIsFavoriteFilter,
  setIsFavoriteFilter,
} from "../../redux/slices/filterSlice";
import { TextInput, Button } from "../ui";

const BookFilter = () => {
  const dispatch = useDispatch();
  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);
  const isFavoriteFilter = useSelector(selectIsFavoriteFilter);

  const handleTitileFrilterChange = (e) => {
    dispatch(setTitleFilter(e.target.value));
  };

  const handleAuthorFilterChange = (e) => {
    dispatch(setAuthorFilter(e.target.value));
  };

  const handleIfFavoriteChange = (e) => {
    dispatch(setIsFavoriteFilter(e.target.checked));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  return (
    <div className={styles.container}>
      <form>
        <TextInput
          value={titleFilter}
          onChange={handleTitileFrilterChange}
          placeholder="Filter by title..."
        />
        <TextInput
          value={authorFilter}
          onChange={handleAuthorFilterChange}
          placeholder="Filter by author..."
        />
        <div className={styles.formGroup}>
          <label>
            <input
              type="checkbox"
              checked={isFavoriteFilter}
              onChange={handleIfFavoriteChange}
            />
            <p>Only Favorite</p>
          </label>
          <Button onClick={handleResetFilters}>Reset Filters</Button>
        </div>
      </form>
    </div>
  );
};

export default BookFilter;
