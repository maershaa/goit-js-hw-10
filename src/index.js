import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import { createMarkup } from './markup.js';

const BASE_URL = 'https://api.thecatapi.com/v1/';
const refs = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

refs.loader.hidden = true;
refs.error.hidden = true;

// Инициализация начальной загрузки пород при загрузке страницы
fetchBreeds().then(() => {
  const selectedValue = refs.breedSelect.value;
  fetchCatByBreed(selectedValue)
    .then(catData => {
      // Генерация разметки и обновление информации о коте
      const markup = createMarkup(catData);
      refs.catInfo.innerHTML = markup;
    })
    .catch(error => {
      console.error(error);
      refs.catInfo.innerHTML = 'Выбранная порода недоступна.';
    });
});

refs.breedSelect.addEventListener('change', onChoose);

// Определение функции onChoose, которая вызывается при выборе породы
function onChoose(evt) {
  const selectedValue = evt.target.value;
  refs.loader.hidden = false; // Показываем loader перед запросом
  fetchCatByBreed(selectedValue)
    .then(catData => {
      // Генерация разметки и обновление информации о коте
      const markup = createMarkup(catData);
      refs.catInfo.innerHTML = markup;
    })
    .catch(error => {
      console.error(error);
      refs.catInfo.innerHTML = 'Выбранная порода недоступна.';
    })
    .finally(response => {
      refs.loader.hidden = true; // Скрываем loader после запроса
    });
}

// import SlimSelect from 'slim-select';
// import axios from 'axios';
// import { fetchBreeds, fetchCatByBreed } from './cat-api';

// axios.defaults.headers.common['x-api-key'] =
//   'live_m6bWAmbCUpZFpjwTSQIcwzhCw2H822bRJfscfRObrB30g8VI6R23vJzjXH2DXoxA';

// // new SlimSelect({
// //   select: '#selectElement',
// // });

// const BASE_URL = 'https://api.thecatapi.com/v1/';
// // const API_KEY =
// //   'live_m6bWAmbCUpZFpjwTSQIcwzhCw2H822bRJfscfRObrB30g8VI6R23vJzjXH2DXoxA';
// const refs = {
//   // Выберите элемент <select> с классом "breed-select"
//   breedSelect: document.querySelector('.breed-select'),
//   // Выберите элемент <p> с классом "loader"
//   loader: document.querySelector('.loader'),
//   // Выберите элемент <p> с классом "error"
//   error: document.querySelector('.error'),
//   // Выберите элемент <div> с классом "cat-info"
//   catInfo: document.querySelector('.cat-info'),
// };

// refs.loader.hidden = true;
// refs.error.hidden = true;

// // Пока идет запрос за списком пород, необходимо скрыть select.breed-select и показать p.loader.
// // Пока идет запрос за инфорацией о коте, необходимо скрыть div.cat-info и показать p.loader.
// // Когда любой запрос завершился, p.loader необходимо скрыть

// // Инициировать начальную загрузку пород при загрузке страницы
// fetchBreeds(0);

// refs.breedSelect.addEventListener('change', onChoose);

// // Определите функцию onChoose, которая будет вызываться при выборе породы
// function onChoose(evt) {
//   const selectedValue = evt.target.value;
//   console.log(selectedValue); // Получить выбранное значение из элемента breedSelect
//   fetchBreeds(selectedValue); // Вызвать функцию fetchBreeds с выбранным значением
// }

// // Определите функцию createMarkup для создания разметки породы
// function createMarkup(
//   arr,
//   { url, width, height, name, temperament, description }
// ) {
//   return arr
//     .map(({ id, name }) => {
//       return `<ul>
//     <li>
//       <img src="${url}" alt="${name}" width="${width}" height="${height}">
//       <h1>${name}</h1>
//       <p>${description}</p>
//       <p><span style="font-weight: bold"> Temperament:</span> ${temperament}</p>
//     </li>
//   </ul>`;
//     })
//     .join('');
// }

// fetchCatByBreed(breedId);

// export { BASE_URL, refs, createMarkup, onChoose };
