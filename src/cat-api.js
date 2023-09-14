import axios from 'axios';
import { createMarkup } from './markup.js';

// Установим заголовок для всех запросов с ключом доступа
axios.defaults.headers.common['x-api-key'] =
  'live_m6bWAmbCUpZFpjwTSQIcwzhCw2H822bRJfscfRObrB30g8VI6R23vJzjXH2DXoxA';

const BASE_URL = 'https://api.thecatapi.com/v1/';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

// Определение функции fetchBreeds для получения данных о породах
function fetchBreeds(refs, idValue) {
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

// import { BASE_URL, refs, createMarkup, onChoose } from './index';
// import axios from 'axios';
// axios.defaults.headers.common['x-api-key'] =
//   'live_m6bWAmbCUpZFpjwTSQIcwzhCw2H822bRJfscfRObrB30g8VI6R23vJzjXH2DXoxA';

// // Определите функцию fetchBreeds для получения данных о породах
// function fetchBreeds(idValue) {
//   axios
//     .get(`${BASE_URL}breeds`)
//     .then(response => {
//       // Обычно при успешном запросе (HTTP-код 200) не требуется проверять response.ok, так как .then обработает только успешные ответы.
//       const catArr = response.data;
//       refs.breedSelect.innerHTML = '';

//       catArr.forEach(({ id, name, image }) => {
//         if (!image) return;

//         const option = document.createElement('option');
//         option.value = id;
//         option.innerHTML = name;
//         refs.breedSelect.appendChild(option);

//         fetchCatByBreed(0);
//         console.log(fetchCatByBreed(0));
//       });
//     })
//     .catch(error => {
//       console.error(error);
//       refs.catInfo.innerHTML = 'Выбранная порода недоступна.';
//     })
//     .finally(response => {
//       refs.loader.hidden = true;
//     });
// }
// function fetchCatByBreed(breedId) {
//   axios
//     .get(`${BASE_URL}images/search?breed_ids=${breedId}`)
//     .then(response => {
//       console.log(response);
//       if (breedId >= 0 && breedId < catArr.length) {
//         const selectedBreed = catArr[idValue];
//         // Теперь у вас есть selectedBreed, и вы можете выполнить дополнительные действия с ним
//         const markup = createMarkup(selectedBreed);
//         refs.catInfo.innerHTML = markup;
//       }
//     })
//     .catch(error => {
//       console.error(error);
//       refs.catInfo.innerHTML = 'Выбранная порода недоступна.';
//     })
//     .finally(response => {
//       refs.loader.hidden = true;
//     });
// }

// export { fetchBreeds, fetchCatByBreed, selectedBreed };
