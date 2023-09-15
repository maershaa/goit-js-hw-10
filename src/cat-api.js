import axios from 'axios';
import { BASE_URL, refs } from './refs.js';
// Установим заголовок для всех запросов с ключом доступа
axios.defaults.headers.common['x-api-key'] =
  'live_m6bWAmbCUpZFpjwTSQIcwzhCw2H822bRJfscfRObrB30g8VI6R23vJzjXH2DXoxA';

// Определение функции fetchBreeds для получения данных о породах
function fetchBreeds(idValue) {
  // Выполняем GET-запрос для получения списка пород
  return axios.get(`${BASE_URL}breeds`).then(response => {
    // Разбор ответа сервера
    const catArr = response.data;

    // Очищаем селект от предыдущих опций
    refs.breedSelect.innerHTML = '';

    // Создаем опции для выбора породы
    catArr.forEach(({ id, name, image }) => {
      if (!image) return;

      const option = document.createElement('option');
      option.value = id;
      option.innerHTML = name;

      // Добавляем созданную опцию в селект
      refs.breedSelect.appendChild(option);
    });
  });
}

// Определение функции fetchCatByBreed для получения данных о коте по породе
function fetchCatByBreed(breedId) {
  // Выполняем запрос на получение информации о коте по идентификатору породы
  return axios
    .get(`${BASE_URL}images/search?breed_ids=${breedId}`)
    .then(response => {
      // Обработка данных о коте и возврат промиса с результатами
      const catData = response.data[0]; // Выбираем первый элемент массива, так как запрос возвращает массив
      return catData;
    });
}

export { fetchBreeds, fetchCatByBreed };
