import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/api.service';
import Navbar from '../components/Navbar/Navbar';
import { ReactComponent as Star } from '../../src/assets/star.svg';
import { ReactComponent as StarActive } from '../../src/assets/starActive.svg';
import { ReactComponent as Loading } from '../../src/assets/loading.svg';
import wheel from '../../src/assets/wheel.png';

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
  console.log(watchlist);

   if (isLoading)
     return (
       <div className="loading">
         <Loading />
       </div>
     );

  return (
    <>
      <div className="container">
        <h1>My Watchlist</h1>
        {watchlist.length === 0 && (
          <>
            <p>
              You do not have any movies in your Watchlist yet.
              <br />
              Go to the <Link to={'/movies'}>Movies</Link> page and add some by clicking at 👍 icon.
            </p>
            <img src={wheel} alt="wheel" />
          </>
        )}
        {watchlist.map(watchlist => {
          return (
            <div key={watchlist._id}>
              <Link to={`/movies/${watchlist.movie._id}`}>
                <h2>{watchlist.movie.title}</h2>
                <p>{watchlist.movie.buddy}</p>
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
              </Link>
              <button onClick={() => handleOnClick(watchlist._id)}>remove</button>
            </div>
          );
        })}
      </div>
      <Navbar />
    </>
  );
}

export default Watchlist;
