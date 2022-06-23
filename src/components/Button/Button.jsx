import PropTypes from 'prop-types';
import style from './Button.module.css';

export default function Button({ onLoadMore }) {
  return (
    <div className={style.wrap}>
      <button className={style.button} type="button" onClick={onLoadMore}>
        Load more
      </button>
    </div>
  );
}

Button.propTypes = { loadMore: PropTypes.func };
