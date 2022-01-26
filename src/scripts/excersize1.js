import { getMovie, getCountry } from "./apiCalls.js";

const injectHtml = (title, img, actors, year) => {
  const whereToInject = document.querySelector(`.movieContainer`);
  const html = `  
    <div class="movie">
      
      <img src="${img}" alt="" class="movie__img" />
      <h2 class="movie__title">${title}</h2>
      <p class="movie__paragraph movie__paragraph--actors">Actors : ${actors}</p>
      <p class="movie__paragraph movie__paragraph--year">Release year :${year}</p>
     <div class="country">
     <p class="movie__paragraph movie__paragraph--countryTitle">Country : </p>
      </div>
    </div>`;
  whereToInject.innerHTML = ``;
  whereToInject.insertAdjacentHTML(`beforeend`, html);
};

const part2Injector = (country, currency, flag) => {
  const whereToInject = document.querySelector(`.country`);
  const html = `
      <div class="country__specs">
      <p class="movie__paragraph movie__paragraph--country">${country}</p>
      <p class="movie__paragraph movie__paragraph--countryAnd">${currency}</p>
      <img src="${flag}" alt="" class="movie__flag" />
      </div>`;
  whereToInject.insertAdjacentHTML(`beforeend`, html);
};

export async function getData() {
  const searchInput = document.getElementById(`searchInput`);
  const movie = await getMovie(searchInput.value);

  const actors = movie.Actors.split(", ")
    .map((x) => x.split(" ").slice(0, 1))
    .join(", ");
  const countriesArr = movie.Country.split(", ");

  injectHtml(movie.Title, movie.Poster, actors, movie.Year);

  for (let country of countriesArr) {
    const countryObj = await getCountry(country);
    const currency = Object.keys(countryObj[0].currencies)[0];
    const flags = countryObj[0].flags.png;
    part2Injector(country, currency, flags);
  }
}
