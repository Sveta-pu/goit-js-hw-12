import getImagesByQuery from './js/pixabay-api.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  lightbox,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const input = form.elements['search-text'];
let page = 1;

form.addEventListener('submit', async ev => {
  ev.preventDefault();

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
    //Error
    if (!data || !Array.isArray(data.hits)) {
      throw new Error('Bad response shape from API');
    }

    //No results
    if (data.hits.length === 0) {
      iziToast.warning({
        title: 'Warning',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    //Data recived
    createGallery(data.hits);
  } catch (err) {
    console.error(err);
    iziToast.error({
      title: 'Error',
      message: 'Network error or API failed. Try again later.',
    });
  } finally {
    hideLoader();
    // input.value = '';
  }
});

async function loadMore() {
  const query = input.value.trim();
  page++;
  try {
    const data = await getImagesByQuery(query, page);
  } catch (error) {
  } finally {
  }
}
