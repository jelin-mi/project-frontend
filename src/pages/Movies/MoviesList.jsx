import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../../services/api.service';
import Navbar from '../../components/Navbar/Navbar';
import Search from '../../components/Search/Search';
import { ReactComponent as Star } from '../../assets/star.svg';
import { ReactComponent as StarActive } from '../../assets/starActive.svg';
import { ReactComponent as WatchlistIcon } from '../../assets/watchlistAdd.svg';
import { ReactComponent as Loading } from '../../assets/loading.svg';
import Back from '../../components/Back';
import './Movies.css';

function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const [phrase, setPhrase] = useState();
  const [query, setQuery] = useState(''); //

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
     setQuery(searchTerm)
  };

  const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase()))

  if (isLoading)
    return (
      <div className="loading">
        <Loading />
      </div>
    );

  return (
    <>
      <div className="container">
        <div className="headline">
          <Back />
          <h1>BuddyFilms list</h1>
        </div>
        <Search onFilter={onFilter} />

        {filteredMovies.map(movie => {
          return (
            <div className="item-movie" key={movie._id}>
              <Link to={`/movies/${movie._id}`}>
                <div className="info">
                  <h2>{movie.title}</h2>
                  <p>by {movie.buddy}</p>
                </div>
              </Link>
              <div className="icons">
                <div className="stars">
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
                </div>
                <div className="watchlist-icon" onClick={() => handleOnClick(movie._id)}>
                  {/* //TODO if para cambiar el ícono de Watchlist */}
                  <WatchlistIcon />
                </div>
              </div>
            </div>
          );
        })}
        <p className="error-message">{errorMessage}</p>
        <p className="info-message">{phrase}</p>
      </div>
      <Navbar />
    </>
  );
}

export default MoviesList;
