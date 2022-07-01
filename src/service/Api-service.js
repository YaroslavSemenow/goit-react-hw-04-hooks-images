import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

const API_KEY = '25274192-4013926bd09e77e2599d4477f';

export const getPhotos = async (query, page) => {
  const response = await axios.get(
    `/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );

  return response.data;
};
