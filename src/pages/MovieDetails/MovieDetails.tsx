import React, { useEffect, useState } from "react";
import thumbnail from "../../static/images/star_wars.png";
import logo from "../../static/images/star-wars-logo.png";
import { getMovieDetails } from "../../services/movieDetailsService";
import { useParams, useHistory } from "react-router-dom";
import "./style.css";

interface MovieDetailsProps {
  title?: string;
  opening_crawl?: string;
  director?: string;
  producer?: string;
  characters?: Array<string>;
}

const MovieDetails: React.FC = () => {
  const [movieDetails, setMovieDetails] = useState<MovieDetailsProps>({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  useEffect(() => {
    getMovieDetails(id)
      .then((data: MovieDetailsProps) => {
        setIsLoading(false);
        setMovieDetails(data);
      })
      .catch((error) => {
        console.log(error.message);
        setIsLoading(false);
      });
  }, []);

  const {
    title,
    opening_crawl: description,
    director,
    producer,
  }: MovieDetailsProps = movieDetails;

  return (
    <>
      <header>
        <img
          src={logo}
          onClick={() => history.push("/")}
          data-testid="goToHomePage"
        />
      </header>
      {isLoading && <div data-testid="loader">Loading</div>}
      {movieDetails && (
        <div className="movie-details" data-testid="movie-details">
          <img src={thumbnail} />
          <div className="description">
            <h2>{title}</h2>
            {description}
            <div className="movie-cast">
              <div>
                <b>Director</b> {director}
              </div>
              <div>
                <b>Producer</b> {producer}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetails;
