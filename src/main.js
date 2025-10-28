import { getImagesByQuery } from './js/pixabay-api';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  lightbox,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const input = form.elements['search-text'];
let page = 1;

const loadMoreBtn = document.querySelector('.load_more_button');
loadMoreBtn.addEventListener('click', loadMore);

form.addEventListener('submit', async ev => {
  ev.preventDefault();
  page = 1;
  const query = input.value.trim();
  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term!',
    });
    return;
  }

  clearGallery();

  showLoader();

  try {
    const data = await getImagesByQuery(query, page);

    if (!data || !Array.isArray(data.hits)) {
      throw new Error('Bad response shape from API');
    }

    if (data.hits.length === 0) {
      iziToast.warning({
        title: 'Warning',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    createGallery(data.hits);
    showLoadMoreButton();
  } catch (err) {
    console.error(err);
    iziToast.error({
      title: 'Error',
      message: 'Network error or API failed. Try again later.',
    });
  } finally {
    hideLoader();
  }
});

async function loadMore() {
  const query = input.value.trim();
  page = +1;
  try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);
    const shownImsges = data.hits.length;
    const totalImages = data.totalHits;
    if (shownImsges >= totalImages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        title: 'End',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
    lightbox.refresh();
  } catch (error) {
  } finally {
    hideLoader();
    input.value = '';
  }
}

function smoothScrollByCardHeight() {
  const firstCard = document.querySelector('.gallery .photo-card');
  if (!firstCard) return;
  const { height } = firstCard.getBoundingClientRect();
  window.scrollBy({
    top: height * 2,
    left: 0,
    behavior: 'smooth',
  });
}
smoothScrollByCardHeight();
