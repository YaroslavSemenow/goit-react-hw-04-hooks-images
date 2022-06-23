import { Component } from 'react';
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
    error: false,
    isLoading: false,
    ShowLoadMoreBtn: false,
  };

  handlerSubmitForm = async query => {
    this.setState({
      error: false,
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
        ShowLoadMoreBtn: totalPhotos > 12 && true,
      });
    } catch (error) {
      console.log(error);
      this.setState({ error: true, isLoading: false });
    }
  };

  getMorePhotos = async () => {
    const { query, page } = this.state;
    const nextPage = page + 1;

    this.setState({
      error: false,
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
          ShowLoadMoreBtn: photosArr.length === 12,
        };
      });
    } catch (error) {
      console.log(error);
      this.setState({ error: true, isLoading: false });
    }
  };

  render() {
    const { photos, error, isLoading, ShowLoadMoreBtn } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handlerSubmitForm} />
        <ImageGallery photos={photos} />
        {error && alert('Oops, something went wrong. Please, reload the page')}
        {isLoading && <Loader />}
        {ShowLoadMoreBtn && <Button onLoadMore={this.getMorePhotos} />}
        <Modal></Modal>
      </div>
    );
  }
}

export default App;
