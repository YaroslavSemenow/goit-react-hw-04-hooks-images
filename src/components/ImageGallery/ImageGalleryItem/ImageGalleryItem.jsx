import PropTypes from 'prop-types';

export default function ImageGalleryItem({ url, tags = 'cat' }) {
  return (
    <li className="gallery-item">
      <img src={url} alt={tags} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  tags: PropTypes.string,
};
