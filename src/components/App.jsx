import { Component } from 'react';
// import { getPhotos } from 'service/Api-service';
import Searchbar from './Searchbar';

class App extends Component {
  state = {
    photos: [],
  };

  handlerSubmitForm = query => {
    console.log(query);
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handlerSubmitForm} />
      </div>
    );
  }
}

export default App;
