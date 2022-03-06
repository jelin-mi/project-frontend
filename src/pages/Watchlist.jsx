import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/api.service';

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    apiService
      .getWatchlist()
      .then(response => {
        setWatchlist(response.data.map(watchlist => watchlist.movie));
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <h1>My Watchlist</h1>
      {watchlist.map(watchlist => {
        return (
          <div key={watchlist._id}>
            <Link to={`/movies/${watchlist._id}`}>
              <h2>{watchlist.title}</h2>
              <p>{watchlist.buddy}</p>
              <span>{watchlist.rating}</span>
            </Link>
          </div>
        );
      })}
    </>
  );
}

export default Watchlist;
