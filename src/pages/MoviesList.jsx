import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/api.service';
import { ReactComponent as Star } from '../../src/assets/star.svg';
import { ReactComponent as StarActive } from '../../src/assets/starActive.svg';
import Navbar from '../components/Navbar/Navbar';
import Search from '../components/Search';

function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // List of all movies
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

  // Add to my Watchlist
  const handleOnClick = movieId => {
    apiService
      .addToWatchlist({
        movieId: movieId,
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  // Search
  const onFilter = searchTerm => {
    if (searchTerm === '') {
      setMovies(movies);
    } else {
      setMovies(movies.filter(movie => movie.title.toLowerCase().includes(searchTerm.toLowerCase())));
    }
  };

  const handleReset = () => {
    location.reload();
  };

  if (isLoading) return null;

  return (
    <>
      <h1>BuddyFilms list</h1>
      <Search onFilter={onFilter} handleReset={handleReset} />
      {movies.map(movie => {
        return (
          <div key={movie._id}>
            <Link to={`/movies/${movie._id}`}>
              <h2>{movie.title}</h2>
              <p>{movie.buddy}</p>
              {movie.rating === 1 && (
                <>
                  <Star />
                  <StarActive />
                  <StarActive />
                </>
              )}
              {movie.rating === 2 && (
                <>
                  <StarActive />
                  <StarActive />
                  <Star />
                </>
              )}
              {movie.rating === 3 && (
                <>
                  <StarActive />
                  <StarActive />
                  <StarActive />
                </>
              )}
            </Link>
            <button onClick={() => handleOnClick(movie._id)}>watchlist 👍</button>
          </div>
        );
      })}
      <Navbar />
    </>
  );
}

export default MoviesList;
