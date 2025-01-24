import axios from 'axios';

export const fetchImages = (query, currentPage) => {
  const axiosOptions = {
    params: {
      key: '21607463-49e6315ec3819cd7ca780513d',
      q: query,
      page: currentPage,
      per_page: 15,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
    },
  };

  return axios.get(`https://pixabay.com/api/`, axiosOptions);
};
