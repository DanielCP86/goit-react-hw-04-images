import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';
import { FiSearch } from 'react-icons/fi';

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const searchValue = e.currentTarget[1].value?.toLowerCase().trim();
    if (!searchValue) {
      return alert('Please, enter a value!');
    }
    onSubmit(searchValue);
  };

  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles.SearchForm__button}>
          <span>
            <FiSearch size={25} stroke="#000" />
          </span>
        </button>

        <input
          className={styles.SearchForm__input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
