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
      .addToWatchlist({
        movieId: movieId,
      })
      .then(response => {
        console.log(response.data);
      }) //TODO
      .catch(err => {
        console.log(err);
      });
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
              {movie.rating === 1 && '★☆☆'}
              {movie.rating === 2 && '★★☆'}
              {movie.rating === 3 && '★★★'}
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
