import PropTypes from 'prop-types';
import style from './ImageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem';

export default function ImageGallery({ photos, onItemClick }) {
  return (
    <ul className={style.gallery}>
      {photos.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          onItemClick={onItemClick}
          url={webformatURL}
          alt={tags}
          largeImageURL={largeImageURL}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.object).isRequired,
};
