import React, { useEffect, useState, useCallback } from "react";
import Header from "../../components/Header/Header";
import MovieCard from "../../components/MovieCard/MovieCard";
import { getMovieList } from "../../services/movieService";
import "./style.css";

// interface MovieResults {
//   title?: string;
//   opening_crawl?: string;
//   director?: string;
//   producer?: string;
//   characters?: Array<string>;
// }

const Home: React.FC = () => {
  const [movieList, setMovieList] = useState([]);
  const [filteredList, setfilteredList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getMovieList()
      .then((data: any) => {
        setMovieList(data.results);
        setfilteredList(data.results);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
        setIsLoading(false);
        return null;
      });
  }, []);
  const onMovieSearch = useCallback(
    (query: string) => {
      if (!query) {
        setfilteredList(movieList);
        return;
      }

      const filteredMovies = movieList.filter(
        ({ title }: { title: string }) =>
          title.toLowerCase().indexOf(query.toLowerCase()) >= 0
      );
      console.log(filteredMovies);
      setfilteredList(filteredMovies);
    },
    [movieList]
  );

  return (
    <div>
      <Header onMovieSearch={onMovieSearch} />
      {isLoading && <div data-testid="loader">Loading...</div>}
      <div className="movie-list">
        {filteredList.length ? (
          filteredList.map(({ title, url, episode_id }) => (
            <MovieCard title={title} url={url} key={episode_id} />
          ))
        ) : (
          <span data-testid="no-results">No Results found</span>
        )}
      </div>
    </div>
  );
};

export default Home;
