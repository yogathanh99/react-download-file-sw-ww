import React, { useEffect, useState } from "react";
import WebWorker from "../../workerSetup";
import webWorker from "../../worker";
import Movie from "./movie";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [worker, setWorker] = useState("");

  useEffect(() => {
    setWorker(new WebWorker(webWorker));
  }, []);

  useEffect(() => {
    if (worker) {
      setLoading(true);
      worker.postMessage("Fetch");

      worker.addEventListener("message", (e) => {
        setLoading(false);
        setMovies(e?.data?.url);
      });
    }
  }, [worker]);

  return (
    <div className="flex flex-wrap -mb-4">
      {!loading && movies?.length ? (
        movies.map((movie, index) => (
          <Movie key={movie?.id ?? index} movie={movie} />
        ))
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default Movies;
