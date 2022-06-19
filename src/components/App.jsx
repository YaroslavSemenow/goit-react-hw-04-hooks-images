import { Component } from 'react';
import { getPhotos } from 'service/Api-service';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';

class App extends Component {
  state = {
    photos: [],
    query: '',
    page: 1,
    isLoadMore: false,
  };

  handlerSubmitForm = async query => {
    try {
      const photos = await getPhotos(query);
      const photosArr = photos.hits;
      const totalPhotos = photos.totalHits;

      this.setState({
        photos: photosArr,
        query,
        page: 1,
        isLoadMore: totalPhotos > 12 && true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  getMorePhotos = async () => {
    const { query, page } = this.state;
    const nextPage = page + 1;

    try {
      const photos = await getPhotos(query, nextPage);
      const photosArr = photos.hits;

      this.setState(({ photos }) => {
        return {
          photos: [...photos, ...photosArr],
          page: nextPage,
          isLoadMore: photosArr.length === 12,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { photos, isLoadMore } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handlerSubmitForm} />
        <ImageGallery photos={photos} />
        {isLoadMore && <Button onLoadMore={this.getMorePhotos} />}
      </div>
    );
  }
}

export default App;
