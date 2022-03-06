import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/api.service';
import Navbar from '../components/Navbar';

function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiService
      .getAllMovies()
      .then(response => {
        setMovies(response.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleOnClick = movieId => {
    apiService
      .createWatchlist({
        movieId: movieId,
      })
      .then()   //TODO
      .catch();
  };

  if (isLoading) return null;

  return (
    <>
      <h1>Buddy movies</h1>
      {movies.map(movie => {
        return (
            <div key={movie._id}>
              <Link to={`/movies/${movie._id}`}>
                <h2>{movie.title}</h2>
                <p>{movie.buddy}</p>
                <span>{movie.rating}</span>
              </Link>
              <button onClick={() => handleOnClick(movie._id)}>watchlist</button>
            </div>
        );
      })}
      <Navbar />
    </>
  );
}

export default MoviesList;
