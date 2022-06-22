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
    isLoading: false,
    ShowLoadMoreBtn: false,
  };

  handlerSubmitForm = async query => {
    this.setState({
      isLoading: true,
    });

    try {
      const photos = await getPhotos(query);
      const photosArr = photos.hits;
      const totalPhotos = photos.totalHits;

      this.setState({
        photos: photosArr,
        query,
        page: 1,
        isLoading: false,
        ShowLoadMoreBtn: totalPhotos > 12 && true,
      });
    } catch (error) {
      console.log(error);
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
          ShowLoadMoreBtn: photosArr.length === 12,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { photos, isLoading, ShowLoadMoreBtn } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handlerSubmitForm} />
        <ImageGallery photos={photos} />
        {isLoading && <Loader />}
        {ShowLoadMoreBtn && <Button onLoadMore={this.getMorePhotos} />}
        <Modal></Modal>
      </div>
    );
  }
}

export default App;
