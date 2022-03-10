import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/api.service';
import Navbar from '../components/Navbar/Navbar';
import { ReactComponent as Star } from '../../src/assets/star.svg';
import { ReactComponent as StarActive } from '../../src/assets/starActive.svg';

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);

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
  console.log(watchlist);
  return (
    <>
      <h1>My Watchlist</h1>
      {watchlist.length === 0 && (
        <p>
          You do not have any movies in your Watchlist yet.
          <br />
          Go to the <Link to={'/movies'}>Movies</Link> page and add some by clicking at 👍 icon.
        </p>
      )}

      {watchlist.map(watchlist => {
        return (
          <div key={watchlist._id}>
            <Link to={`/movies/${watchlist.movie._id}`}>
              <h2>{watchlist.movie.title}</h2>
              <p>{watchlist.movie.buddy}</p>
              {watchlist.movie.rating === 1 && (
                <>
                  <Star />
                  <StarActive />
                  <StarActive />
                </>
              )}
              {watchlist.movie.rating === 2 && (
                <>
                  <StarActive />
                  <StarActive />
                  <Star />
                </>
              )}
              {watchlist.movie.rating === 3 && (
                <>
                  <StarActive />
                  <StarActive />
                  <StarActive />
                </>
              )}
            </Link>
            <button onClick={() => handleOnClick(watchlist._id)}>remove</button>
          </div>
        );
      })}
      <Navbar />
    </>
  );
}

export default Watchlist;
