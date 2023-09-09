export { fetchBreeds };

import { fetchBreeds } from './cat-api';

// Вы импортируете библиотеку axios для выполнения HTTP-запросов.
import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_m6bWAmbCUpZFpjwTSQIcwzhCw2H822bRJfscfRObrB30g8VI6R23vJzjXH2DXoxA';

import { TheCatAPI } from '@thatapicompany/thecatapi';

const BASE_URL = 'https://api.thecatapi.com/v1/breeds';
// нам не нужен const API_KEY так как
// const API_KEY =
//   'live_m6bWAmbCUpZFpjwTSQIcwzhCw2H822bRJfscfRObrB30g8VI6R23vJzjXH2DXoxA';
// poroda = 000.cuttentTarget.value

// Выберите элемент <select> с классом "breed-select"
const breedSelect = document.querySelector('.breed-select');

// Выберите элемент <p> с классом "loader"
const loader = document.querySelector('.loader');

// Выберите элемент <p> с классом "error"
const error = document.querySelector('.error');

// Выберите элемент <div> с классом "cat-info"
const catInfo = document.querySelector('.cat-info');

breedSelect.addEventListener('change', onClick);

function onClick(evt) {
  // нужно ли?
  evt.preventDefault();

  const poroda = evt.currentTarget.value; // Получить выбранное значение из выпадающего списка

  fetchBreeds(poroda)
    .then(data => (list.innerHTML = createMarkup(data.forecast.forecastday)))
    .catch(err => console.log(err));
}

loader.setAttribute.style.display = 'none';
error.setAttribute.style.display = 'none';

function fetchBreeds(poroda) {
  // const poroda = breedSelect.value; // Получить выбранное значение из выпадающего списка
  axios
    .get(BASE_URL)
    .then(resp => {
      if (!resp.ok) {
        throw new Error(resp.statusText);
        loader.setAttribute('hidden', false);
      }
      return resp.json();
    })
    .then(data => {
      loader.setAttribute('hidden', false);

      // Очистите существующие опции, если они есть
      breedSelect.innerHTML = '';

      // Создайте и добавьте опции на основе данных
      data.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id; // Значение опции - ID породы
        option.textContent = breed.name; // Текст опции - название породы
        breedSelect.appendChild(option);

        // Вызовите функцию createMarkup с данными в качестве аргумента и вставьте разметку в catInfo
        const markup = createMarkup(data);
        catInfo.insertAdjacentHTML('beforeend', markup);
      });
    })
    .catch(error => {
      error.setAttribute('hidden', true);
    });
}

function createMarkup(arr) {
  return arr
    .map(({ url, width, height, breeds: { name, temperament } }) => {
      return `<ul>
  <li>
    <img src="${url}" alt="${name}" width="${width}" height="${height}">
    <h1> ${name} </h1>
    <p></p>
    <p><span style="font-weight: bold"> Temperament:</span> ${temperament}</p>
  </li>
</ul>`;
    })
    .join('');
}
