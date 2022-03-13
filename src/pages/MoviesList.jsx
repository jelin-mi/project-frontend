import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/api.service';
import Navbar from '../components/Navbar/Navbar';
import Search from '../components/Search/Search';
import { ReactComponent as Star } from '../../src/assets/star.svg';
import { ReactComponent as StarActive } from '../../src/assets/starActive.svg';
import { ReactComponent as WatchlistIcon } from '../../src/assets/watchlist.svg';
import { ReactComponent as Loading } from '../../src/assets/loading.svg';

function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const [phrase, setPhrase] = useState();

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
        setPhrase('Added correctly to your Watchlist');
        setTimeout(() => setPhrase(''), 2000);
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
        setPhrase('');
        setErrorMessage(err.response.data.message);
        setTimeout(() => setErrorMessage(''), 2000);
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

  if (isLoading)
    return (
      <div className="loading">
        <Loading />
      </div>
    );

  return (
    <>
      <div className="container">
        <h1>BuddyFilms list</h1>
        <Search onFilter={onFilter} handleReset={handleReset} />
        <p className="error-message">{errorMessage}</p>
        <p className="info-message">{phrase}</p>
        {movies.map(movie => {
          return (
            <div key={movie._id}>
              <Link to={`/movies/${movie._id}`}>
                <h2>{movie.title}</h2>
                <p>by {movie.buddy}</p>
              </Link>
              {movie.rating === 1 && (
                <>
                  <StarActive /> <Star /> <Star /> <Star /> <Star />
                </>
              )}
              {movie.rating === 2 && (
                <>
                  <StarActive /> <StarActive /> <Star /> <Star /> <Star />
                </>
              )}
              {movie.rating === 3 && (
                <>
                  <StarActive /> <StarActive /> <StarActive /> <Star /> <Star />
                </>
              )}
              {movie.rating === 4 && (
                <>
                  <StarActive /> <StarActive /> <StarActive /> <StarActive /> <Star />
                </>
              )}
              {movie.rating === 5 && (
                <>
                  <StarActive /> <StarActive /> <StarActive /> <StarActive /> <StarActive />
                </>
              )}

              <div className="watchlist-icon" onClick={() => handleOnClick(movie._id)}>
                <WatchlistIcon />
              </div>
            </div>
          );
        })}
      </div>
      <Navbar />
    </>
  );
}

export default MoviesList;