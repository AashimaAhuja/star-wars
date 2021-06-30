const DOMAIN = "https://swapi.dev/api";
const API_URL = `${DOMAIN}/films`;

export const getMovieDetails = (id: string): Promise<any> => {
  return fetch(`${API_URL}/${id}`).then((res) => res.json());
};
