import PropTypes from 'prop-types';
import style from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
  url,
  tags = 'cat',
  largeImageURL,
  otherProps,
}) {
  const { getModalImg, openModal } = otherProps;

  return (
    <li
      className={style.gallery__item}
      onClick={() => {
        getModalImg(largeImageURL, tags);
        openModal();
      }}
    >
      <img className={style.gallery__image} src={url} alt={tags} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  tags: PropTypes.string,
};
