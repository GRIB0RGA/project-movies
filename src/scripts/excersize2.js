import { getMovie, getCountry } from "./apiCalls.js";

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

  const getRuntimeAndMovieCountries = await Promise.all(moviesArr).then((x) => {
    return x.map((movie) => ({
      runtime: parseInt(movie.Runtime),
      movieCountry: movie.Country,
    }));
  });

  const getPopulations = await Promise.all(
    getRuntimeAndMovieCountries.map((x) => getCountry(x.movieCountry))
  ).then((data) => data.map((x) => x[0].population));

  const sumOfPopulation = getPopulations.reduce((a, b) => a + b);

  const sumOfRuntimes = getRuntimeAndMovieCountries
    .map((x) => x.runtime)
    .reduce((a, b) => a + b);

  minutesHtml.innerHTML = `Length: ${sumOfRuntimes} min`;
  populationHtml.innerHTML = `Population: ${sumOfPopulation}`;
}
