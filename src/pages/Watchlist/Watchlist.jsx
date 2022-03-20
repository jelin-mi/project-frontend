import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Star } from '../../assets/star.svg';
import { ReactComponent as StarActive } from '../../assets/starActive.svg';
import { ReactComponent as Remove } from '../../assets/remove.svg';
import { ReactComponent as RemoveIcon } from '../../assets/removeActive.svg';
import { ReactComponent as WatchlistActive } from '../../assets/watchlistActive.svg';
import { ReactComponent as Wheel } from '../../assets/wheel.svg';
import apiService from '../../services/api.service';
import Navbar from '../../components/Navbar/Navbar';
import Back from '../../components/Back';
import Loading from '../../components/Loading/Loading';
import './Watchlist.css';

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getWhatchlist = () => {
    apiService
      .getWatchlist()
      .then(response => {
        setWatchlist(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getWhatchlist();
    setIsLoading(false);
  }, []);

  const handleOnClick = watchlistId => {
    apiService
      .removeFromWatchlist({ watchlistId })
      .then(response => {
        console.log(response.data);
        getWhatchlist();
      })
      .catch(err => {
        console.log(err);
      });
  };

  if (isLoading)
    return (
      <div className="loading">
        <Loading />
      </div>
    );

  return (
    <>
      <div className="container watchlist">
        <div className="headline">
          <Back />
          <h1>My Watchlist</h1>
        </div>
        {watchlist.length === 0 && (
          <>
            <p className="any-movies">
              <strong>You don’t have any films in your Watchlist</strong>.
            </p>
            <p className="any-movies">
              Go to the{' '}
              <Link to={'/movies'}>
                <strong>Films</strong>
              </Link>{' '}
              page and add some by clicking at <WatchlistActive /> icon.
            </p>
            <p className="any-movies">
              Once you have some films in your Watchlist, you can easily remove them by clicking <br /> at{' '}
              <RemoveIcon /> icon if you want.
            </p>
            <div className="icon-wheel">
              <Wheel />
            </div>
          </>
        )}
        {watchlist.map(watchlist => {
          return (
            <div className="item-movie" key={watchlist._id}>
              <Link to={`/movies/${watchlist.movie._id}`}>
                <div className="info">
                  <h2>{watchlist.movie.title}</h2>
                  <p>by {watchlist.movie.buddy}</p>
                </div>
              </Link>
              <div className="icons">
                <div className="stars">
                  {watchlist.movie.rating === 1 && (
                    <>
                      <StarActive /> <StarActive /> <Star /> <Star /> <Star />
                    </>
                  )}
                  {watchlist.movie.rating === 2 && (
                    <>
                      <StarActive /> <StarActive /> <Star /> <Star /> <Star />
                    </>
                  )}
                  {watchlist.movie.rating === 3 && (
                    <>
                      <StarActive /> <StarActive /> <StarActive /> <Star /> <Star />
                    </>
                  )}
                  {watchlist.movie.rating === 4 && (
                    <>
                      <StarActive /> <StarActive /> <StarActive /> <StarActive /> <Star />
                    </>
                  )}
                  {watchlist.movie.rating === 5 && (
                    <>
                      <StarActive /> <StarActive /> <StarActive /> <StarActive /> <StarActive />
                    </>
                  )}
                </div>
                <div className='remove' onClick={() => handleOnClick(watchlist._id)}>
                  <Remove />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Navbar />
    </>
  );
}

export default Watchlist;
