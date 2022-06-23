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
    modalImg: '',
  };

  handlerSubmitForm = async query => {
    this.setState({
      isLoading: true,
    });

    try {
      const photos = await getPhotos(query);
      const photosArr = photos.hits;
      const totalPhotos = photos.totalHits;

      if (totalPhotos === 0) {
        alert('Please enter a valid request');
      }

      this.setState({
        photos: photosArr,
        query,
        page: 1,
        isLoading: false,
        showLoadMoreBtn: totalPhotos > 12 && true,
      });
    } catch (error) {
      console.log(error);
      this.setState({ isLoading: false });

      alert('Oops, something went wrong. Please, reload the page');
    }
  };

  getMorePhotos = async () => {
    const { query, page } = this.state;
    const nextPage = page + 1;

    this.setState({
      isLoading: true,
    });

    try {
      const photos = await getPhotos(query, nextPage);
      const photosArr = photos.hits;

      this.setState(({ photos }) => {
        return {
          photos: [...photos, ...photosArr],
          page: nextPage,
          isLoading: false,
          showLoadMoreBtn: photosArr.length === 12,
        };
      });
    } catch (error) {
      console.log(error);
      this.setState({ isLoading: false });

      alert('Oops, something went wrong. Please, reload the page');
    }
  };

  getModalImg = url => {
    this.setState({ modalImg: url });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { photos, isLoading, showLoadMoreBtn, ShowModal, modalImg } =
      this.state;

    return (
      <div className={style.app}>
        <Searchbar onSubmit={this.handlerSubmitForm} />
        <ImageGallery photos={photos} onItemClick={this.getModalImg} />
        {isLoading && <Loader />}
        {showLoadMoreBtn && <Button onLoadMore={this.getMorePhotos} />}
        {ShowModal && (
          <Modal onClose={this.openModal}>
            <img src={modalImg} alt="" />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
