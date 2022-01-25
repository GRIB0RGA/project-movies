import { getMovie, getCountry } from "./excersize1.js";

// const movie = `x-men`;

const movieMinAdder = (arr) =>
  arr.map((x) => (x ? Number(x.split(" ")[0]) : 0)).reduce((a, b) => a + b);

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

  const movieInMin = `${await Promise.all(moviesArr).then((x) =>
    movieMinAdder(x.map((a) => a.Runtime))
  )} min`;

  const movieCountries = await Promise.all(moviesArr).then((x) =>
    x
      .map((x) => x.Country)
      .filter((x) => x)
      .map((x) => x.split(", "))
      .flat()
  );
  let population = 0;
  for (let country of movieCountries) {
    const countryObj = await getCountry(country);
    population += countryObj[0].population;
  }

  minutesHtml.innerHTML = `Length: ${movieInMin}`;
  populationHtml.innerHTML = `Population: ${population}`;
}
