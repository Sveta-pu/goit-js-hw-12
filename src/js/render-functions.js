import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load_more_button');

if (loaderEl) loaderEl.classList.add('hidden');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function buildGalleryMarkup(images) {
  return images
    .map(item => {
      return `
        <li class="gallery-item">
          <a class="gallery-image" href="${item.largeImageURL}">
            <img src="${item.webformatURL}" alt="${item.tags}" />
          </a>
          <div class="info">
            <p ><b>Likes:</b> ${item.likes}</p>
            <p ><b>Views:</b> ${item.views}</p>
            <p><b>Comments:</b> ${item.comments}</p>
            <p><b>Downloads:</b> ${item.downloads}</p>
          </div>
        </li>
      `;
    })
    .join('');
}

function createGallery(images) {
  if (!Array.isArray(images) || images.length === 0) return;
  if (!galleryEl) return;

  const markup = buildGalleryMarkup(images);
  galleryEl.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

function appendToGallery(images) {
  if (!Array.isArray(images) || images.length === 0) return;
  if (!galleryEl) return;

  const markup = buildGalleryMarkup(images);
  galleryEl.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

function clearGallery() {
  if (!galleryEl) return;
  galleryEl.innerHTML = '';
  lightbox.refresh();
}

function showLoader() {
  if (!loaderEl) return;
  loaderEl.classList.remove('hidden');
}

function hideLoader() {
  if (!loaderEl) return;
  loaderEl.classList.add('hidden');
}

function showLoadMoreButton() {
  if (!loadMoreButton) return;
  loadMoreButton.classList.remove('hidden');
}

function hideLoadMoreButton() {
  if (!loadMoreButton) return;
  loadMoreButton.classList.add('hidden');
}

export {
  createGallery,
  appendToGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
};
