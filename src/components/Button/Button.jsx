// import PropTypes from 'prop-types';

export default function Button({ onLoadMore }) {
  return (
    <button type="button" onClick={onLoadMore}>
      Load more
    </button>
  );
}

// Button.propTypes = { loadMore: propTypes.func.isRec }
