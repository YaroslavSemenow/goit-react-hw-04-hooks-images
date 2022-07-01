import { Component } from 'react';
import style from './App.module.css';
import { getPhotos } from 'service/Api-service';
import Searchbar from './Searchbar';
import Loader from './Loader';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import Button from './Button';

class App extends Component {
  state = {
    photos: [],
    query: '',
    page: 1,
    isLoading: false,
    showLoadMoreBtn: false,
    showModal: false,
    modalImg: {
      src: '',
      alt: '',
    },
  };

  componentDidUpdate = async (_, prevState) => {
    if (
      this.state.query !== prevState.query ||
      this.state.page !== prevState.page
    ) {
      this.setState({
        isLoading: true,
        showLoadMoreBtn: false,
      });

      const { photos, query, page } = this.state;

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

        this.setState({
          photos: [...photos, ...newPhotos],
          showLoadMoreBtn: newPhotos.length === 12 && totalPhotos > 12,
        });
      } catch (error) {
        console.log(error);
        alert('Oops, something went wrong. Please, reload the page');
      } finally {
        this.setState({ isLoading: false });
      }
    }
  };

  handlerSubmitForm = async query => {
    this.setState({
      photos: [],
      query,
      page: 1,
    });
  };

  getMorePhotos = async () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  getModalImg = (src, alt) => {
    this.setState({
      modalImg: {
        src,
        alt,
      },
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { photos, isLoading, showLoadMoreBtn, showModal, modalImg } =
      this.state;

    return (
      <div className={style.app}>
        <Searchbar onSubmit={this.handlerSubmitForm} />
        {photos.length > 0 && (
          <ImageGallery
            photos={photos}
            getModalImg={this.getModalImg}
            openModal={this.toggleModal}
          />
        )}
        {isLoading && <Loader />}
        {showLoadMoreBtn && <Button onLoadMore={this.getMorePhotos} />}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={modalImg.src} alt={modalImg.alt} />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
