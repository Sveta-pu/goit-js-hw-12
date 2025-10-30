import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '52809699-ccc5c93f5d687b44e4326bc01';
const per_page = 15;

export async function getImagesByQuery(query, page = 1) {
  const url =
    `${BASE_URL}?key=${API_KEY}` +
    `&q=${encodeURIComponent(query)}` +
    `&image_type=photo` +
    `&orientation=horizontal` +
    `&safesearch=true` +
    `&page=${page}` +
    `&per_page=${per_page}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch images');
  }
}
