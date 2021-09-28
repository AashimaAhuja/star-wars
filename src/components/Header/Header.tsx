import React from "react";
import "./style.css";
import logo from "../../static/images/star-wars-logo.png";

interface HeaderProps {
  onMovieSearch: (query: string) => void;
}
const Header: React.FC<HeaderProps> = ({ onMovieSearch }) => {
  return (
    <header>
      test 2q
      <span>Which fruit do you like?</span>
      <img src={logo} />
      <input
        type="text"
        placeholder="Search a movie"
        onChange={(e) => onMovieSearch(e.target.value)}
        data-testid="searchbox"
      />
    </header>
  );
};

export default Header;
