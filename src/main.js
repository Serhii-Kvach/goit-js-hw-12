import { fetchImages } from './js/pixabay-api';
import { renderImageCards } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formEl = document.querySelector('.form-search');
const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more-btn');

let page = 1;
let query = '';
let lightbox = new SimpleLightbox('.gallery-item', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

loadMoreBtn.classList.add('is-hidden');
loader.style.display = 'none';

const onFormSubmit = async event => {
  try {
    event.preventDefault();
    galleryContainer.innerHTML = '';
    loader.style.display = 'block';

    query = event.currentTarget.elements.user_query.value.trim();

    if (query === '') {
      loader.style.display = 'none';
      loadMoreBtn.classList.add('is-hidden');
      iziToast.warning({
        title: 'Warning',
        position: 'topRight',
        message: 'Please enter a search query!',
      });
      return;
    }

    page = 1;
    loadMoreBtn.classList.add('is-hidden');

    const { data } = await fetchImages(query, page);

    loader.style.display = 'none';

    if (!data.hits.length) {
      iziToast.error({
        title: 'Error',
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }
    const markup = renderImageCards(data.hits);
    galleryContainer.insertAdjacentHTML('beforeend', markup);

    lightbox.refresh();

    formEl.reset();

    if (data.totalHits > 1) {
      loadMoreBtn.classList.remove('is-hidden');
    }
  } catch (error) {
    loader.style.display = 'none';
    iziToast.error({
      message: 'Something went wrong, please try again later.',
      position: 'topRight',
    });
    console.error('Error fetching data:', error);
  }
};

const onLoadMoreBtnClick = async event => {
  try {
    page++;

    const { data } = await fetchImages(query, page);

    const markup = renderImageCards(data.hits);
    galleryContainer.insertAdjacentHTML('beforeend', markup);

    lightbox.refresh();

    if (page * 15 >= data.totalHits) {
      iziToast.info({
        title: 'Info',
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
      loadMoreBtn.classList.add('is-hidden');
    }
    smoothScroll();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      position: 'topRight',
      message: 'Failed to load images. Please try again later.',
    });
  }
};

const smoothScroll = () => {
  const { height: cardHeight } = galleryContainer.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
};

loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
formEl.addEventListener('submit', onFormSubmit);
