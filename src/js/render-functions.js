import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function renderGallery(images, append = false) {
  const gallery = document.getElementById('gallery');
  const markup = images
    .map(
      image => `
            <a class="gallery-item" href="${image.largeImageURL}">
                <img
                    src="${image.webformatURL}"
                    alt="${image.tags}"
                    style="width: 360px; height: 152px; object-fit: cover;"
                />
                <ul class="image-description">
                    <li class="image-descr-item"><span class="descr-name">Likes</span>${image.likes}</li>
                    <li class="image-descr-item"><span class="descr-name">Views</span>${image.views}</li>
                    <li class="image-descr-item"><span class="descr-name">Comments</span>${image.comments}</li>
                    <li class="image-descr-item"><span class="descr-name">Downloads</span>${image.downloads}</li>
                </ul>
            </a>
        `
    )
    .join('');

  if (append) {
    gallery.insertAdjacentHTML('beforeend', markup);
  } else {
    gallery.innerHTML = markup;
  }
}

export function showEmptyFieldError() {
  iziToast.warning({
    message: 'Please enter a search query!',
    position: 'topRight',
  });
}
