export const getMovie = (title) =>
  fetch(`http://www.omdbapi.com/?t=${title}&&apikey=6d659266`).then((obj) =>
    obj.json()
  );

export const getCountry = (country) =>
  fetch(`https://restcountries.com/v3.1/name/${country}`).then((obj) =>
    obj.json()
  );
