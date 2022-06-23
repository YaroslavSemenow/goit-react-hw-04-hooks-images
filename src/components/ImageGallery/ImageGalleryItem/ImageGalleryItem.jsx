import PropTypes from 'prop-types';
import style from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
  url,
  tags = 'cat',
  onItemClick,
  largeImageURL,
}) {
  return (
    <li
      className={style.gallery__item}
      onClick={() => onItemClick(largeImageURL)}
    >
      <img className={style.gallery__image} src={url} alt={tags} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  tags: PropTypes.string,
};
