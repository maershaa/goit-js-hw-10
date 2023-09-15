function createMarkup({
  url,
  width,
  height,
  breeds: [{ name, temperament, description }],
}) {
  return `
    <ul>
      <li>
        <img src="${url}" alt="${name}" width="400" height="250">
        <div class="description-container">
   <h1 class="title">${name}</h1>
        <p class="description">${description}</p>
        <p class="description"><span style="font-weight: bold">Temperament:</span> ${temperament}</p>
</div>
       
      </li>
    </ul>`;
}

export { createMarkup };
