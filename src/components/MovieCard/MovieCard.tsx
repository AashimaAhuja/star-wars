import React from "react";
import logo from "../../static/images/star_wars.png";
import "./style.css";
import { useHistory } from "react-router-dom";

interface MovieCardProps {
  title: string;
  url: string;
  key: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, url }) => {
  const [id] = url.split("/").slice(-2);
  const history = useHistory();
  return (
    <div className="card">
      <img
        src={logo}
        onClick={() => {
          history.push(`/film/${id}`);
        }}
      ></img>
      {/* </Link> */}
      <h3>{title}</h3>
    </div>
  );
};

export default MovieCard;
