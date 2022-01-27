import { getMovie, getCountry } from "./apiCalls.js";

// prettier-ignore
const movieMinAdder = (arr) =>
  arr.map((movieWithMin) => (movieWithMin ? Number(movieWithMin.split(" ")[0]) : 0)).reduce((a, b) => a + b);

export async function getDataForPart2() {
  const minutesHtml = document.querySelector(`.resultsArea--minutes`);
  const populationHtml = document.querySelector(`.resultsArea--population`);

  const input1 = document.querySelector(`.excersize2__input--1`);
  const input2 = document.querySelector(`.excersize2__input--2`);
  const input3 = document.querySelector(`.excersize2__input--3`);

  const moviesArr = [
    getMovie(input1.value),
    getMovie(input2.value),
    getMovie(input3.value),
  ];
  let movieInMin;
  let movieCountries;
  await Promise.all(moviesArr).then((x) => {
    movieInMin = movieMinAdder(x.map((a) => a.Runtime));
    // prettier-ignore
    movieCountries = x.map((x) => x.Country).filter((x) => x).map((x) => x.split(", ")).flat();
  });
  movieInMin += ` min`;

  let population = 0;
  for (let country of movieCountries) {
    const countryObj = await getCountry(country);
    population += countryObj[0].population;
  }

  minutesHtml.innerHTML = `Length: ${movieInMin}`;
  populationHtml.innerHTML = `Population: ${population}`;
}
