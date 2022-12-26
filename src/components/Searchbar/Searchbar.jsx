import css from './Searchbar.module.css';
import { useState } from 'react';

export const Searchbar = ({onSubmit}) => {
  const [query, setQuery] = useState('');

  const handleChange = event => {
    setQuery(event.currentTarget.value);
  }

  const handleSubmit = event => {
    event.preventDefault();

    if (query.trim() === '') {
      alert('Please, enter anything to search');
      return;
    }
    onSubmit(query);
    reset();
  };

  const reset = () => {
    setQuery('');
  };

    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>
          <input
            value={query}
            onChange={handleChange}
            name="inputForSearch"
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
}
