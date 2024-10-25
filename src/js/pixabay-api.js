import axios from 'axios';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let currentPage = 1;
const perPage = 15;

const API_KEY = '46667288-b1e46ab2736dc8061385815e5';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(searchQuery) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: currentPage,
        per_page: perPage,
      },
    });
    currentPage++;
    return response.data;
  } catch (error) {
    iziToast.error({
      message: 'Failed to fetch images',
    });
  }
}

export function resetPage() {
  currentPage = 1;
}
