import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiService from '../services/api.service';
import Navbar from '../components/Navbar';

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);

  const navigate = useNavigate();

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

  const handleOnClick = watchlistId => {
    apiService
      .removeFromWatchlist(watchlistId) //TODO
      .then(response => {
        console.log(response.data);
        navigate('/watchlist');
      })
      .catch(err => {
        console.log(err);
      });
  };

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
          <>
            <div key={watchlist._id}>
              <Link to={`/movies/${watchlist._id}`}>
                <h2>{watchlist.title}</h2>
                <p>{watchlist.buddy}</p>
                {watchlist.rating === 1 && '★☆☆'}
                {watchlist.rating === 2 && '★★☆'}
                {watchlist.rating === 3 && '★★★'}
              </Link>
              <button onClick={() => handleOnClick(watchlist._id)}>remove</button>
            </div>
          </>
        );
      })}
      <Navbar />
    </>
  );
}

export default Watchlist;