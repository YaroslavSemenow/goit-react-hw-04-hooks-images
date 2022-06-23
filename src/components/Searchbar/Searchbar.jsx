import { Component } from 'react';
import PropTypes from 'prop-types';
import style from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    query: '',
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleInputChange = e => {
    const text = e.target.value;

    this.setState({ query: text });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;

    return (
      <header className={style.header}>
        <form className={style.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={style.form__button}>
            <span className={style.form__label}></span>
          </button>

          <input
            onChange={this.handleInputChange}
            className={style.form__input}
            type="text"
            value={query}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
