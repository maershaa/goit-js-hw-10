function createMarkup({ url, width, height, name, temperament, description }) {
  return `
    <ul>
      <li>
        <img src="${url}" alt="${name}" width="${width}" height="${height}">
        <h1>${name}</h1>
        <p>${description}</p>
        <p><span style="font-weight: bold">Temperament:</span> ${temperament}</p>
      </li>
    </ul>`;
}

export { createMarkup };
