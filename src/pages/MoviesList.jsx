import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/api.service';
import { ReactComponent as Star } from '../../src/assets/star.svg';
import { ReactComponent as StarActive } from '../../src/assets/starActive.svg';
import Navbar from '../components/Navbar/Navbar';
import Search from '../components/Search/Search';

function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState();
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
        setPhrase('Added correctly');
        setTimeout(() => setPhrase(''), 2000);

        setErrorMsg('');
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
        setPhrase('');

        setErrorMsg(err.response.data.message);
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

  if (
    isLoading) return <div><Star/></div>;

  return (
    <>
      <div className="container">
        <h1>BuddyFilms list</h1>
        <Search onFilter={onFilter} handleReset={handleReset} />
        <div>{errorMsg}</div>
        <div>{phrase}</div>
        {movies.map(movie => {
          return (
            <div key={movie._id}>
              <Link to={`/movies/${movie._id}`}>
                <h2>{movie.title}</h2>
                <p>by {movie.buddy}</p>
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
              </Link>
              <button onClick={() => handleOnClick(movie._id)}>watchlist 👍</button>
            </div>
          );
        })}
      </div>
      <Navbar />
    </>
  );
}

export default MoviesList;
