import React, { useEffect } from "react";
import { AES } from "crypto-js";
import axios from "axios";
import "./movie.css";

const Movie = ({ movie }) => {
  const handleDownload = (movieID, title) => () => {
    axios({
      url: `https://image.tmdb.org/t/p/original/${movieID}`,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${title}.jpg`);
      document.body.appendChild(link);
      link.click();
    });
  };

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 mb-4 px-2">
      <div className="mb-8 text-white">
        <figure className="overflow-hidden mb-4">
          <img
            src={`https://image.tmdb.org/t/p/original/${
              movie?.backdrop_path ?? ""
            }`}
            alt={movie.original_title}
            onClick={handleDownload(movie.backdrop_path, movie?.original_title)}
          />
        </figure>
        <div className="flex justify-between">
          <h2>{movie?.original_title ?? ""}</h2>
          <p className="text-yellow-300 font-bold vote-average">
            {movie?.vote_average ?? ""}
          </p>
        </div>
        <p>{movie?.release_date ?? ""}</p>
      </div>
    </div>
  );
};

export default Movie;
