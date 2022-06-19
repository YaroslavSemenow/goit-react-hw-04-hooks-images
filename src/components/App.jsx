import { Component } from 'react';
import { getPhotos } from 'service/Api-service';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

class App extends Component {
  state = {
    photos: [],
  };

  handlerSubmitForm = async query => {
    try {
      const photos = await getPhotos(query);
      this.setState({ photos: photos.hits });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handlerSubmitForm} />
        <ImageGallery photos={this.state.photos} />
      </div>
    );
  }
}

export default App;
