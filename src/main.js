import { fetchImages, resetPage } from './js/pixabay-api.js';
import { renderGallery, showEmptyFieldError } from './js/render-functions.js';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

const form = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const loader = document.getElementById('loader');
const gallery = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('load-more');

let searchQuery = '';
let totalHits = 0;
let loadedHits = 0;

function showLoader() {
  loader.classList.remove('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
}

function showLoadMoreBtn() {
  loadMoreBtn.classList.remove('hidden');
}

function hideLoadMoreBtn() {
  loadMoreBtn.classList.add('hidden');
}

form.addEventListener('submit', async event => {
  event.preventDefault();

  searchQuery = searchInput.value.trim();

  if (searchQuery === '') {
    showEmptyFieldError();
    return;
  }

  resetPage();
  gallery.innerHTML = '';
  hideLoadMoreBtn();
  showLoader();

  try {
    const { hits, totalHits: total } = await fetchImages(searchQuery);
    totalHits = total;
    loadedHits = hits.length;

    if (hits.length === 0) {
      iziToast.info({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      renderGallery(hits);
      lightbox.refresh();

      if (loadedHits < totalHits) {
        showLoadMoreBtn();
      }
    }
  } catch (error) {
    iziToast.error({
      message: error.message,
    });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  showLoader();
  hideLoadMoreBtn();

  try {
    const { hits } = await fetchImages(searchQuery);
    loadedHits += hits.length;

    renderGallery(hits, true); // Append images instead of new html
    lightbox.refresh();

    // Smooth scrolling
    const { height: cardHeight } = document
      .querySelector('.gallery-item')
      .getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (loadedHits >= totalHits) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
      hideLoadMoreBtn();
    } else {
      showLoadMoreBtn();
    }
  } catch (error) {
    iziToast.error({
      message: error.message,
    });
  } finally {
    hideLoader();
  }
});
