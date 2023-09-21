import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import { createMarkup } from './markup.js';
import { BASE_URL, refs } from './refs.js';

// refs.loader.hidden = true;
refs.loader.classList.add('hidden');

refs.error.hidden = true;

// Инициализация начальной загрузки пород при загрузке страницы
fetchBreeds()
  .then(catArr => {
    const selectedValue = refs.breedSelect.value;
    fetchCatByBreed(selectedValue).then(catData => {
      // Генерация разметки и обновление информации о коте
      // const markup = createMarkup(catData);
      // refs.catInfo.innerHTML = markup;

      // Инициализируем SlimSelect, передавая существующий select и данные
      new SlimSelect({
        select: refs.breedSelect,
        data: catArr,
      });
    });
  })
  .catch(error => {
    console.error(error);
    // refs.catInfo.innerHTML = 'Oops! Something went wrong! Try reloading the page!';
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  });

refs.breedSelect.addEventListener('change', onChoose);

// Определение функции onChoose, которая вызывается при выборе породы
function onChoose(evt) {
  const selectedValue = evt.target.value;

  // refs.loader.hidden = false; // Показываем loader перед запросом
  refs.loader.classList.remove('hidden');

  fetchCatByBreed(selectedValue)
    .then(catData => {
      // Генерация разметки и обновление информации о коте
      let markup = createMarkup(catData);
      refs.catInfo.innerHTML = markup;
      console.log(catData);
    })
    .catch(error => {
      console.error(error);
      // refs.catInfo.innerHTML = 'Выбранная порода недоступна.';
      Notiflix.Notify.info('Выбранная порода недоступна.');

      //  отчистить результат прерыдуго запроса
      refs.catInfo.innerHTML = '';
    })
    .finally(response => {
      // refs.loader.hidden = true; // Скрываем loader после запроса
      refs.loader.classList.add('hidden');
    });
}
export { BASE_URL, refs };
