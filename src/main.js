import { getImagesByQuery } from './js/pixabay-api';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import {
  createGallery,
  appendToGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const input = form.elements['search-text'];
const loadMoreBtn = document.querySelector('.load_more_button');

let page = 1;
let currentQuery = '';
let shownImages = 0;
let totalImages = 0;
let isLoading = false;

loadMoreBtn.addEventListener('click', loadMore);
form.addEventListener('submit', onSearch);

async function onSearch(ev) {
  ev.preventDefault();
  if (isLoading) return;

  const query = input.value.trim();
  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term!',
    });
    return;
  }

  page = 1;
  currentQuery = query;
  shownImages = 0;
  totalImages = 0;

  clearGallery();
  hideLoadMoreButton();
  showLoader();
  isLoading = true;

  try {
    const data = await getImagesByQuery(currentQuery, page);

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

    shownImages = data.hits.length;
    totalImages = Number(data.totalHits) || 0;

    if (shownImages < totalImages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({ title: 'End', message: "That's all for this query." });
    }
  } catch (err) {
    console.error(err);
    iziToast.error({
      title: 'Error',
      message: 'Network error or API failed. Try again later.',
    });
  } finally {
    hideLoader();
    isLoading = false;
  }
}

async function loadMore() {
  if (isLoading) return;
  isLoading = true;
  page += 1;
  hideLoadMoreButton();
  loadMoreBtn.disabled = true;
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page);

    if (!data || !Array.isArray(data.hits)) {
      throw new Error('Bad response shape from API (loadMore)');
    }

    if (data.hits.length === 0) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'End',
        message: "We're sorry, but you've reached the end of search results.",
      });
      return;
    }

    appendToGallery(data.hits);

    shownImages += data.hits.length;

    if (shownImages >= totalImages) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'End',
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      showLoadMoreButton();
    }

    scrollByCardHeight();
  } catch (err) {
    console.error(err);
    iziToast.error({
      title: 'Error',
      message: 'Network error or API failed. Try again later.',
    });
  } finally {
    hideLoader();
    loadMoreBtn.disabled = false;
    isLoading = false;
  }
}

function scrollByCardHeight() {
  const firstCard = document.querySelector('.gallery li');
  if (!firstCard) return;
  const { height } = firstCard.getBoundingClientRect();
  window.scrollBy({ top: height * 2, left: 0, behavior: 'smooth' });
}
