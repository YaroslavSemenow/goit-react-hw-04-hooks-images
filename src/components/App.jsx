import { useState, useEffect } from 'react';
import style from './App.module.css';
import { getPhotos } from 'service/Api-service';
import Searchbar from './Searchbar';
import Loader from './Loader';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import Button from './Button';

export default function App() {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState({
    src: '',
    alt: '',
  });

  useEffect(() => {
    if (query === '') {
      return;
    }

    setIsLoading(true);

    const fetchPhotos = async () => {
      try {
        const data = await getPhotos(query, page);
        const totalPhotos = data.totalHits;
        const newPhotos = data.hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags,
          })
        );

        if (totalPhotos === 0) {
          alert(`No results found for '${query}'`);
          return;
        }

        setPhotos(photos => [...photos, ...newPhotos]);
        setShowLoadMoreBtn(newPhotos.length === 12 && totalPhotos > 12);
      } catch (error) {
        console.log(error);
        alert('Oops, something went wrong. Please, reload the page');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, [page, query]);

  const handlerSubmitForm = async query => {
    setPhotos([]);
    setQuery(query);
    setPage(1);
    setShowLoadMoreBtn(false);
  };

  const getMorePhotos = async () => {
    setPage(page => page + 1);
  };

  const getModalImg = (src, alt) => {
    setModalImg({
      src,
      alt,
    });
  };

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

  return (
    <div className={style.app}>
      <Searchbar onSubmit={handlerSubmitForm} />
      {photos.length > 0 && (
        <ImageGallery
          photos={photos}
          getModalImg={getModalImg}
          openModal={toggleModal}
        />
      )}
      {isLoading && <Loader />}
      {showLoadMoreBtn && <Button onLoadMore={getMorePhotos} />}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={modalImg.src} alt={modalImg.alt} />
        </Modal>
      )}
    </div>
  );
}
