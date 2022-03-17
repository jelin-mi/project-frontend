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
import imageDefault from '../assets/popcorn.png';

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
      <div className="container film">
        <div className="headline">
          <Back />
          <h1>Film</h1>
        </div>
        <div className="film" key={movie._id}>
          <div className="cab">
            <div className="info">
              <h2>{movie.title}</h2>
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
            <div className="cover">
              {movie.imageUrl ? <img src={movie.imageUrl} alt="pic" /> : <img src={imageDefault} alt="" />}
            </div>
          </div>

          <div className="content">
            <p>
              <span>Year:</span> {movie.year}
            </p>
            <p>
              <span>Country:</span> {movie.country}
            </p>
            <p>
              <span>Director:</span> {movie.director}
            </p>
            <p>
              <span>Synopsis:</span> {movie.synopsis}
            </p>
            <p>
              <span>Channel:</span> {movie.channel}
            </p>
            <p>
              <span>Buddy:</span> {movie.buddy}
            </p>

            {movie.owner === user._id && (
              <button>
                <Link to={`/movies/${movie._id}/edit`}>Edit film</Link>{' '}
              </button>
            )}
            <div className="watchlist-icon" onClick={() => handleOnClick(movie._id)}>
              <WatchlistIcon />
            </div>
          </div>
          <p className="error-message">{errorMessage}</p>
          <p className="info-message">{phrase}</p>
        </div>
      </div>
      <Navbar />
    </>
  );
}

export default MovieDetail;
