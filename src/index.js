const BASE_URL = 'https://api.thecatapi.com/v1/';
const API_KEY =
  'live_m6bWAmbCUpZFpjwTSQIcwzhCw2H822bRJfscfRObrB30g8VI6R23vJzjXH2DXoxA';

// Выберите элемент <select> с классом "breed-select"
const breedSelect = document.querySelector('.breed-select');

// Выберите элемент <p> с классом "loader"
const loader = document.querySelector('.loader');

// Выберите элемент <p> с классом "error"
const error = document.querySelector('.error');

// Выберите элемент <div> с классом "cat-info"
const catInfo = document.querySelector('.cat-info');

// Добавьте обработчик события "change" к элементу breedSelect
breedSelect.addEventListener('change', onChoose);

// Определите функцию onChoose, которая будет вызываться при выборе породы
function onChoose(evt) {
  const selectedValue = evt.target.value; // Получить выбранное значение из элемента breedSelect
  fetchBreeds(selectedValue); // Вызвать функцию fetchBreeds с выбранным значением
}

// Определите функцию fetchBreeds для получения данных о породах
function fetchBreeds(idValue) {
  // Запрос на получение пород с использованием fetch
  const listPromise = fetch(`${BASE_URL}breeds?x-api-key=${API_KEY}`);
  listPromise
    .then(response => response.json()) // Преобразование ответа в JSON
    .then(catArr => {
      // Очистить список пород перед добавлением новых значений
      breedSelect.innerHTML = '';

      for (let i = 0; i < catArr.length; i++) {
        const breed = catArr[i];

        // Отфильтровать породы без изображения
        if (!breed.image) continue;

        // Создать новый элемент option для каждой породы и добавить его в список
        const option = document.createElement('option');
        option.value = i;
        option.innerHTML = breed.name;
        breedSelect.appendChild(option);
      }

      // Проверить, что idValue валидно и выбрать первую породу по умолчанию
      if (idValue >= 0 && idValue < catArr.length) {
        const selectedBreed = catArr[idValue];
        const markup = createMarkup(selectedBreed);
        catInfo.innerHTML = markup;
      } else {
        // Если idValue недопустимо, вы можете сделать здесь обработку по умолчанию или ничего не делать
      }
    })
    .catch(error => {
      console.error(error);
    });
}

// Инициировать начальную загрузку пород при загрузке страницы
fetchBreeds(0);

// Определите функцию createMarkup для создания разметки породы
function createMarkup(breed) {
  const { url, width, height, name, temperament } = breed;
  return `<ul>
    <li>
      <img src="${url}" alt="${name}" width="${width}" height="${height}">
      <h1>${name}</h1>
      <p></p>
      <p><span style="font-weight: bold"> Temperament:</span> ${temperament}</p>
    </li>
  </ul>`;
}
