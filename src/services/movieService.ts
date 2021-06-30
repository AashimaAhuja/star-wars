const DOMAIN = "https://swapi.dev/api/";
const MOVIE_API_URL = `${DOMAIN}/films`;

export const getMovieList = () => {
  return fetch(MOVIE_API_URL).then((res) => res.json());
};
