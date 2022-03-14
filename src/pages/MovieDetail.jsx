import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import apiService from '../services/api.service';
import Navbar from '../components/Navbar/Navbar';
import { ReactComponent as Star } from '../../src/assets/star.svg';
import { ReactComponent as StarActive } from '../../src/assets/starActive.svg';
import { ReactComponent as WatchlistIcon } from '../../src/assets/watchlistAdd.svg';
import { ReactComponent as Loading } from '../../src/assets/loading.svg';
import Back from '../components/Back';
/* import imageDefault from '../assets/popcorn.png'; */

function MovieDetail() {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState({});
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState();
  const [phrase, setPhrase] = useState();

  useEffect(() => {
    apiService
      .getOneMovie(id)
      .then(response => {
        console.log(response.data);
        setMovie(response.data);
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

  if (isLoading)
    return (
      <div className="loading">
        <Loading />
      </div>
    );

  console.log(movie.imageUrl);

  return (
    <>
      <div className="container">
        <div className="headline">
          <Back />
          <h1>Film</h1>
        </div>
        <div key={movie._id}>
          <h2>{movie.title}</h2>
          <img src={movie.imageUrl} alt="pic" />
          {/* {movie.imageUrl ? <img src={movie.imageUrl} alt="movie" /> : <img src={imageDefault} alt="" />} */}
        
          <p>Year: {movie.year}</p>
          <p>Country: {movie.country}</p>
          <p>Director: {movie.director}</p>
          <p>Synopsis: {movie.synopsis}</p>
          <p>Channel: {movie.channel}</p>
          <p>Buddy: {movie.buddy}</p>
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
          {movie.owner === user._id && <Link to={`/movies/${movie._id}/edit`}>Edit film</Link>}
          <div className="watchlist-icon" onClick={() => handleOnClick(movie._id)}>
            <WatchlistIcon />
          </div>
        </div>
        <p className="error-message">{errorMessage}</p>
        <p className="info-message">{phrase}</p>
      </div>
      <Navbar />
    </>
  );
}

export default MovieDetail;
