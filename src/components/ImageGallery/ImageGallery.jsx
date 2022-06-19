import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';

export default function ImageGallery({ photos }) {
  return (
    <ul className="gallery">
      {photos.map(({ id, webformatURL, tags }) => (
        <ImageGalleryItem key={id} url={webformatURL} alt={tags} />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.object).isRequired,
};
